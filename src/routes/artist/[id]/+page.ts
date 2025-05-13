import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

export const load: PageLoad = async ({ fetch: _fetch, params, parent, depends, route }) => {
	depends(`app:${route.id}`);
	const fetch = (path: string) => fetchRefresh(_fetch, path);
	const { user } = await parent();
	const artistRes = await fetch(`/api/spotify/artists/${params.id}`);
	if (!artistRes.ok) {
		throw error(artistRes.status, 'Failed to load artist!');
	}
	const artistResJSON: SpotifyApi.SingleArtistResponse = await artistRes.json();

	const [albumsRes, appearsOnRes, topTracksRes, relatedArtistsRes] = await Promise.all([
		fetch(`/api/spotify/artists/${params.id}/albums?limit=6&include_groups=album,single`),
		fetch(`/api/spotify/artists/${params.id}/albums?limit=6&include_groups=appears_on`),
		fetch(`/api/spotify/artists/${params.id}/top-tracks?market=${user?.country}`),
		fetch(`/api/spotify/artists/${params.id}/related-artists`)
	]);

	return {
		title: artistResJSON.name,
		artist: artistResJSON,
		artistAlbums: albumsRes.ok
			? (albumsRes.json() as Promise<SpotifyApi.ArtistsAlbumsResponse>)
			: undefined,
		artistAppearsOn: appearsOnRes.ok
			? (appearsOnRes.json() as Promise<SpotifyApi.ArtistsAlbumsResponse>)
			: undefined,
		artistTopTracks: topTracksRes.ok
			? (topTracksRes.json() as Promise<SpotifyApi.ArtistsTopTracksResponse>)
			: undefined,
		artistRelatedArtists: relatedArtistsRes.ok
			? (relatedArtistsRes.json() as Promise<SpotifyApi.ArtistsRelatedArtistsResponse>)
			: undefined,
	};
};