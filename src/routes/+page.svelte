<script lang='ts'>
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
				items:data?.newReleases?.albums?.items
			})
		}
		if(data.featuredPlaylists){
			sections.push({
				title:'Featured Playlists',
				path: '/sections/featured-playlists',
				items: data?.featuredPlaylists?.playlists?.items
			})
		}
		data.homeCategories.forEach((category, index) => {
			const categoryPlaylist =  data.categoriesPlaylists
		})
		if(data.userPlaylists){
			sections.push({
				title: 'Your Playlists',
				path:'/playlists',
				items: data?.userPlaylists?.items
			})
		}
	}
</script>