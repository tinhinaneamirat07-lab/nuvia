import { ArrowLeft, ArrowRight } from '@/components/ui/icons'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RecipeCard } from '@/components/RecipeCard'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { recipes } from '@/data/recipes'

export function RecipeCarousel() {
  const { t, i18n } = useTranslation()
  const track = useRef<HTMLUListElement>(null)
  const rtl = i18n.dir() === 'rtl'

  const scroll = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: direction * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const arrowBtn =
    'grid size-10 place-items-center rounded-full border border-border bg-surface transition-colors hover:bg-surface-2 active:scale-[0.97]'

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('recipes.title')}</h2>
          <div className="flex items-center gap-2">
            <Link to="/explore" className="me-2 hidden text-sm font-medium text-primary hover:underline sm:inline">
              {t('recipes.all')}
            </Link>
            <button type="button" aria-label={t('recipes.previous')} onClick={() => scroll(-1)} className={arrowBtn}>
              <ArrowLeft size={18} weight="bold" className="rtl:-scale-x-100" />
            </button>
            <button type="button" aria-label={t('recipes.next')} onClick={() => scroll(1)} className={arrowBtn}>
              <ArrowRight size={18} weight="bold" className="rtl:-scale-x-100" />
            </button>
          </div>
        </Reveal>
      </Container>

      <ul
        ref={track}
        className="no-scrollbar mx-auto mt-10 flex max-w-7xl snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:scroll-px-8 lg:px-8"
      >
        {recipes.map((r) => (
          <li key={r.slug} className="w-60 shrink-0 snap-start sm:w-64">
            <RecipeCard recipe={r} />
          </li>
        ))}
      </ul>
    </section>
  )
}
