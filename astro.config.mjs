import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'astro/config'
import lightningcss from 'vite-plugin-lightningcss'
// https://astro.build/config
export default defineConfig({
	vite: {
		build: {
			cssMinify: 'lightningcss'
		},
		plugins: [
			tailwindcss(),
			lightningcss({
				browserslist: 'last 2 versions and not dead, > 0.3%, Firefox ESR'
			}),
			legacy({
				targets: ['defaults', 'not IE 11']
			})
		]
	},
	prefetch: {
		prefetchAll: true
	},
	site: 'https://example.com',
	integrations: [mdx(), sitemap()]
})
