import { cn } from '@/lib/cn'

export function StateMessage({
  icon,
  title,
  body,
  action,
  className,
}: {
  icon: React.ReactNode
  title: string
  body?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-start gap-3 rounded-2xl border border-dashed border-border p-8 md:p-12', className)} role="status">
      <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary">{icon}</span>
      <h2 className="text-lg font-semibold">{title}</h2>
      {body && <p className="max-w-md text-muted">{body}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
