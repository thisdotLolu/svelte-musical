<script lang="ts">
  import msToTime from '$lib/helpers/ms-to-time';
	import { Clock8, ListPlus, ListX } from 'lucide-svelte';
  import Player from './Player.svelte';
  import playingGif from '../../assets/playinggif.gif'
  import { tippy } from '$actions';
  import Button from './Button.svelte';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import { toasts } from '$stores';
  import { hideAll } from 'tippy.js';
  import { invalidate } from '$app/navigation';

	export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];

	let currentPlaying: string | null = null;
	let isPaused:boolean = false;
	let isAddingToPlaylist:string[] = [];
	let isRemovingFromPlaylist:string[] = [];

	export let isOwner: boolean = false;
	export let userPlaylists: SpotifyApi.PlaylistObjectSimplified[] | undefined = undefined;
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
		<div class="actions-column"  class:is-owner={isOwner}/>
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
			<div class="actions-column" class:is-owner={isOwner}>
				{#if isOwner}
				<form method='POST' action="/playlist/{$page.params.id}?/removeItem"
				use:enhance={({cancel})=>{
					if(isRemovingFromPlaylist.includes(track.id)){
						cancel();
					}
					isRemovingFromPlaylist = [...isRemovingFromPlaylist, track.id];
					
					return({result})=>{
						console.log(result)
						if(result.type === 'error'){
								toasts.error(result.error.message);
							}
							if(result.type === 'redirect'){
								const url = new URL(`${$page.url.origin}${result.location}`);
								const error = url.searchParams.get('error');
								const success = url.searchParams.get('success');
								if(error){
									toasts.error(error);
								}
								if(success){
									toasts.success(success);
									invalidate(`/api/spotify/playlist/${$page.params.id}`);
								}
							}
						isRemovingFromPlaylist = isRemovingFromPlaylist.filter(id => id !== track.id);
					}
				}}
				>
					<input hidden name='track' value={track.id}/>
				<button type='submit' title='Remove {track.name} from playlist'
				aria-label='Remove {track.name} from playlist'
				class='remove-pl-button'
				disabled={isRemovingFromPlaylist.includes(track.id)}
				>
					<ListX aria-hidden focusable="false" />
				</button>
				</form>
				{:else}
				<button title='Add {track.name} to a playlist' aria-label='Add {track.name} to a playlist'
				class='add-pl-button'
				disabled={!userPlaylists}
				use:tippy={{
					content: document.getElementById(`${track.id}-playlists-menu`) || undefined,
					allowHTML: true,
					trigger:'click',
					interactive:true,
					theme:'menu',
					placement:'bottom-end',
					onMount:()=>{
						const template = document.getElementById(`${track.id}-playlists-menu`);
						if(template){
							template.style.display = 'block'
						}
					}
				}}>
				<ListPlus aria-hidden focusable="false" />
			</button>
			{#if userPlaylists}
			<div class='playlists-menu'
			style='display: none;'
			id='{track.id}-playlists-menu'>
			    <div class="playlists-menu-content">
					<form method='POST' action='/playlist?/addItem&redirect={$page.url.pathname}'
					use:enhance={({cancel})=>{
						if(isAddingToPlaylist.includes(track.id)){
							cancel();
						}
						isAddingToPlaylist = [...isAddingToPlaylist, track,id];
						return ({result}) =>{
							if(result.type === 'error'){
								toasts.error(result.error.message);
							}
							if(result.type === 'redirect'){
								const url = new URL(`${$page.url.origin}${result.location}`);
								const error = url.searchParams.get('error');
								const success = url.searchParams.get('success');
								if(error){
									toasts.error(error);
								}
								if(success){
									toasts.success(success);
									hideAll()
								}
							}
							isAddingToPlaylist = isAddingToPlaylist.filter(id => id !== track.id);
						}
					}}
					>
						<input hidden value={track.id} name='track'/>
						<div class="field">
						<select name="playlist" aria-label='Playlist' id="">
							{#each userPlaylists as playlist}
								<option value={playlist.id}>{playlist.name}</option>
							{/each}
						</select>
					</div>
					<div class="submit-button">
						<Button element='button' type='submit' disabled={isAddingToPlaylist.includes(track.id)}>Add <div class="visually-hidden"> {track.name} to selected playlist.</div></Button>
					</div>
					</form>
				</div>
		</div>
			{/if}
				{/if}
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
			@include breakpoint.down('md') {
				:global(.no-js) & {
					flex-direction: column;
					background-color: rgba(255, 255, 255, 0.03);
					padding: 20px;
					margin-bottom: 20px;
				}
			}
			&.is-current {
				.info-column .track-title h4,
				.number-column span.number {
					color: var(--accent-color);
				}
			}
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
				.add-pl-button, .remove-pl-button {
					background: none;
					border: none;
					padding: 5px;
					cursor: pointer;
					:global(svg) {
						stroke: var(--text-color);
						vertical-align: middle;
						width: 22px;
						height: 22px;
					}
					&:disabled {
						opacity: 0.8;
						cursor: not-allowed;
					}
				}
				.playlists-menu-content {
					background-color: white;
					padding: 15px;
					.field {
						select {
							width: 100%;
							height: 35px;
							border-radius: 4px;
						}
					}
					.submit-button {
						margin-top: 10px;
						text-align: right;
					}
				}
			}
		}
	}
</style>