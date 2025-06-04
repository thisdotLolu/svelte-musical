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
  import { toasts } from "$stores";
  import MicroModal from 'micromodal';
  import { browser } from "$app/environment";
  import { X } from "lucide-svelte";
  import SearchForm from "$components/SearchForm.svelte";

  NProgress.configure({showSpinner:false});

  let topbar:HTMLElement
  let scrollY:number;

  export let data: LayoutData;
  $: hasError = $page.url.searchParams.get('error');
  $: hasSuccess = $page.url.searchParams.get('success')
  $: user = data.user;
  $: userAllPlaylists = data.userAllPlaylists;

  beforeNavigate(()=>{
    NProgress.start()
  })

  afterNavigate(()=>{
    NProgress.done();
  })

  if(browser){
    MicroModal.init();
  }
  
</script>

<svelte:window bind:scrollY/>

<svelte:head>
  <title>Musical {$page.data.title?` - ${$page.data.title}`:''}</title>
</svelte:head>



<Toasts/>

<!-- <button
on:click={()=>toasts.error('Message')}
>Add Toast
</button> -->

<div id="main">
  {#if user}
    <div id="sidebar">
      <Navigation desktop={true} 
      {userAllPlaylists}/>
    </div>
  {/if}
  <div id="content">
    {#if hasError || hasSuccess}
    <div class='message' role='status' class:error={hasError} class:success={hasSuccess}>
      {hasError ?? hasSuccess}      
      <a href={$page.url.pathname} class='close'>
        <X aria-hidden focusable='false'/>
        <span class='visually-hidden'>Close</span>
      </a>    
    </div>
    {/if}
    {#if user}
    <div id="topbar" bind:this={topbar}>
      <div class="topbar-bg"></div>
      <Header 
      {userAllPlaylists}/>
    </div>  
    {/if}
    <main id="main-content"
    class:logged-in={user}
    >
    {#if $page.url.pathname.startsWith('/search')}
    <div class="search-form">
      <SearchForm/>
    </div>
    {/if}
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
      .message {
				position: sticky;
				z-index: 9999;
				padding: 10px 20px;
				top: 0;
				.close {
					position: absolute;
					right: 10px;
					top: 5px;
          color: #fff;
					&:focus {
						outline-color: #fff;
					}
					:global(svg) {
						stroke: #fff;
						vertical-align: middle;
					}
				}
				&.error {
					background-color: red;
				}
				&.success {
					background-color: var(--pink-color);
          color: #fff;
				}
			}
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
        .search-form{
          margin-bottom:40px;
          @include breakpoint.up('lg'){
            display: none;
          }
          :global(input){
            width:100%
          }
        }
        @include breakpoint.up("md") {
          padding: 30px 30px 60px;
        }
        padding-top: calc(30px + 70px) !important;
      }
    }
  }
</style>
