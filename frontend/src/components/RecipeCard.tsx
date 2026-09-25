import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { RecipeSummary } from '@/api/types'
import { RecipeImage } from '@/components/RecipeImage'
import { Badge } from '@/components/ui/Badge'
import { Clock } from '@/components/ui/icons'
import { useLang } from '@/hooks/useLocalized'
import { cn } from '@/lib/cn'
import { formatMinutes, langOf, pick } from '@/lib/localize'

export function RecipeCard({ recipe, className }: { recipe: RecipeSummary; className?: string }) {
  const { t } = useTranslation()
  const lang = useLang()
  return (
    <Link to={`/recipes/${recipe.slug}`} className={cn('group block', className)}>
      <div className="overflow-hidden rounded-2xl bg-surface-2">
        <RecipeImage
          src={recipe.image_url}
          className="aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <h3 lang={langOf(recipe.title, lang)} className="mt-3 line-clamp-2 font-semibold leading-snug group-hover:text-primary">
        {pick(recipe.title, lang)}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {recipe.total_minutes != null && (
          <span className="inline-flex items-center gap-1 text-sm text-muted">
            <Clock size={15} weight="bold" />
            {formatMinutes(recipe.total_minutes, lang)}
          </span>
        )}
        {recipe.difficulty && <Badge>{t(`recipes.difficulty.${recipe.difficulty}`)}</Badge>}
        {!recipe.difficulty && recipe.origin && <Badge>{t(`origins.${recipe.origin}`, { defaultValue: recipe.origin })}</Badge>}
      </div>
    </Link>
  )
}

export function RecipeCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-surface-2" />
      <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-surface-2" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-surface-2" />
    </div>
  )
}
