<script lang='ts'>
  import ItemPage from "$assets/ItemPage.svelte";
  import type { PageData } from "./$types";

    export let data:PageData;

    $:console.log("dat",data)

    $:playlist = data.playlist;
    $: tracks = data.playlist.tracks;

    console.log("pl",playlist)

    let filteredTracks: SpotifyApi.TrackObjectFull[];

    $:{
        filteredTracks = []
        tracks.items.forEach(item=>{
            if(item.track) filteredTracks = [...filteredTracks, item.track]
        })
    }

</script>

<ItemPage title={playlist.name}
image={playlist.images.length > 0 ? playlist.images[0].url : undefined }
>
    
</ItemPage>