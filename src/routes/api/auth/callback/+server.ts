import { APP_URL, SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET } from "$env/static/private";
import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const GET:RequestHandler=async({url,cookies,fetch})=>{
    const code = url.searchParams.get('code') || null;
    const state = url.searchParams.get('state') || null;
    
    const storedState = cookies.get('spotify_auth_state') || null;
    const storedChallengeVerifier = cookies.get('spotify_auth_challenge_verifier') || null;

    console.log("stored:",storedState)
    console.log("state:",state)

    if(state === null || state !== storedState){
        throw error(400, "State Mismatch!");
    }

    const response = await fetch('https://accounts.spotify.com/api/token',{
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
             Authorization: `Basic ${Buffer.from(`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`).toString('base64')}`
        },
        body: new URLSearchParams({
            code:code || '',
            redirect_uri : `${APP_URL}/api/auth/callback`,
            grant_type:'authorization_code',
            code_verifier:storedChallengeVerifier || '',
            client_id: SPOTIFY_APP_CLIENT_ID
        })
    });
    const responseJSON = await response.json();
    if(responseJSON.error){
        throw error(400, responseJSON.error_description);
    }
    

    cookies.delete('spotify_auth_state',{path:'/'});
    cookies.delete('spotify_auth_challenge_verifier',{path:'/'});
    cookies.set('refresh_token', responseJSON.refresh_token, {path:'/'});
    cookies.set('access_token', responseJSON.access_token, {path:'/'});

    throw redirect(303, '/');
}