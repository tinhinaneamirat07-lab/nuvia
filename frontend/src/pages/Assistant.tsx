import { useTranslation } from 'react-i18next'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ArrowRight, Basket, CalendarCheck, Carrot, Microphone, Sparkle } from '@/components/ui/icons'

const ICONS = [Carrot, CalendarCheck, Basket, Microphone]

/** Placeholder until the cooking agent ships (see docs/AGENT_PLAN.md). */
export default function Assistant() {
  const { t } = useTranslation()
  const features = t('assistantPage.features', { returnObjects: true }) as string[]

  return (
    <Container className="py-10 md:py-14">
      <section className="grid items-center gap-10 overflow-hidden rounded-[28px] bg-brand-deep p-6 text-on-brand sm:p-8 md:p-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-on-brand/10 px-3 py-1.5 text-[13px] font-semibold text-apricot">
            <Sparkle size={16} />
            {t('assistantPage.eyebrow')}
          </p>
          <h1 className="text-4xl leading-tight font-semibold text-balance md:text-5xl">{t('assistantPage.title')}</h1>
          <p className="max-w-[52ch] text-lg leading-relaxed text-on-brand-muted">{t('assistantPage.body')}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((f, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <li key={f} className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-on-brand/10 text-apricot">
                    <Icon size={20} />
                  </span>
                  <span className="pt-2 leading-snug">{f}</span>
                </li>
              )
            })}
          </ul>
          <ButtonLink to="/planner" size="lg" variant="inverse" className="mt-2 h-auto min-h-13 py-3 text-start whitespace-normal">
            {t('assistantPage.cta')}
            <ArrowRight size={18} className="rtl:-scale-x-100" />
          </ButtonLink>
        </div>

        {/* A preview of the conversation, rendered as UI */}
        <div aria-hidden="true" className="space-y-3 rounded-[28px] border border-on-brand/15 bg-on-brand/5 p-5">
          <p className="ms-auto w-fit max-w-[88%] rounded-[22px] rounded-ee-md bg-primary px-4 py-3 text-on-primary">
            {t('assistantPage.example')}
          </p>
          <div className="w-fit max-w-[88%] space-y-2 rounded-[22px] rounded-es-md bg-surface px-4 py-3 text-ink">
            <div className="flex gap-1.5 py-1">
              <span className="size-2 animate-pulse rounded-full bg-ink-muted" />
              <span className="size-2 animate-pulse rounded-full bg-ink-muted [animation-delay:150ms]" />
              <span className="size-2 animate-pulse rounded-full bg-ink-muted [animation-delay:300ms]" />
            </div>
          </div>
          <div className="flex items-center justify-center pt-6">
            <span className="relative grid size-16 place-items-center rounded-full bg-primary text-on-primary shadow-md">
              <Microphone size={28} />
              <span className="mic-pulse absolute -inset-1.5 rounded-full border-2 border-apricot" />
            </span>
          </div>
        </div>
      </section>
    </Container>
  )
}
