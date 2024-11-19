import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { preprocess } from 'svelte/compiler';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess({
		
	}),
	preprocess: sveltePreprocess({
	scss:{
		prependData: '@use "src/styles/_function.scss";@use "@unsass/breakpoint";'
	}
	}),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias:{
			$assets:'src/lib/components',
			$actions:'src/lib/actions'
		}
	}
};

export default config;
