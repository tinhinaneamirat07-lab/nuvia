import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import type { Category, Cuisine, RecipeFilters } from '@/api/types'
import { RecipeCard, RecipeCardSkeleton } from '@/components/RecipeCard'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { CookingPot, MagnifyingGlass, Warning, X } from '@/components/ui/icons'
import { StateMessage } from '@/components/ui/StateMessage'
import { useRecipeSearch } from '@/features/recipes/queries'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

const CATEGORIES: Category[] = ['main', 'soup', 'salad', 'starter', 'side', 'breakfast', 'dessert', 'drink']
const CUISINES: Cuisine[] = ['maghrebi', 'mediterranean', 'world']
const DIETS = ['no-pork', 'halal', 'vegetarian', 'vegan', 'gluten-free', 'no-alcohol']
const TIMES = [15, 30, 60]

type FilterKey = 'category' | 'cuisine' | 'diet' | 'max_minutes'

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="hidden w-28 shrink-0 text-sm font-medium text-muted md:block">{label}</span>
      <div
        role="group"
        aria-label={label}
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {children}
      </div>
    </div>
  )
}

export default function Explore() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('q') ?? '')
  const debounced = useDebouncedValue(search.trim(), 300)

  // Keep the URL in sync with the search box, so results can be shared and survive a reload.
  useEffect(() => {
    const current = params.get('q') ?? ''
    if (debounced === current) return
    const next = new URLSearchParams(params)
    if (debounced) next.set('q', debounced)
    else next.delete('q')
    setParams(next, { replace: true })
  }, [debounced, params, setParams])

  const filters: RecipeFilters = useMemo(
    () => ({
      q: params.get('q') ?? undefined,
      category: (params.get('category') as Category) ?? undefined,
      cuisine: (params.get('cuisine') as Cuisine) ?? undefined,
      diet: params.get('diet') ?? undefined,
      max_minutes: params.get('max_minutes') ? Number(params.get('max_minutes')) : undefined,
    }),
    [params],
  )

  const toggle = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(params)
    if (next.get(key) === value) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const hasFilters = ['q', 'category', 'cuisine', 'diet', 'max_minutes'].some((k) => params.has(k))
  const clear = () => {
    setSearch('')
    setParams(new URLSearchParams(), { replace: true })
  }

  const query = useRecipeSearch(filters)
  const recipes = query.data?.pages.flatMap((p) => p.items) ?? []
  const total = query.data?.pages[0]?.total ?? 0

  return (
    <Container className="py-10 md:py-14">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('explore.title')}</h1>

      <div className="relative mt-6 max-w-2xl">
        <label htmlFor="recipe-search" className="sr-only">
          {t('explore.searchLabel')}
        </label>
        <MagnifyingGlass size={20} className="pointer-events-none absolute inset-y-0 start-4 my-auto text-muted" />
        <input
          id="recipe-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('explore.searchPlaceholder')}
          autoComplete="off"
          className="h-14 w-full rounded-full border border-border bg-surface ps-12 pe-12 text-base shadow-soft placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            aria-label={t('explore.clear')}
            className="absolute inset-y-0 end-2 my-auto grid size-10 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-text"
          >
            <X size={18} weight="bold" />
          </button>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <FilterRow label={t('explore.filters.category')}>
          {CATEGORIES.map((c) => (
            <Chip key={c} active={filters.category === c} onClick={() => toggle('category', c)}>
              {t(`categories.${c}`)}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label={t('explore.filters.cuisine')}>
          {CUISINES.map((c) => (
            <Chip key={c} active={filters.cuisine === c} onClick={() => toggle('cuisine', c)}>
              {t(`cuisines.${c}`)}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label={t('explore.filters.diet')}>
          {DIETS.map((d) => (
            <Chip key={d} active={filters.diet === d} onClick={() => toggle('diet', d)}>
              {t(`diets.${d}`)}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label={t('explore.filters.time')}>
          {TIMES.map((m) => (
            <Chip key={m} active={filters.max_minutes === m} onClick={() => toggle('max_minutes', String(m))}>
              {t('explore.filters.under', { count: m })}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <div className="mt-8 flex min-h-9 items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          {query.isSuccess && t('explore.results', { count: total })}
        </p>
        {hasFilters && (
          <button type="button" onClick={clear} className="text-sm font-medium text-primary hover:underline">
            {t('explore.clear')}
          </button>
        )}
      </div>

      <div className="mt-4">
        {query.isPending ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        ) : query.isError ? (
          <StateMessage
            icon={<Warning size={24} weight="bold" />}
            title={t('explore.errorTitle')}
            body={t('explore.errorBody')}
            action={
              <Button variant="secondary" onClick={() => query.refetch()}>
                {t('explore.retry')}
              </Button>
            }
          />
        ) : recipes.length === 0 ? (
          <StateMessage
            icon={<CookingPot size={24} weight="duotone" />}
            title={t('explore.emptyTitle')}
            body={t('explore.emptyBody')}
            action={
              hasFilters && (
                <Button variant="secondary" onClick={clear}>
                  {t('explore.clear')}
                </Button>
              )
            }
          />
        ) : (
          <>
            <ul
              className={`grid grid-cols-2 gap-x-4 gap-y-8 transition-opacity sm:grid-cols-3 lg:grid-cols-4 ${query.isPlaceholderData ? 'opacity-60' : ''}`}
            >
              {recipes.map((r) => (
                <li key={r.slug}>
                  <RecipeCard recipe={r} />
                </li>
              ))}
            </ul>
            {query.hasNextPage && (
              <div className="mt-12 flex justify-center">
                <Button variant="secondary" size="lg" onClick={() => query.fetchNextPage()} disabled={query.isFetchingNextPage}>
                  {t('explore.loadMore')}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <p className="mt-16 text-sm text-muted">
        {t('explore.credit')}{' '}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
          TheMealDB
        </a>
        .
      </p>
    </Container>
  )
}
