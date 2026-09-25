import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeSlash } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

export function Field({ label, hint, error, className, type = 'text', ...input }: FieldProps) {
  const { t } = useTranslation()
  const id = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && visible ? 'text' : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-12 w-full rounded-xl border bg-surface px-4 text-base text-text placeholder:text-muted/70 transition-colors',
            'focus:border-primary focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-primary/25',
            error ? 'border-red-600 dark:border-red-400' : 'border-border',
            isPassword && 'pe-12',
          )}
          {...input}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? t('auth.hide') : t('auth.show')}
            className="absolute inset-y-0 end-0 grid w-12 place-items-center text-muted hover:text-text"
          >
            {visible ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
