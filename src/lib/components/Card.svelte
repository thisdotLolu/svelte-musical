<script lang='ts'>
  import { Music } from "lucide-svelte";

    type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
    type PlaylistType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
    type ArtistType = SpotifyApi.ArtistObjectFull;
    const followersFormat = Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    });

    export let item : AlbumType | PlaylistType | ArtistType;
</script>

<div class='card {item.type}'>
    {#if item.images && item.images.length > 0}
    <img
    src={item.images[0].url} alt='{item.type} cover for {item.name}'
    />
    {:else}
    <div class='cover-placeholder'>
        <Music
        color='#000'
        aria-hidden='true'
        focusable='false'
        />
    </div>
    {/if}
    <h4><a href="/{item.type}/{item.id}">{item.name.length > 15 ? `${item.name.substring(0,15)}...` :item.name}</a></h4>
    {#if item.type === 'album'}
    <p>{item.artists.map(item => item.name).join(', ').length > 20 ? `${item.artists.map(item => item.name).join(', ').substring(0,30)}...`:item.artists.map(item => item.name).join(', ')}</p>
    {/if}
    {#if item.type === 'artist'}
    <p class="truncate-1">{followersFormat.format(item.followers.total)} Followers</p>
    {/if}
</div>

<style lang='scss'>
    .card{
        background-color:white;
        padding:10px;
        box-shadow: 0 0 40px rgba(0,0,0,0.4);
        border-radius: 4px;
        transition: background 0.3s;
        height: 270px;
        position: relative;
        

        h4{
            font-size: 1rem;
            line-height: 1;
            margin-bottom: -10px;
            a {
				text-decoration: none;
				color: var(--text-color);
				&:focus-visible {
					outline: none;
					&:after {
						outline: 2px solid var(--accent-color);
					}
				}
				&:after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					border-radius: 4px;
				}
			}
        }

        p{
            color:#ff758c;
            font-size: .8rem;
            position: relative;
        }

        img{
            width:100%;
            object-fit: cover;
            /* margin: 0 0 20px; */
            aspect-ratio: 1;
        }
        .cover-placeholder{
            width: 100%;
            aspect-ratio: 1;
        }
    }
    .card:hover{
            border:1px solid #ff758c;
        }
</style>