import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess'

const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			scess: {
				includePaths: ['src/styles']
			},
			typescript: true
		})
	],
	ssr: {
		noExternal: ['pg']
	},
	kit: { adapter: adapter(),
		paths: {base: '/profile'}
	 }
};

export default config;
