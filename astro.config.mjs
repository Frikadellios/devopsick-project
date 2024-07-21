import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import AutoImport from 'unplugin-auto-import/astro'
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
	site: 'https://devopsick.com',
	integrations: [
		sitemap(),
		AutoImport({
			defaultExportByFilename: false,
			include: [
				/\.[tj]sx?$/ // .ts, .tsx, .js, .jsx
			],
			packagePresets: ['detect-browser-es'],
			imports: ['react', 'react-router'],
			dirs: ['./src/utils/*.ts', './src/hooks'],
			dts: './src/auto-imports.d.ts'
		}),
		react({ experimentalReactChildren: true }),
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				theme: 'github-dark-dimmed',
				wrap: true
			},
			gfm: true,
			drafts: true
		}),
		icon()
	]
})
