import { fetchRefresh } from "$lib/helpers";
import type { PageLoad } from "./$types";


export const load:PageLoad=async({fetch: _fetch,parent})=>{
    const fetch = (path:string):any =>{
        fetchRefresh(_fetch, path)
    }
    const {user} = await parent();
    const newRealeases = fetch('/api/spotify/browse/new-releases?limit=6');
    const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=6');
    const userPlaylists = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`)

    const catsRes = await fetch(`api/spotify/browse/categories?limit=20`);
    const catsResJSON: SpotifyApi.MultipleCategoriesResponse | undefined = catsRes.ok ? await catsRes.json() : undefined

    const randomCats = catsResJSON ? catsResJSON.categories.items.sort(()=>0.5 - Math.random()).slice(0,3) : [];

    const randomCatsPromises = randomCats.map(cat => fetch(`/api/spotify/browse/categories/${cat.id}/playlists?limit=6`))

    const [newRealeasesRes, featuredPlaylistsRes, userPlaylistsRes, ...randomCatsRes] = await Promise.all([newRealeases, featuredPlaylists, userPlaylists, ...randomCatsPromises]);


    return{
        newReleases: newRealeasesRes.ok? newRealeasesRes.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>: undefined,
        featuredPlaylists: featuredPlaylistsRes.ok ? featuredPlaylistsRes.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse> : undefined,
        userPlaylists:userPlaylistsRes.ok? userPlaylistsRes.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse> : undefined,
        homeCategories : randomCats,
        categoriesPlaylists: Promise.all(randomCatsRes.map(res=>(res.ok ? res.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>:undefined)))
    }
}