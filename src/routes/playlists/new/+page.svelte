<script lang='ts'>
  import PlaylistForm from "$components/PlaylistForm.svelte";
  import type { ActionData, PageData } from "./$types";

    export let data:PageData;
    export let form:ActionData;
    
</script>
<h2>Add a New Playlist</h2>


<PlaylistForm {form} userID={data?.user?.id}/>