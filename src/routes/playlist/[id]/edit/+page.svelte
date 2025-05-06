<script lang='ts'>
  import PlaylistForm from "$components/PlaylistForm.svelte";
  import type { PageData } from "../$types";
  import type { ActionData } from "./$types";


  export let form:ActionData;
  export let data: PageData;
  $:playlist = data.playlist;

</script>
<h2>{data.title}</h2>


<PlaylistForm {form} {playlist} action="?redirect"/>