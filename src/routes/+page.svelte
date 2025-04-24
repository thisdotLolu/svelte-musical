<script lang='ts'>

import { Button, Card } from '$lib/components';
import type { PageData } from "./$types";

	export let data:PageData;
	console.log("",data)

	let sections:{
		title: string,
		path: string,
		items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[]
	}[] = [];



	$:{
		if(data.newReleases){
			sections.push({
				title:'New Releases',
				path:'/sections/new-releases',
				items:data.newReleases.albums?.items
			})
		}

		// data.homeCategories.forEach((category,index)=>{
		// 	const categoryPlaylist = data.categoriesPlaylists[index];
		// 	console.log(categoryPlaylist)
		// 	if(categoryPlaylist){
		// 		sections.push({
		// 			title:category.name,
		// 			path: `/category/${category.id}`,
		// 			items: categoryPlaylist.playlists.items
		// 		})
		// 	}
		// })
	}
</script>

{#each sections as section}
<section class='content-row'>
	<div class="content-row-header">
		<div class="right">
			<h2 class='section-title'>{section.title}</h2>
		</div>
		<div class="left">
			<!-- <Button
			element="a"
			href={section.path}
			variant='outline'
			>
			See All
		</Button> -->
		</div>
	</div>
	<div class='grid-items'>
		{#each section.items as item}
		<div class='grid-item'>
			<Card
			item={item}
			/>
		</div>
		{/each}
	</div>
</section>
{/each}

<style lang="scss">
	.content-row {
		.content-row-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			.section-title {
				font-size: 20px;
				font-weight: 600;
				margin: 0;
			}
		}
	}
</style>