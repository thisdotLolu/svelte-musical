<script lang="ts">
  import msToTime from '$lib/helpers/ms-to-time';
	import { Clock8, ListPlus } from 'lucide-svelte';
  import Player from './Player.svelte';
  import playingGif from '../../assets/playinggif.gif'

	export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];

	let currentPlaying: string | null = null;
	let isPaused:boolean = false;
</script>

<div class="tracks">
	<div class="row header">
		<div class="number-column">
			<span class="number">#</span>
		</div>
		<div class="info-column">
			<span class="track-title">Title</span>
		</div>
		<div class="duration-column">
			<Clock8 aria-hidden focusable="false" />
		</div>
		<div class="actions-column" />
	</div>
    <hr/>
	{#each tracks as track, index}
		<div class="row" class:is-current={currentPlaying === track.id}>
			<div class="number-column">
				<span class="number">{index + 1}</span>
				
			</div>
			
			<div class="info-column">
				<div>
					<div class="track-title">
						<h4>{track.name}</h4>
						{#if track.explicit}
							<span class="explicit">Explicit</span>
						{/if}
					</div>
					<p class="artists">
						{#each track.artists as artist, artistIndex}
							<a href="/artist/{artist.id}">{artist.name}</a
							>{#if artistIndex < track.artists.length - 1}{', '}{/if}
						{/each}
					</p>
				</div>
				<div class="player">
					<Player 
					on:play={(e)=>{
						currentPlaying = e.detail.track.id;
						console.log(e.detail.track)
					}}
					on:pause={(e)=>{
						console.log(e.detail.track)
					}}
					track={track}/>
					</div>
			</div>
			<div class="duration-column">
				<span class="duration">{msToTime(track.duration_ms)}</span>
			</div>
			<div class="actions-column">
				<ListPlus aria-hidden focusable="false" />
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.tracks {
		.row {
			display: flex;
			align-items: center;
			padding: 7px 5px;
			border-radius: 4px;
			&.header {
				border-bottom: 1px solid var(--border);
				border-radius: 0px;
				padding: 5px;
				margin-bottom: 15px;
				.track-title {
					color: var(--light-gray);
					font-size:12px;
					text-transform: uppercase;
				}
				.duration-column :global(svg) {
					width: 16px;
					height: 16px;
				}
			}
			&:not(.header) {
				&:hover {
					background-color: rgba(255, 255, 255, 0.05);
				}
			}
			.number-column {
				width: 30px;
				display: flex;
				justify-content: flex-end;
				margin-right: 15px;
				span.number {
					color: var(--light-gray);
					font-size: 14px;
				}
			}
			.info-column {
				flex: 1;
				display: flex;
				align-items: center;
				gap: 20px;
				.track-title {
					display: flex;
					align-items: center;
					h4 {
						margin: 0;
						font-size: 18px;
						font-weight: 600;
						line-height: 1;
					}
					span.explicit {
						text-transform: uppercase;
						font-size: 8px;
						margin-left: 10px;
						border: 1px solid;
						padding: 2px 3px;
						border-radius: 2px;
						line-height: 10px;
						color: var(--light-gray);
					}
				}
				.artists {
					color: var(--light-gray);
					font-size: 13;
					margin: 7px 0 0;
					line-height: 1;
					a {
						color: inherit;
						text-decoration: none;
					}
				}
			}
			.duration-column {
				span.duration {
					color: var(--light-gray);
					font-size: 14px;
				}
			}
			.actions-column {
				width: 30px;
				margin-left: 15px;
			}
		}
	}
</style>