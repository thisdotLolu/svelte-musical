<script lang='ts'>
    import Button from '../../../lib/components/Button.svelte'
  import ItemPage from "$components/ItemPage.svelte";
  import TrackList from "$components/TrackList.svelte";
  import type { ActionData, PageData } from "./$types";
  import { pre } from 'framer-motion/client';
  import { page } from '$app/stores';
  import { Heart, HeartIcon } from 'lucide-svelte';
  import { applyAction, enhance } from '$app/forms';
  import { toasts } from '$stores';

    export let data:PageData;
    export let form: ActionData;

    $:console.log("dat",data)

    $:playlist = data.playlist;
    $: tracks = data.playlist.tracks;
    $:currentPage= $page.url.searchParams.get('page') || 1
    $:isFollowing = data.isFollowing;
    let isLoadingFollow= false;
    let followButton: Button<'button'>
    let isLoading = false

    console.log("pl",playlist)

    let filteredTracks: SpotifyApi.TrackObjectFull[];

    $:{
        filteredTracks = []
        tracks.items.forEach(item=>{
            if(item.track) filteredTracks = [...filteredTracks, item.track]
        })
    }

    const followersFormat = Intl.NumberFormat('en',{notation:'compact'})

    const loadMoreTracks =async()=>{
        if(!tracks.next) return
        isLoading = true;
        const res = await fetch(tracks.next.replace('https://api.spotify.com/v1/', '/api/spotify/'));
        const resJSON = await res.json();

        if(res.ok){
            tracks = {...resJSON, items:[...tracks.items, ...resJSON.items]}
        }else{
            toasts.error(resJSON.error.message || 'Could not load data')
        }
        isLoading = false;
    }

</script>

<ItemPage title={playlist.name}
image={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : undefined }
type={playlist.type}
color={null}
>
    <div slot='meta'>
        <p class="playlist-description">{@html playlist.description}</p>
        <p class="meta">
            <span>{playlist.owner.display_name === undefined ? playlist.owner.display_name:'No name'}</span>
            <span>{followersFormat.format(playlist.followers.total)} followers</span>
            <span>{playlist.tracks.total} Tracks</span>
        </p>
    </div>

    <div class="playlist-actions">
        {#if data.user?.id === playlist.owner.id}
        <Button
        element='a'
        variant='outline'
        >Edit Playlist</Button>
        {:else if isFollowing !== null}
        <form
        class='follow-form'
        method='POST'
        action={`?/${isFollowing? 'unFollowPlaylist':'followPlaylist'}`}
        use:enhance={()=>{
            isLoadingFollow = true;
            return async ({result})=>{
                isLoadingFollow = false;
                if(result.type === 'success'){
                    await applyAction(result);
                    isFollowing = !isFollowing
                }else if (result.type === 'failure'){
                    toasts.error(result.data?.followError as any)
                }else{

                }
                followButton?.focus()
            }
        }}
        >
        <Button
        bind:this={followButton}
        element='button'
        type='submit'
        variant='outline'
        disabled={isLoadingFollow}
        >
        <Heart
        aria-hidden
        focusable='false'
        fill={isFollowing ? 'var(--pink-color)':'none'}
        />
        {isFollowing ? 'Unfollow':'Follow'}
    <span class='visually-hidden'>{playlist.name} playlist</span>
    </Button>
    {#if form?.followError}
    <p class='error'>{form.followError}</p>
    {/if}
        </form>
        {/if}
    </div>

    {#if playlist.tracks.items.length > 0}
    <TrackList tracks={filteredTracks}/>
    {#if tracks.next}
    <div class="load-more">
        <Button
        disabled={isLoading}
        element='button' variant='outline'
        on:click={loadMoreTracks}
        >Load More 
            <span class="visually-hidden">Tracks</span>
        </Button>
    </div>
    {/if}
    <div class="pagination">
        <div class="previous">
            {#if tracks.previous}
             <Button variant ='outline' element='a' href="{$page.url.pathname}?{new URLSearchParams({page: `${Number(currentPage) - 1}`}).toString()}"> Previous</Button>
            {/if}
        </div>
        <div class="next">
            {#if tracks.next}
             <Button variant ='outline' element='a' href="{$page.url.pathname}?{new URLSearchParams({page: `${Number(currentPage) + 1}`}).toString()}"> Next</Button>
            {/if}
        </div>
    </div>
    {:else}
    <div class='empty-playlist'>
        <p>No items added to this playlist yet.</p>
        <Button
        element ='a'
        href='/search'
        >Search for Content</Button>
        <Button
        element ='a'
        href='/playlists'
        >View all playlists</Button>
    </div>
    {/if}
</ItemPage>

<style lang="scss">
	.empty-playlist {
		text-align: center;
		margin-top: 40px;
		p {
			font-size:22px;
			font-weight: 600;
		}
		:global(a) {
			margin: 0 10px;
		}
	}
	.playlist-description {
		color: var(--light-gray);
		font-size:18px;
		margin-bottom: 0;
	}
	.meta {
        color:var(--pink-color);
		font-size: 13px;
		margin-top: 10px;
		span {
			margin-right: 5px;
			&:first-child {
				font-weight: 600;
			}
		}
	}
	.load-more {
		padding: 15px;
		text-align: center;
		:global(html.no-js) & {
			display: none;
		}
	}
	.pagination {
		display: none;
		margin-top: 40px;
		justify-content: space-between;
		:global(html.no-js) & {
			display: flex;
		}
	}
    .playlist-actions {
		display: flex;
		justify-content: flex-end;
		margin: 10px 0 30px;
		.follow-form {
			:global(.button) {
				display: flex;
				align-items: center;
				:global(svg) {
					margin-right: 10px;
					width: 22px;
					height: 22px;
				}
			}
			p.error {
				text-align: right;
				color: var(--error);
				font-size:14px;
			}
		}
	}
</style>
