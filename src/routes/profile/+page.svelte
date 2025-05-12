<script lang='ts'>
  import ItemPage from "$components/ItemPage.svelte";
  import type { PageData } from "./$types";

    export let data: PageData;

    $: user = data.user;
    $: following = data.following;

    const followersFormat = Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    });
</script>


<div>

<ItemPage
color={''}
type={user?.type}
image={user?.images && user?.images?.length > 0 ? user?.images[0]?.url : undefined}
title={user?.display_name || ''}
>
<span slot='meta' class="following-count">{followersFormat.format(user?.followers?.total || 0)} Followers</span>
</ItemPage>
</div>


<style lang='scss'>

</style>