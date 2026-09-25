import { ArrowRight, CalendarCheck, CheckCircle } from '@/components/ui/icons'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const ease = [0.16, 1, 0.3, 1] as const

function Highlighted({ text, part }: { text: string; part: string }) {
  const i = text.indexOf(part)
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <span className="relative whitespace-nowrap">
        <span
          aria-hidden="true"
          className="absolute inset-x-[-0.08em] bottom-[0.06em] -z-10 h-[0.38em] rounded-sm bg-saffron/80 dark:bg-saffron/35"
        />
        {part}
      </span>
      {text.slice(i + part.length)}
    </>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        }

  return (
    <section className="relative">
      <Container className="grid items-center gap-12 pt-10 pb-16 md:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:py-12">
        <div className="max-w-2xl">
          <motion.h1
            {...enter(0)}
            className="relative isolate text-4xl leading-[1.05] font-semibold tracking-tighter text-balance md:text-5xl xl:text-[3.4rem]"
          >
            <Highlighted text={t('hero.title')} part={t('hero.highlight')} />
          </motion.h1>
          <motion.p {...enter(0.1)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
            {t('hero.subtitle')}
          </motion.p>
          <motion.div {...enter(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink to="/register" size="lg">
              {t('nav.start')}
              <ArrowRight size={18} weight="bold" className="rtl:-scale-x-100" />
            </ButtonLink>
            <ButtonLink to="/explore" size="lg" variant="secondary">
              {t('hero.secondary')}
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img
              src="/img/chorba-frik.webp"
              alt={t('hero.imageAlt')}
              width={720}
              height={1000}
              fetchPriority="high"
              className="aspect-[4/5] h-full max-h-[72dvh] w-full object-cover"
            />
          </div>

          {/* Real component preview: a planner entry, not a fake screenshot */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="absolute -bottom-6 start-4 w-64 rounded-2xl border border-border bg-surface p-4 shadow-soft sm:-start-8"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <span className="grid size-6 place-items-center rounded-full bg-saffron text-saffron-fg">
                <CalendarCheck size={14} weight="bold" />
              </span>
              {t('hero.card.day')}
            </div>
            <p className="mt-2 font-semibold">{t('hero.card.recipe')}</p>
            <p className="text-sm text-muted">{t('hero.card.meta')}</p>
            <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
              <CheckCircle size={18} weight="fill" />
              {t('hero.card.status')}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
