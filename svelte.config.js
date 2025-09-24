import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [
		vitePreprocess(),
	],
	ssr: {
		noExternal: ['pg']
	},
	kit: { adapter: adapter(),
		paths: {base: '/profile'}
	 }
};

export default config;
