import de from './trans/de.json'
import en from './trans/en.json'
import es from './trans/es.json'
import fr from './trans/fr.json'
import pl from './trans/pl.json'
import ru from './trans/ru.json'
import uk from './trans/uk.json'

export const LANGUAGES = {
	en: 'English',
	fr: 'Français',
	es: 'Español',
	ru: 'Русский',
	uk: 'Українська',
	de: 'German',
	pl: 'Polski'
}

export type Locale = 'en' | 'de' | 'es' | 'fr' | 'ru' | 'uk' | 'pl' | string

export const LOCALES = {
	en: 'en-GB',
	uk: 'uk-UA',
	ru: 'ru-UA',
	es: 'es-ES',
	fr: 'fr-FR',
	pl: 'pl-PL',
	de: 'de-DE'
}

interface Fallback {
	[key: string]: string
}

export const defaultLocale: string = 'en'

export const locales = ['en', 'de', 'fr', 'uk', 'ru', 'es', 'pl']
export const LANGUAGES_ARRAY = Object.keys(LANGUAGES)
export const DEFAULT_LANGUAGE = 'en'
export const currentLocale = Object.keys(LANGUAGES)[0]

export const fallback: Fallback = {
	currentLocale: defaultLocale
}

export const TRANSLATIONS = { es, en, fr, uk, ru, pl, de }

export type Lang = keyof typeof TRANSLATIONS
export type Page = keyof (typeof TRANSLATIONS)[typeof DEFAULT_LANGUAGE]
