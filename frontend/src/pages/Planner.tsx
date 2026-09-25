import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import type { PlanItem, Slot } from '@/api/types'
import { RecipeImage } from '@/components/RecipeImage'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ArrowLeft, ArrowRight, Basket, Minus, Plus, Warning, X } from '@/components/ui/icons'
import { StateMessage } from '@/components/ui/StateMessage'
import { useMe } from '@/features/auth/queries'
import { usePlan, useGenerateList, useRemovePlanItem, useUpdatePlanItem } from '@/features/planner/queries'
import { RecipePicker } from '@/features/planner/RecipePicker'
import { useLang } from '@/hooks/useLocalized'
import { cn } from '@/lib/cn'
import { addDays, formatDay, fromISODate, startOfWeek, toISODate } from '@/lib/dates'
import { langOf, pick } from '@/lib/localize'

const SLOTS: Slot[] = ['breakfast', 'lunch', 'dinner']

function PlanCard({ item, start }: { item: PlanItem; start: string }) {
  const { t } = useTranslation()
  const lang = useLang()
  const update = useUpdatePlanItem(start)
  const remove = useRemovePlanItem(start)
  const title = pick(item.recipe.title, lang)
  const stepBtn = 'grid size-7 place-items-center rounded-full hover:bg-surface-2 disabled:opacity-40'

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-2">
      <Link to={`/recipes/${item.recipe.slug}`} className="shrink-0">
        <RecipeImage src={item.recipe.image_url} className="size-12 rounded-lg" />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          to={`/recipes/${item.recipe.slug}`}
          lang={langOf(item.recipe.title, lang)}
          className="line-clamp-2 text-sm font-medium leading-snug hover:text-primary"
        >
          {title}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted">
          <button
            type="button"
            className={stepBtn}
            aria-label={t('planner.fewer')}
            disabled={item.servings <= 1}
            onClick={() => update.mutate({ id: item.id, servings: item.servings - 1 })}
          >
            <Minus size={12} weight="bold" />
          </button>
          <span className="min-w-16 text-center tabular-nums">{t('recipe.servings', { count: item.servings })}</span>
          <button
            type="button"
            className={stepBtn}
            aria-label={t('planner.more')}
            disabled={item.servings >= 24}
            onClick={() => update.mutate({ id: item.id, servings: item.servings + 1 })}
          >
            <Plus size={12} weight="bold" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => remove.mutate(item.id)}
        aria-label={t('planner.remove', { name: title })}
        className="grid size-8 shrink-0 place-items-center self-start rounded-full text-muted hover:bg-surface-2 hover:text-text"
      >
        <X size={14} weight="bold" />
      </button>
    </div>
  )
}

export default function Planner() {
  const { t } = useTranslation()
  const lang = useLang()
  const navigate = useNavigate()
  const me = useMe()
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))
  const start = toISODate(weekStart)
  const plan = usePlan(start, Boolean(me.data))
  const generate = useGenerateList()
  const [target, setTarget] = useState<{ day: string; slot: Slot } | null>(null)

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart])
  const today = toISODate(new Date())
  const isThisWeek = start === toISODate(startOfWeek(new Date()))

  const bySlot = useMemo(() => {
    const map = new Map<string, PlanItem[]>()
    for (const item of plan.data ?? []) {
      const key = `${item.day}|${item.slot}`
      map.set(key, [...(map.get(key) ?? []), item])
    }
    return map
  }, [plan.data])

  if (me.isSuccess && !me.data) return <Navigate to="/login?next=%2Fplanner" replace />

  const count = plan.data?.length ?? 0
  const short: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  const range = `${formatDay(days[0], lang, short)} - ${formatDay(days[6], lang, short)}`
  const targetLabel = target
    ? t('planner.addTo', {
        slot: t(`slots.${target.slot}`).toLowerCase(),
        day: formatDay(fromISODate(target.day), lang, { weekday: 'long', day: 'numeric' }),
      })
    : ''

  const navBtn =
    'grid size-10 place-items-center rounded-full border border-border bg-surface hover:bg-surface-2 active:scale-[0.97]'

  return (
    <Container className="py-10 md:py-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('planner.title')}</h1>
          <p className="mt-2 max-w-xl text-muted">{t('planner.subtitle')}</p>
        </div>
        <Button
          size="lg"
          disabled={count === 0 || generate.isPending}
          title={count === 0 ? t('planner.generateHint') : undefined}
          onClick={() => generate.mutate(start, { onSuccess: () => navigate('/shopping') })}
        >
          <Basket size={20} weight="bold" />
          {t('planner.generate')}
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="button" className={navBtn} aria-label={t('planner.previous')} onClick={() => setWeekStart(addDays(weekStart, -7))}>
          <ArrowLeft size={18} weight="bold" className="rtl:-scale-x-100" />
        </button>
        <button type="button" className={navBtn} aria-label={t('planner.next')} onClick={() => setWeekStart(addDays(weekStart, 7))}>
          <ArrowRight size={18} weight="bold" className="rtl:-scale-x-100" />
        </button>
        <p className="text-lg font-semibold" aria-live="polite">
          {range}
        </p>
        {!isThisWeek && (
          <button
            type="button"
            onClick={() => setWeekStart(startOfWeek(new Date()))}
            className="text-sm font-medium text-primary hover:underline"
          >
            {t('planner.thisWeek')}
          </button>
        )}
        {plan.isSuccess && <p className="ms-auto text-sm text-muted">{t('planner.recipesCount', { count })}</p>}
      </div>

      {plan.isError ? (
        <StateMessage
          className="mt-8"
          icon={<Warning size={24} weight="bold" />}
          title={t('explore.errorTitle')}
          body={t('explore.errorBody')}
          action={
            <Button variant="secondary" onClick={() => plan.refetch()}>
              {t('explore.retry')}
            </Button>
          }
        />
      ) : (
        <ol className={cn('mt-6 divide-y divide-border rounded-2xl border border-border bg-surface/50', plan.isPending && 'animate-pulse')}>
          {days.map((d) => {
            const iso = toISODate(d)
            const isToday = iso === today
            return (
              <li key={iso} className="grid gap-4 p-4 md:p-5 lg:grid-cols-[10rem_1fr]">
                <div className="flex items-baseline gap-2 lg:block">
                  <p className={cn('font-semibold capitalize', isToday && 'text-primary')}>
                    {formatDay(d, lang, { weekday: 'long' })}
                  </p>
                  <p className="text-sm text-muted">{formatDay(d, lang, { day: 'numeric', month: 'long' })}</p>
                  {isToday && (
                    <span className="inline-block rounded-full bg-saffron-soft px-2 py-0.5 text-xs font-medium text-text lg:mt-2">
                      {t('planner.today')}
                    </span>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {SLOTS.map((slot) => {
                    const items = bySlot.get(`${iso}|${slot}`) ?? []
                    return (
                      <section key={slot} aria-label={`${t(`slots.${slot}`)}, ${formatDay(d, lang, { weekday: 'long' })}`}>
                        <h3 className="mb-2 text-xs font-medium tracking-wide text-muted">{t(`slots.${slot}`)}</h3>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <PlanCard key={item.id} item={item} start={start} />
                          ))}
                          <button
                            type="button"
                            onClick={() => setTarget({ day: iso, slot })}
                            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-sm text-muted transition-colors hover:border-primary/50 hover:bg-primary-soft/40 hover:text-primary"
                          >
                            <Plus size={14} weight="bold" />
                            {t('planner.add')}
                          </button>
                        </div>
                      </section>
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ol>
      )}

      <RecipePicker target={target} label={targetLabel} onClose={() => setTarget(null)} />
    </Container>
  )
}
