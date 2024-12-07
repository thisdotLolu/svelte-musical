// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			user: SpotifyApi.CurrentUsersProfileResponse | null,
			title?:string;
		}
		// interface PageState {}
		// interface Platform {}
	}

	declare interface Window{
		refreshPromise: Promise<Response> | null
	}
	
}


export {};
