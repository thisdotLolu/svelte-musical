<script lang="ts">
  import "modern-normalize/modern-normalize.css";
  import "../styles/main.scss";
  import type { LayoutData } from "./$types";
  import { afterNavigate, beforeNavigate, invalidateAll } from "$app/navigation";
  import { Header, LogoutButton, Navigation } from "$lib/components";
  import { page } from "$app/stores";
  import NProgress from 'nprogress';
  import 'nprogress/nprogress.css'
  import Toasts from "$components/Toasts.svelte";

  NProgress.configure({showSpinner:false});

  let topbar:HTMLElement
  let scrollY:number;

  export let data: LayoutData;


  $: user = data.user;

  beforeNavigate(()=>{
    NProgress.start()
  })

  afterNavigate(()=>{
    NProgress.done();
  })
</script>

<svelte:window bind:scrollY/>

<svelte:head>
  <title>Musical {$page.data.title?` - ${$page.data.title}`:''}</title>
</svelte:head>



<Toasts/>

<div id="main">
  {#if user}
    <div id="sidebar">
      <Navigation desktop={true} />
    </div>
  {/if}
  <div id="content">
    {#if user}
    <div id="topbar" bind:this={topbar}>
      <div class="topbar-bg"></div>
      <Header/>
    </div>
    {/if}
    <main id="main-content">
      <slot />
    </main>
  </div>
</div>

<style lang="scss">
  #main {
    display: flex;
    flex: 1;
    #content {
      flex: 1;
      #topbar {
        position: fixed;
        height: 70px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        width: 100%;
        z-index: 100;
        border-bottom: 1px solid rgb(173, 174, 174);
        .topbar-bg{
          background-color: #fff;
          z-index: -1;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        @include breakpoint.up('md'){
          padding: 0 30px;
          width: calc(100% - 200px)
        }
      }

      main#main-content {
        padding: 30px 15px 60px;
        @include breakpoint.up("md") {
          padding: 30px 30px 60px;
        }
        padding-top: calc(30px + 70px) !important;
      }
    }
  }
</style>
