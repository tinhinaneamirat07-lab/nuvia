import { cn } from '@/lib/cn'

export function Chip({
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'h-9 shrink-0 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors active:scale-[0.98]',
        active
          ? 'border-primary bg-primary text-primary-fg'
          : 'border-border bg-surface text-text hover:border-primary/40 hover:bg-surface-2',
        className,
      )}
      {...props}
    />
  )
}
