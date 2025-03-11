<script lang='ts'>
  import { page } from "$app/stores";
  import { ChevronDown, ExternalLink } from "lucide-svelte";
import Navigation from "./Navigation.svelte";
  import { tippy } from "$actions";
  import LogoutButton from "./LogoutButton.svelte";

  $: user = $page.data.user;

</script>
<div class="content">
    <div class="left">
        <Navigation
        desktop={false}
        />
    </div>
    <div class="right">
        <div id="profile-button">
            <button class="profile-button" use:tippy={{content:document.getElementById('profile-menu')||undefined, onMount:()=>{
                const template = document.getElementById('profile-menu');
                if(template){
                    template.style.display = 'block'
                }
            },trigger:'click',
            placement: 'bottom-end',
            interactive:true,
            theme:"menu"
            }}>
                {#if user?.images && user.images.length > 0}
                <img src={user.images[0].url} alt=''/>
                {/if}
                {user?.display_name} <span class="visually-hidden">Profile Menu</span>
                <ChevronDown class="profile-arrow" size={22}/>
            </button>
        </div>
        <div id="profile-menu" style="display:none;">
            <div class="profile-menu-content">
                <ul>
                    <li>
                        <a href={user?.external_urls.spotify} rel="noopener" target="_blank">View on Spotify <ExternalLink
                            focusable='false'
                            size={20}
                            /></a>
                    </li>
                    <li>
                        <a href="/profile" >View Profile</a>
                    </li>
                    <li>
                       <LogoutButton/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
        color: #000;
	}
    .profile-button{
        background:none;
        border: 1px solid black;
        padding: 5px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        color: black;
        cursor: pointer;
        :global(.profile-arrow){
            margin-left: 3px;
        }
        img{
            width:28px;
            height: 28px;
            border-radius: 100%;
            margin-right: 10px;
        }
        &:hover{
            background-color: #ff758c;
            color: white;
        border: 1px solid #ff758c;
        }
    }
    .profile-menu-content{
        padding: 5px 0;
        background-color: white;
        ul{
            padding: 0;
            margin: 0;
            list-style: none;
            background-color: white;
            li{
                &:hover{
                    background-image: linear-gradient(rgba(255,255,255,0.7) 0 0);
                }
                a :global(svg){
                    vertical-align: middle;
                    margin-left: 10px;
                }
                a,
                :global(button){
                    display:inline-block;
                    padding: 10px 15px;
                    background: none;
                    border: none;
                    text-decoration: none;
                    cursor: pointer;
                    color: #000;
                    width: 100%;
                    text-align: left;
                    font-size: 14px;
                }
            }
        }
    }
</style>