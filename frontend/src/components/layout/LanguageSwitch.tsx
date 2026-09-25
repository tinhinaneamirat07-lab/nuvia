import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n'
import { cn } from '@/lib/cn'

export function LanguageSwitch({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={cn('flex items-center rounded-full border border-border p-0.5', className)}
    >
      {LANGUAGES.map((l) => {
        const active = i18n.language === l.code
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-pressed={active}
            title={l.label}
            onClick={() => i18n.changeLanguage(l.code)}
            className={cn(
              'h-7 min-w-8 rounded-full px-2 text-xs font-medium transition-colors',
              active ? 'bg-primary text-primary-fg' : 'text-muted hover:text-text',
            )}
          >
            {l.short}
          </button>
        )
      })}
    </div>
  )
}
