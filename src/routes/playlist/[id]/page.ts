import { fetchRefresh } from "$lib/helpers";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../$types";

export const load:PageLoad=async({fetch:_fetch, params})=>{
    const fetch = (path:string) => fetchRefresh(_fetch, path);

    const playlistRes = await fetch(`/api/spotify/playlists/${params.id}`);

    if(!playlistRes.ok){
        throw error (playlistRes.status, 'Failed to load playlist!')
    }

    const playlistResJSON: SpotifyApi.SinglePlaylistResponse = await playlistRes.json();

    console.log(playlistResJSON)
  return{
    playlist:playlistResJSON,
    title:playlistResJSON.name
  }

}