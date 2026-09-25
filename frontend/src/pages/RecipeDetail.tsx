import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '@/api/client'
import type { Ingredient, RecipeDetail as Recipe } from '@/api/types'
import { RecipeImage } from '@/components/RecipeImage'
import { Badge } from '@/components/ui/Badge'
import { buttonClass } from '@/components/ui/button-styles'
import { Container } from '@/components/ui/Container'
import {
  ArrowLeft,
  ArrowSquareOut,
  Check,
  CookingPot,
  Heart,
  Minus,
  Plus,
  Warning,
  YoutubeLogo,
} from '@/components/ui/icons'
import { StateMessage } from '@/components/ui/StateMessage'
import { useMe } from '@/features/auth/queries'
import { useRecipe, useToggleFavorite } from '@/features/recipes/queries'
import { StepTimer } from '@/features/recipes/StepTimer'
import { useLang } from '@/hooks/useLocalized'
import { cn } from '@/lib/cn'
import { formatMinutes, formatQuantity, langOf, pick } from '@/lib/localize'

const KNOWN_UNITS = new Set(['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'clove', 'bunch', 'pinch', 'piece'])

function IngredientLine({ item, scale, localUnits }: { item: Ingredient; scale: number; localUnits: boolean }) {
  const { t, i18n } = useTranslation()
  const lang = useLang()
  const name = pick(item.name, lang)

  let amount = ''
  if (item.quantity != null) {
    const value = item.quantity * scale
    const unit = item.unit
      ? localUnits && KNOWN_UNITS.has(item.unit)
        ? t(`units.${item.unit}`, { count: Math.ceil(value) })
        : item.unit
      : ''
    amount = [formatQuantity(value, i18n.language), unit].filter(Boolean).join(' ')
  }

  return (
    <span>
      {amount && <span className="font-semibold tabular-nums">{amount} </span>}
      <span lang={langOf(item.name, lang)}>{name}</span>
      {/* Free-text measures like "To taste" read better after the name. */}
      {!amount && item.measure && <span className="text-muted">, {item.measure.toLowerCase()}</span>}
    </span>
  )
}

function Ingredients({ recipe }: { recipe: Recipe }) {
  const { t } = useTranslation()
  const [servings, setServings] = useState(recipe.servings ?? 0)
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const scale = recipe.servings ? servings / recipe.servings : 1

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <section aria-labelledby="ingredients" className="rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-4">
        <h2 id="ingredients" className="text-xl font-semibold">
          {t('recipe.ingredients')}
        </h2>
        {recipe.servings && (
          <div className="flex items-center gap-1 rounded-full border border-border p-1">
            <button
              type="button"
              onClick={() => setServings((s) => Math.max(1, s - 1))}
              disabled={servings <= 1}
              aria-label={t('recipe.fewer')}
              className="grid size-8 place-items-center rounded-full hover:bg-surface-2 disabled:opacity-40"
            >
              <Minus size={16} weight="bold" />
            </button>
            <span className="min-w-24 text-center text-sm font-medium" aria-live="polite">
              {t('recipe.servings', { count: servings })}
            </span>
            <button
              type="button"
              onClick={() => setServings((s) => Math.min(24, s + 1))}
              aria-label={t('recipe.more')}
              className="grid size-8 place-items-center rounded-full hover:bg-surface-2"
            >
              <Plus size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>
      <ul className="mt-5 space-y-1">
        {recipe.ingredients.map((item, i) => {
          const done = checked.has(i)
          return (
            <li key={i}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-surface-2">
                <input type="checkbox" checked={done} onChange={() => toggle(i)} className="peer sr-only" />
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary',
                    done ? 'border-primary bg-primary text-primary-fg' : 'border-border',
                  )}
                >
                  {done && <Check size={14} weight="bold" />}
                </span>
                <span className={cn('leading-relaxed', done && 'text-muted line-through')}>
                  <IngredientLine item={item} scale={scale} localUnits={recipe.source === 'nuvia'} />
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function FavoriteButton({ recipe }: { recipe: Recipe }) {
  const { t } = useTranslation()
  const { data: user } = useMe()
  const navigate = useNavigate()
  const location = useLocation()
  const toggle = useToggleFavorite(recipe.slug)

  const onClick = () => {
    if (!user) {
      navigate(`/login?next=${encodeURIComponent(location.pathname)}`)
      return
    }
    toggle.mutate(!recipe.is_favorite)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={recipe.is_favorite}
      title={user ? undefined : t('recipe.favoriteLogin')}
      className={buttonClass({ variant: recipe.is_favorite ? 'primary' : 'secondary' })}
    >
      <Heart size={18} weight={recipe.is_favorite ? 'fill' : 'bold'} className={recipe.is_favorite ? '' : 'text-amber'} />
      {recipe.is_favorite ? t('recipe.unfavorite') : t('recipe.favorite')}
    </button>
  )
}

export default function RecipeDetail() {
  const { slug = '' } = useParams()
  const { t } = useTranslation()
  const lang = useLang()
  const { data: recipe, isPending, error, refetch } = useRecipe(slug)

  if (isPending) {
    return (
      <Container className="py-10" aria-busy="true">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse rounded-2xl bg-surface-2" />
          <div className="space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-surface-2" />
            <div className="h-5 w-full animate-pulse rounded bg-surface-2" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      </Container>
    )
  }

  if (error || !recipe) {
    const notFound = error instanceof ApiError && error.status === 404
    return (
      <Container className="py-16">
        <StateMessage
          icon={notFound ? <CookingPot size={24} weight="duotone" /> : <Warning size={24} weight="bold" />}
          title={notFound ? t('recipe.notFoundTitle') : t('explore.errorTitle')}
          body={notFound ? t('recipe.notFoundBody') : t('explore.errorBody')}
          action={
            notFound ? (
              <Link to="/explore" className={buttonClass({ variant: 'secondary' })}>
                {t('recipe.back')}
              </Link>
            ) : (
              <button type="button" onClick={() => refetch()} className={buttonClass({ variant: 'secondary' })}>
                {t('explore.retry')}
              </button>
            )
          }
        />
      </Container>
    )
  }

  const title = pick(recipe.title, lang)
  const description = pick(recipe.description, lang)
  const notInMyLanguage = !recipe.title[lang]
  const times = [
    ['recipe.prep', recipe.prep_minutes],
    ['recipe.cook', recipe.cook_minutes],
    ['recipe.total', recipe.total_minutes],
  ].filter(([, v]) => v) as [string, number][]

  return (
    <article className="pb-20">
      <Container className="pt-6">
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text">
          <ArrowLeft size={16} weight="bold" className="rtl:-scale-x-100" />
          {t('recipe.back')}
        </Link>
      </Container>

      <Container className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-2xl bg-surface-2">
          <RecipeImage src={recipe.image_url} alt={title} priority className="aspect-[4/3] w-full" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {recipe.origin && <Badge>{t(`origins.${recipe.origin}`, { defaultValue: recipe.origin })}</Badge>}
            <Badge>{t(`categories.${recipe.category}`)}</Badge>
            {recipe.difficulty && <Badge>{t(`recipes.difficulty.${recipe.difficulty}`)}</Badge>}
          </div>
          <h1 lang={langOf(recipe.title, lang)} className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {title}
          </h1>
          {description && (
            <p lang={langOf(recipe.description, lang)} className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted">
              {description}
            </p>
          )}

          {(times.length > 0 || recipe.calories) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {times.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-muted">{t(label)}</dt>
                  <dd className="font-semibold">{formatMinutes(value, lang)}</dd>
                </div>
              ))}
              {recipe.calories && (
                <div>
                  <dt className="text-sm text-muted">{t('recipe.energy')}</dt>
                  <dd className="font-semibold">{t('recipe.calories', { count: recipe.calories })}</dd>
                </div>
              )}
            </dl>
          )}

          {recipe.diets.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {recipe.diets.map((d) => (
                <li key={d}>
                  <Badge className="bg-primary-soft text-primary">{t(`diets.${d}`, { defaultValue: d })}</Badge>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <FavoriteButton recipe={recipe} />
            {recipe.video_url && (
              <a href={recipe.video_url} target="_blank" rel="noreferrer" className={buttonClass({ variant: 'ghost' })}>
                <YoutubeLogo size={20} weight="fill" className="text-red-600" />
                {t('recipe.video')}
              </a>
            )}
          </div>

          {notInMyLanguage && <p className="mt-6 text-sm text-muted">{t('recipe.translated')}</p>}
        </div>
      </Container>

      <Container className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <Ingredients recipe={recipe} />

        <section aria-labelledby="steps">
          <h2 id="steps" className="text-xl font-semibold">
            {t('recipe.steps')}
          </h2>
          <ol className="mt-6 space-y-8">
            {recipe.steps.map((step) => (
              <li key={step.position} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary"
                >
                  {step.position}
                </span>
                <div className="pt-1">
                  <p lang={langOf(step.text, lang)} className="max-w-[65ch] text-[17px] leading-relaxed">
                    {pick(step.text, lang)}
                  </p>
                  {step.timer_seconds && <StepTimer seconds={step.timer_seconds} />}
                </div>
              </li>
            ))}
          </ol>

          {recipe.source === 'themealdb' && (
            <p className="mt-12 flex flex-wrap items-center gap-x-2 border-t border-border pt-6 text-sm text-muted">
              {t('recipe.sourceCredit', { name: 'TheMealDB' })}
              {recipe.source_url && (
                <a
                  href={recipe.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  {t('recipe.source')}
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              )}
            </p>
          )}
        </section>
      </Container>
    </article>
  )
}
