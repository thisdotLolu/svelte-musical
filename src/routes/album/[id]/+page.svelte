<script lang='ts'>
    import { getCopyrightSymbol } from '$lib/helpers';
    import type {PageData} from './$types';
    import {Itempage} from '$lib/components'
    import TrackList from '$components/TrackList.svelte';
    export let data:PageData;

    $:album = data.album;
</script>

<Itempage
title={album.name}
type={album.album_type}
color={null}
image={album.images.length > 0 ? album.images[0].url:undefined}
>
 <p 
 slot='meta'
 class='meta'>
 <span>
  {album.artists.map((artist)=> artist.name).join(', ')}   
 </span>
 <span class='date'>
    {new Date(album.release_date).getFullYear()}
 </span>
 <span class='tracks-count'>{`${album.total_tracks} Track${album.total_tracks > 1 ? 's':''}`}</span>
 </p>

 <TrackList 
 userPlaylists={data.userAllPlaylists?.filter(pl => pl.owner.id === data.user?.id)}
 tracks={album.tracks.items} />

    <div class='credits'>
        <p class='date'>
            {new Date(album.release_date). toLocaleDateString('en', {
                dateStyle: 'medium'
            })}
        </p>
        {#each album.copyrights as copyright}
        <p class='copyright'>
            {getCopyrightSymbol(copyright.type)}
            {copyright.text}
        </p>
        {/each}
    </div>
</Itempage>



<style lang="scss">
    .meta {
		font-size: 13px;
		font-weight: 600;
		span {
			margin-right: 5px;
            color:#ff758c;
			&.tracks-count {
				font-weight: 400;
				margin: 0 0 0 5px;
				color: #ff758c;
			}
		}
	}
	.credits {
		margin-top: 40px;
		p {
			color: var(--light-gray);
			margin: 0;
			font-size: 11px;
			&.date {
				font-size: 12px;
			}
		}
	}
</style>