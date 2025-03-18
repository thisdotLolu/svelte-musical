<script lang='ts' context='module'>
    let current: HTMLAudioElement;
</script>

<script lang='ts'>
  import { Pause, Play } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";

  type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  export let track: Track;

  let audio: HTMLAudioElement;
  let paused = true;
  let previewUrl: string | null = track.preview_url || null;
  console.log(track)
  const dispatch = createEventDispatcher<{play: {track:Track}; pause:{track:Track}}>();

  async function fetchPreviewUrl() {
      if (!previewUrl) {
          try {
              const response = await fetch(`/api/preview?song=${encodeURIComponent(track.name)}`);
              const data = await response.json();
              console.log(data)
              if (data.preview_url) {
                  previewUrl = data.preview_url;
              }
          } catch (error) {
              console.error("Error fetching preview:", error);
          }
      }
  }

  fetchPreviewUrl();

  function onPlay() {
      if (current && current !== audio) {
          current.currentTime = 0;
          current.pause();
      }
      current = audio;
      dispatch('play', {track})
  }

  function onPause() {

  }

  console.log("Preview URL:", previewUrl);
</script>

<div class="player">
    <audio on:play={onPlay} bind:this={audio} bind:paused controls src={previewUrl}></audio>
    <button on:click={() => { paused ? audio.play() : audio.pause(); }}>
        {#if paused}
            <Play color='var(--text-color2)' focusable='false' aria-hidden />
        {:else}
            <Pause color='var(--text-color2)' focusable='false' aria-hidden />
        {/if}
    </button>
</div>

<style>
    .player {
        audio {
            display: none;
        }
        button {
            width: 12px;
            height: 12px;
            padding: 0;
            background: none;
            border: none;
            cursor: pointer;
            :global(svg) {
                fill: var(--text-color);
                width: 12px;
                height: 12px;
            }
        }
    }
</style>
