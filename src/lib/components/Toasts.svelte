<script lang='ts'>
    import {toasts} from '$stores';
</script>

{#if $toasts.length > 0}
<div class='toasts'>   
    {#each $toasts as toast (toast.id)}
    <div class='toast {toast.type}'>
     <div class="content" role='status'>
        {toast.message}
     </div>
    </div>
    {/each}
</div>
{/if}

<style lang='scss'>
    .toasts {
        position: fixed;
        top: 0;
        right: 0;
        padding: 20px;
        width: 100%;
        max-width: 300px;
        z-index: 1000000;
        color:#fff;
        overflow: auto;
        .toast{
            background-color: var(--pink-color);
            box-shadow: 0 0 10px rgba(1,1,1,0.2);
            border-radius: 10px;
            padding: 10px 20px;
            margin-bottom: 10px;
            font-weight: 500;
            font-size: .8rem;
            &.error{
                background-color: red;
            }
            &.warning{
                background-color: #c1730d;
            }
        }
    }
</style>