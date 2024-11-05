import { SPOTIFY_BASE_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";


//handles grabbing refresh and access tokens from cookies (because cookies are on the server)
export const load:LayoutServerLoad = async({cookies, fetch, url}) => {
    const accessToken = cookies.get('access_token');
    const refreshToken = cookies.get('refresh_token')
    if(!accessToken){
        return{
            user:null
        }
    }

    const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

    if(profileRes.ok){
        const profile:SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();

        return{
            user:profile
        }
    }
    if(profileRes.status === 401 && refreshToken){
        //refresh
        const refreshRes = await fetch('/api/auth/refresh')
        if(refreshRes.ok){
            throw redirect(307,'/')
        }
    }
    else{
        return{
            user:null
        }
    }
}