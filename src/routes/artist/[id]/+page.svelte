<script lang="ts">
	import type { PageData } from './$types';
	import { Itempage,  Card, Button } from '$components';
  import TrackList from '$components/TrackList.svelte';

	export let data: PageData;

	$: artist = data.artist;



	const followersFormat = Intl.NumberFormat('en', { notation: 'compact' });
</script>

<Itempage
	title={artist.name}
	image={artist.images.length ? artist.images[0].url : undefined}
	color='undefined'
	type={artist.type}
>
	<p class="meta" slot="meta">
		{followersFormat.format(artist.followers.total)} Followers
	</p>

	<div class="content">
		<!-- {#if topTracks && topTracks.tracks.length > 0}
			<div class="section">
				<div class="section-title">
					<h2>Top Tracks</h2>
				</div>
				<TrackList
					tracks={topTracks.tracks}
					userPlaylists={data.userAllPlaylists?.filter((pl) => pl.owner.id === data.user?.id)}
				/>
			</div>
		{/if} -->

		<!-- {#if albums && albums.items.length > 0}
			<div class="section">
				<div class="section-title">
					<h2>Albums</h2>
					<Button element="a" href={`/artist/${artist.id}/albums`} variant="outline"
						>View All <span class="visually-hidden">Albums</span></Button
					>
				</div>
				<div class="grid-items">
					{#each albums.items as album}
						<div class="grid-item">
							<Card item={album} />
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if appearsOn && appearsOn.items.length > 0}
			<div class="section">
				<div class="section-title">
					<h2>Appears On</h2>
					<Button element="a" href={`/artist/${artist.id}/appears-on`} variant="outline"
						>View All <span class="visually-hidden">artist appearances</span></Button
					>
				</div>
				<div class="grid-items">
					{#each appearsOn.items as album}
						<div class="grid-item">
							<Card item={album} />
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if relatedArtists && relatedArtists.artists.length > 0}
			<div class="section">
				<div class="section-title">
					<h2>Related Artists</h2>
					<Button element="a" href={`/artist/${artist.id}/related-artists`} variant="outline"
						>View All <span class="visually-hidden">Related Artists</span></Button
					>
				</div>
				<div class="grid-items">
					{#each relatedArtists.artists.splice(0, 6) as artists}
						<div class="grid-item">
							<Card item={artists} />
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div> -->
</Itempage>

<style lang="scss">
	.section {
		margin-bottom: 40px;
		.section-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10px;
			h2 {
				font-size: 26px;
				font-weight: 600;
			}
		}
	}
</style>