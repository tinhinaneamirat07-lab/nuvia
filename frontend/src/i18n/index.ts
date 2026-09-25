import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './fr'
import en from './en'
import ar from './ar'

export const LANGUAGES = [
  { code: 'fr', label: 'Français', short: 'FR', dir: 'ltr' },
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'ع', dir: 'rtl' },
] as const

export type LangCode = (typeof LANGUAGES)[number]['code']

function initialLang(): LangCode {
  try {
    const saved = localStorage.getItem('nuvia-lang')
    if (saved === 'fr' || saved === 'en' || saved === 'ar') return saved
  } catch {
    /* storage unavailable */
  }
  const nav = navigator.language.slice(0, 2)
  return nav === 'ar' || nav === 'en' ? nav : 'fr'
}

function applyDir(lng: string) {
  const lang = LANGUAGES.find((l) => l.code === lng) ?? LANGUAGES[0]
  document.documentElement.lang = lang.code
  document.documentElement.dir = lang.dir
}

i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en }, ar: { translation: ar } },
  lng: initialLang(),
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

applyDir(i18n.language)
i18n.on('languageChanged', (lng) => {
  applyDir(lng)
  try {
    localStorage.setItem('nuvia-lang', lng)
  } catch {
    /* storage unavailable */
  }
})

export default i18n
