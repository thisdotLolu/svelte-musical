import { fetchRefresh } from '$helpers';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
    const query = url.searchParams.get('q');
    if(query){
        throw redirect(307, `/search/${query}`)
    }
	const catsRes = await fetchRefresh(fetch, `/api/spotify/browse/categories?limit=50`);
	let categories = undefined;

	if (catsRes.ok) {
		categories = await catsRes.json();
	}

	return {
		title: 'Search',
		categories
	};
};
