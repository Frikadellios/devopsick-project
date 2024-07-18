import { DEFAULT_LANGUAGE, LANGUAGES, type Lang, type Page, TRANSLATIONS } from '@/locales/config'
import { defaultLang, languages, ui } from './ui'
/**
 * Obtiene el idioma por el pathname.
 * @param pathname
 */
export function getLangFromPathname(pathname: string) {
	const [, lang] = pathname.split('/')
	return lang as Lang
}

/**
 * Obtiene el idioma de la página actual por un objeto URL.
 * @param url
 */
export function getLanguageFromUrl(url: URL) {
	return getLangFromPathname(url.pathname)
}

/**
 * Configura la función `t` para el idioma indicado.
 * @param lang
 * @param defaultPage - Indica la página por defecto perteneciente al TRANSLATIONS y que debe estar en el idioma por defecto.
 * @returns Retorna la función `t`.
 */
export function useTranslations(lang: Lang, defaultPage?: Page) {
	/**
	 * Devuelve el texto traducido en la página por defecto o en la especificada.
	 * @param page - Especifica la página, e.g. `home`, `about`, etc. La clave es de un solo nivel, por tanto `home.title` no es válido.
	 * @returns Retorna el texto traducido.
	 */

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return function t(page?: Page): any {
		const lang$ = lang in LANGUAGES ? lang : DEFAULT_LANGUAGE
		const page$ = page ?? defaultPage

		return page$ ? TRANSLATIONS[lang$][page$] : ''
	}
}

export type UiType = keyof typeof ui
export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/')
	if (lang in languages) return lang as keyof typeof languages
	if (lang in ui) return lang as UiType
	return defaultLang
}

export function useTranslation(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key]
	}
}

export function getRouteFromUrl(url: URL): string | undefined {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as keyof typeof ui
}

export function changeLangFromUrl(url: URL, lang: string) {
	const newLang = lang in ui ? lang : defaultLang
	const splitUrl = url.pathname.split('/')
	splitUrl[1] = newLang
	return splitUrl.join('/').substring(1)
}
export function pathNameIsInLanguage(pathname: string, lang: UiType) {
	return (
		pathname.startsWith(`/${lang}`) ||
		(lang === defaultLang && !pathNameStartsWithLanguage(pathname))
	)
}

function pathNameStartsWithLanguage(pathname: string) {
	let startsWithLanguage = false
	const languages = Object.keys(LANGUAGES)

	for (let i = 0; i < languages.length; i++) {
		const lang = languages[i]
		if (pathname.startsWith(`/${lang}`)) {
			startsWithLanguage = true
			break
		}
	}

	return startsWithLanguage
}

export function getLocalizedPathname(pathname: string, lang: UiType) {
	if (pathNameStartsWithLanguage(pathname)) {
		const availableLanguages = Object.keys(LANGUAGES).join('|')
		const regex = new RegExp(`^\/(${availableLanguages})`)
		return pathname.replace(regex, `/${lang}`)
	}
	return `/${lang}${pathname}`
}

export { ui }
