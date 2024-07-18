import { defineCollection, z } from 'astro:content'
import { astroZodCollectionsToJsonSchemas } from 'astro-zod-to-json-schema'

const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z
				.string()
				.max(60, 'For optimze SEO, please provide a title with 60 characters or less'),
			description: z
				.string()
				.max(
					160,
					'For optimze SEO, please provide a excerpt/description with 160 characters or less'
				),
			author: z.enum(['Hrihorii Ilin']).optional(),
			categories: z.array(z.string()).optional(),
			heroImage: image(),
			lang: z.enum(['en', 'es', 'uk', 'ru', 'de', 'fr', 'pl']).optional(),
			reference: z.string().optional(),
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z.coerce.date().optional(),
			previewImage: z.string().optional(),
			secret: z.boolean().default(false).optional(),
			tags: z.array(z.string()).default(['other']).optional(),
			canonicalURL: z.string().optional()
		})
})
const clientsCollection = defineCollection({
	type: 'content',
	schema: () =>
		z.object({
			title: z
				.string()
				.max(60, 'For optimze SEO, please provide a title with 60 characters or less'),
			excerpt: z
				.string()
				.max(
					160,
					'For optimze SEO, please provide a excerpt/description with 160 characters or less'
				),
			date: z.date(),
			lang: z.enum(['en', 'es', 'uk', 'ru', 'de', 'fr', 'pl']).optional()
		})
})

const legalCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		lang: z.enum(['en', 'es', 'uk', 'ru', 'de', 'fr', 'pl']).optional()
	})
})

const work = defineCollection({
	type: 'content',
	schema: z.object({
		company: z.string(),
		role: z.string(),
		dateStart: z.coerce.date(),
		dateEnd: z.union([z.coerce.date(), z.string()]),
		lang: z.enum(['en', 'es', 'uk', 'ru', 'de', 'fr', 'pl']).optional()
	})
})

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
		demoUrl: z.string().optional(),
		repoUrl: z.string().optional(),
		lang: z.enum(['en', 'es', 'uk', 'ru', 'de', 'fr', 'pl']).optional()
	})
})

export const collections = {
	blog: blogCollection,
	clients: clientsCollection,
	legal: legalCollection,
	work,
	projects: projectsCollection
}

await astroZodCollectionsToJsonSchemas(collections)
