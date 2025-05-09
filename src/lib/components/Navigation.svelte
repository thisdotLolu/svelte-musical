<script lang="ts">
  import { Home, type Icon, ListMusic, Menu, Search, X } from "lucide-svelte";
  import { tick, type ComponentType } from "svelte";
  import logo from "../../assets/apple-music.svg";
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { beforeNavigate } from "$app/navigation";
  import IconButton from "./IconButton.svelte";

  export let desktop: boolean;
  export let userAllPlaylists: SpotifyApi.PlaylistObjectSimplified[] | undefined =
    undefined;

  const menuItems: {
    path: string;
    label: string;
    icon: ComponentType<Icon>;
  }[] = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Search", icon: Search },
    { path: "/playlists", label: "Playlists", icon: ListMusic },
  ];

  let isMobileMenuOpen = false;

  $: isOpen = desktop || isMobileMenuOpen;

  let openMenuButton: IconButton;
  let closeMenuButton: IconButton;
  let lastFocusableElement: HTMLAnchorElement;

  const openMenu = async () => {
    isMobileMenuOpen = true;
    await tick();
    closeMenuButton.getButton().focus();
  };

  const closeMenu = () => {
    isMobileMenuOpen = false;
    openMenuButton.getButton().focus();
  };

  const moveFocusToBottom = (e: KeyboardEvent) => {
    if (desktop) return;
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    }
  };

  const moveFocusToTop = (e: KeyboardEvent) => {
    if (desktop) return;
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      closeMenuButton.getButton().focus();
    }
  };
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  };

  beforeNavigate(() => {
    isMobileMenuOpen = false;
  });
  console.log(desktop)
</script>

<svelte:head>
  {#if !desktop && isMobileMenuOpen}
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<div class="nav-content" class:desktop class:mobile={!desktop}>
  {#if !desktop && isMobileMenuOpen}
    <div
      class="overlay"
      on:click={closeMenu}
      transition:fade={{ duration: 200 }}
      on:keyup={handleEscape}
    ></div>
  {/if}
  <nav aria-label="Main">
    {#if !desktop }
      <!-- <button
        bind:this={openMenuButton}
        on:click={openMenu}
        aria-expanded={isOpen}>Open</button -->
      <IconButton
        icon={Menu}
        label="Open Menu"
        bind:this={openMenuButton}
        on:click={openMenu}
        aria-expanded={isOpen}
        class="menu-button"
      />
    {/if}
    <div
      class="nav-content-inner"
      style:visibility={isOpen ? "visible" : "hidden"}
      class:is-hidden={!isOpen}
      on:keyup={handleEscape}
    >
      {#if !desktop}
      <IconButton
      icon={X}
      label="Close Menu"
      bind:this={closeMenuButton}
          on:click={closeMenu}
          on:keydown={moveFocusToBottom}
          class='close-menu-button'
      />
      {/if}
      <div class="logo-and-menu">
      <img src={logo} alt="music" />
      <ul>
        {#each menuItems as item, index}
          {@const iconProps = {
            focusable: "false",
            "aria-hidden": true,
            color:'#ff758c',
            size: 26,
            strokeWidth: 2,
          }}
          <li class:active={item.path === $page.url.pathname}>
            {#if menuItems.length === index + 1}
              <a
                bind:this={lastFocusableElement}
                href={item.path}
                on:keydown={moveFocusToTop}
              >
                <svelte:component 
                this={item.icon} {...iconProps} />
                {item.label}
              </a>
            {:else}
              <a href={item.path}>
                <svelte:component this={item.icon} {...iconProps} />
                {item.label}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
    {#if userAllPlaylists && userAllPlaylists.length > 0}
    <hr/>
    <div class='all-playlists'>
      <ul>
        {#each userAllPlaylists as playlist}
        <li class:active={$page.url.pathname === `/playlist/${playlist.id}`}>
        <a href='/playlist/{playlist.id}'>{playlist.name}</a>
        </li>
        {/each}
      </ul>
    </div>
    {/if}
  </div>
  </nav>
</div>

<style lang="scss">
  .nav-content {
    .overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: black;
      opacity: 0.75;
      z-index: 100;
      @include breakpoint.up("md") {
        display: none;
      }
    }
    border-right: 1px solid rgb(173, 174, 174);
    .logo {
      max-width: 100%;
      width: 130px;
    }
    .nav-content-inner {
      padding: 20px;
      min-width: 200px;
      background-color: #fff;
      height: 100vh;
      overflow: auto;
      display: none;
      img {
        width: 30px;
      }
      ul {
        padding: 0;
        margin: 20px 0 0;
        list-style: none;
        li {
          &.active {
            a {
              opacity: 1;
            }
          }
          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--text-color);
            font-size: 14px;
            font-weight: 500;
            padding: 5px;
            margin: 10px 0;
            opacity: 0.7;
            transition: opacity 0.2s;
            &:hover,
            &:focus {
              opacity: 1;
            }
            :global(svg) {
              margin-right: 12px;
            }
          }
        }
      }
    }
    &.desktop {
      position: sticky;
      top: 0;
      .nav-content-inner {
        @include breakpoint.up("md") {
          display: block;
        }
      }
      .bars{
        display: none;
      }
    }
    &.mobile .nav-content-inner {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      transition:
        transform 200ms,
        opacity 200ms;
      &.is-hidden {
        transform: translateX(-100%);
        transition:
          transform 200ms,
          opacity 200ms visibility 200ms;
        opacity: 0;
      }
      @include breakpoint.down("md") {
        display: block;
      }
    }
    :global(.menu-button){
        @include breakpoint.up('md'){
            display: none;
        }
    }
    :global(.close-menu-button){
        position: absolute;
        right: 20px;
        top:20px;
    }
  }
</style>
