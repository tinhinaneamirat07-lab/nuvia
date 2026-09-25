import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

/** Native <dialog>: focus trap, Escape to close and an accessible modal role for free. */
export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={title}
      className={cn(
        'm-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-surface p-0 text-text shadow-soft backdrop:bg-black/40',
        className,
      )}
    >
      {open && (
        <div className="flex max-h-[85dvh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('planner.close')}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-text"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
          <div className="overflow-y-auto p-6">{children}</div>
        </div>
      )}
    </dialog>
  )
}
