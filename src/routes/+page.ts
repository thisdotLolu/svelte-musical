import { fetchRefresh } from "$lib/helpers";
import type { PageLoad } from "./$types";


export const load:PageLoad=async({fetch: _fetch,parent})=>{
    const fetch = (path: string) => fetchRefresh(_fetch, path);
	const { user } = await parent();
	const newReleases = fetch('/api/spotify/browse/new-releases?limit=40');

	const catsRes = await fetch(`api/spotify/browse/categories`);

    const artistRes = await fetch(`api/spotify/artists`)
    
	const catsResJSON: SpotifyApi.MultipleCategoriesResponse | undefined = catsRes.ok
		? await catsRes.json()
		: undefined;

    

    const randomCats = catsResJSON ? catsResJSON.categories.items.sort(()=>0.5 - Math.random()).slice(0,3) : [];

    const randomCatsPromises = randomCats.map(cat => fetch(`/api/spotify/browse/categories/${cat.id}/playlists?limit=6`))

    const [newRealeasesRes, artistsList] = 
    await Promise.all([newReleases, ...randomCatsPromises, artistRes]);


    return{
        newReleases: newRealeasesRes.ok? (await newRealeasesRes.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>): undefined,
        // featuredPlaylists: featuredPlaylistsRes.ok ? featuredPlaylistsRes.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse> : undefined,
        // userPlaylists:userPlaylistsRes.ok? userPlaylistsRes.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse> : undefined,
        homeCategories : randomCats,
        artists:artistsList.ok? artistsList.json() as Promise<SpotifyApi.MultipleArtistsResponse> : undefined
        // categoriesPlaylists: Promise.all(randomCatsRes.map(res=>(res.ok ? res.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>:undefined)))
    }
}