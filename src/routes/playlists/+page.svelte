<script
lang='ts'
>
  import Button from '$components/Button.svelte';
  import Card from '$components/Card.svelte';
  import Modal from '$components/Modal.svelte';
  import Pagination from '$components/Pagination.svelte';
  import { toasts } from '$stores';
  import MicroModal from 'micromodal';

import type {PageData} from './$types';
  import PlaylistForm from '$components/PlaylistForm.svelte';
  import type { ActionData } from './new/$types';
  import { createEventDispatcher } from 'svelte';

export let data:PageData;
export let form:ActionData;
console.log(data)

let isLoading = false;

$: playlists = data.userPlaylists;

console.log(playlists)

async function loadMoreItems(){
    if(!playlists.next) return;
    
    isLoading = true;

    const res = await fetch(playlists.next.replace('https://api.spotify.com/v1/', '/api/spotify/'));
    if(res.ok){
        const resJSON = await res.json();
        playlists = {...resJSON, items:[...playlists.items, ...resJSON.items]};
    }else{
        toasts.error('Could not load data!');
    }
    isLoading = false; 
}

</script>

<div class='content'>
    {#if playlists.items.length > 0}
     <div class='title'>
        <h1>{data.title}</h1>
        <Button element='a'
        on:click={(e)=>{
            e.preventDefault();
            MicroModal.show('add-playlist-modal');
        }}
        href='/playlists/new'
        >+ Add New</Button>
     </div>
     <div class='grid-items'>
        {#each playlists.items as item}
        {console.log("item",item)}
        <Card {item}/>
        {/each}
     </div>
     <Pagination
     on:loadmore={loadMoreItems}
     paginatedList = {playlists}
     {isLoading}
    />
    {:else}
    <div class='empty'>
        <p>No Playlists Yet!</p>
        <Button element='a'
        href='/playlists/new'
        >+ Add New</Button>
    </div>
    {/if}
</div>

<Modal id="add-playlist-modal"
title="Add a new playlist"
>
<PlaylistForm
on:redirect
{form}
userID={data.user?.id}
action="/playlists/new"
/>
</Modal>

<style lang="scss">
	.content {
		padding-bottom: 60px;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.grid-items {
			margin-bottom: 40px;
		}
		.empty {
			text-align: center;
			margin-top: 40px;
			p {
				font-size: 22px;
				font-weight: 600;
			}
		}
	}
</style>