import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig({
	base: '/profile',
	plugins: [sveltekit()],
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	},
	server: {
		host: true,
		port: 5173,
		strictPort: true,
		origin: 'http://host.docker.internal:5173',
		hmr: {
			protocol: 'ws',
			host: 'host.docker.internal',
			clientPort: 5173,
			port: 5173,
			path: '/'
		},
		watch: {
			usePolling: true,
			interval: 100
		},
		allowedHosts: true
	}
});
