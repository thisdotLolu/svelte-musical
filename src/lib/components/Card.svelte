<script lang='ts'>
  import { Music } from "lucide-svelte";

    type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
    type PlaylistType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
    type ArtistType = SpotifyApi.ArtistObjectFull;

    export let item : AlbumType | PlaylistType | ArtistType;
</script>

<div class='card {item.type}'>
    {#if item.images.length > 0}
    <img
    src={item.images[0].url} alt='{item.type} cover for {item.name}'
    />
    {:else}
    <div class='cover-placholder'>
        <Music
        color='#000'
        aria-hidden='true'
        focusable='false'
        />
    </div>
    {/if}
</div>

<style lang='scss'>
    .card{
        background-color:white;
        padding:'10px';
        box-shadow: 0 0 40px rgba(0,0,0,0.4);
        border-radius: 4px;
        transition: background 0.3s;

        img{
            width:100%;
            object-fit: cover;
            margin: 0 0 20px;
            aspect-ratio: 1;
        }
        .cover-placholder{
            width: 100%;
            aspect-ratio: 1;
        }
    }
</style>