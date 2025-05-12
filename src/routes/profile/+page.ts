import { fetchRefresh } from "$helpers";
import type {PageLoad} from "../$types";

export const load:PageLoad = async({fetch, parent}) =>{
    const {user} = await parent();

    const followingReq = fetchRefresh(fetch, `/api/spotify/me/following?type=artist&limit=6`)
    


    return {
        following: (await followingReq).ok ? await (await followingReq).json() as Promise<SpotifyApi.UsersFollowedArtistsResponse> : undefined,
        title: user?.display_name
    }
}