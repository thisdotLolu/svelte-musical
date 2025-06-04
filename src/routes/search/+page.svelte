<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: items = data.categories?.categories.items;
    console.log('categories',data.categories)
</script>

{#if items}
	<h2>Browse Categories</h2>
	<div class="items">
		{#each items as item}
        <div>
            <div class="item">
				<a href="/category/{item.id}">
					{#if item.icons.length > 0}
						<img src={item.icons[0].url} alt="" />
					{/if}
				</a>
			</div>
            <span class="truncate-1">{item.name}</span>
        </div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.items {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
        

		.item {
			position: relative;
			a {
				text-decoration: none;
			}
			span {
				color: white;
				font-size:16px;
				font-weight: 700;
				position: absolute;
				bottom: 20px;
				width: 100%;
				text-align: center;
				padding: 0 10px;
			}
			img {
				width: 100%;
				aspect-ratio: 1;
				object-fit: cover;
			}
		}
		@include breakpoint.up('sm') {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@include breakpoint.up('md') {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		@include breakpoint.up('xl') {
			grid-template-columns: repeat(7, minmax(0, 1fr));
			.item span {
				font-size:20px
			}
		}
	}
</style>