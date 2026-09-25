import { Clock } from '@/components/ui/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import type { Recipe } from '@/data/recipes'
import { useLang } from '@/hooks/useLocalized'
import { cn } from '@/lib/cn'

export function RecipeCard({ recipe, className }: { recipe: Recipe; className?: string }) {
  const { t } = useTranslation()
  const lang = useLang()
  return (
    <Link to={`/recipes/${recipe.slug}`} className={cn('group block', className)}>
      <div className="overflow-hidden rounded-2xl bg-surface-2">
        <img
          src={recipe.image}
          alt=""
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-3 font-semibold leading-snug group-hover:text-primary">{recipe.title[lang]}</h3>
      <div className="mt-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-sm text-muted">
          <Clock size={15} weight="bold" />
          {t('recipes.minutes', { count: recipe.minutes })}
        </span>
        <Badge>{t(`recipes.difficulty.${recipe.difficulty}`)}</Badge>
      </div>
    </Link>
  )
}
