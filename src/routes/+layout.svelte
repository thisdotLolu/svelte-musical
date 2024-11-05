<script lang='ts'>
    import "modern-normalize/modern-normalize.css"
    import '../styles/main.scss'
  import type { LayoutData } from "./$types";
  import { invalidateAll } from "$app/navigation";
  import { LogoutButton } from "$lib/components";


    export let data: LayoutData;
    
    $: user = data.user;
</script>

{#if user}
<p>Hello {user.display_name}</p>
<LogoutButton/>
{/if}

<slot/>