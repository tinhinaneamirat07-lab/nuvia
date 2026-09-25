import { useTranslation } from 'react-i18next'

export function useLang() {
  const { i18n } = useTranslation()
  const lang = (['fr', 'en', 'ar'].includes(i18n.language) ? i18n.language : 'fr') as 'fr' | 'en' | 'ar'
  return lang
}
