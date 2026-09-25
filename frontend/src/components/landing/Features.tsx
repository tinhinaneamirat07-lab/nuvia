import { Basket, CheckSquare, Microphone, Square, Translate } from '@/components/ui/icons'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

function Waveform() {
  const bars = [0.35, 0.7, 1, 0.55, 0.85, 0.4, 0.75, 0.5, 0.95, 0.3]
  return (
    <div className="flex h-12 items-center gap-1.5" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="wave-bar w-1.5 rounded-full bg-inverse-accent"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 90}ms` }}
        />
      ))}
    </div>
  )
}

export function Features() {
  const { t } = useTranslation()
  const items = t('features.shopping.items', { returnObjects: true }) as string[]

  return (
    <section id="features" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {t('features.title')}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {/* Planner: large image cell */}
          <Reveal className="lg:col-span-4 lg:row-span-2">
            <article className="relative flex h-full min-h-[420px] overflow-hidden rounded-2xl">
              <img
                src="/img/ratatouille.webp"
                alt={t('features.planner.imageAlt')}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1510]/85 via-[#0b1510]/25 to-transparent" />
              <div className="relative mt-auto max-w-md p-6 text-[#eef3ef] md:p-8">
                <h3 className="text-2xl font-semibold tracking-tight">{t('features.planner.title')}</h3>
                <p className="mt-2 leading-relaxed text-[#eef3ef]/85">{t('features.planner.body')}</p>
              </div>
            </article>
          </Reveal>

          {/* Shopping list: tinted cell with a real checklist */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <article className="h-full rounded-2xl bg-primary-soft p-6">
              <Basket size={26} weight="duotone" className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{t('features.shopping.title')}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t('features.shopping.body')}</p>
              <ul className="mt-5 space-y-2.5">
                {items.map((item, i) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    {i < 2 ? (
                      <CheckSquare size={18} weight="fill" className="text-primary" />
                    ) : (
                      <Square size={18} weight="bold" className="text-muted" />
                    )}
                    <span className={i < 2 ? 'text-muted line-through' : ''}>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Voice: inverse cell */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <article className="flex h-full flex-col rounded-2xl bg-inverse p-6 text-inverse-fg">
              <div className="flex items-center justify-between">
                <Microphone size={26} weight="duotone" className="text-inverse-accent" />
                <Waveform />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{t('features.voice.title')}</h3>
              <p className="mt-1 text-sm leading-relaxed text-inverse-fg/75">{t('features.voice.body')}</p>
            </article>
          </Reveal>

          {/* Pantry: image + text */}
          <Reveal className="lg:col-span-3">
            <article className="grid h-full overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-2">
              <div className="relative h-48 sm:h-auto">
                <img
                  src="/img/garden-salad.webp"
                  alt={t('features.pantry.imageAlt')}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{t('features.pantry.title')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t('features.pantry.body')}</p>
              </div>
            </article>
          </Reveal>

          {/* Languages */}
          <Reveal delay={0.05} className="lg:col-span-3">
            <article className="flex h-full flex-col justify-between gap-8 rounded-2xl bg-saffron-soft p-6">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-3xl font-semibold tracking-tight md:text-4xl">
                <span lang="fr">Bonjour</span>
                <span lang="en" className="text-muted">
                  Hello
                </span>
                <span lang="ar" dir="rtl" className="font-[family-name:var(--font-arabic)] text-primary">
                  مرحبا
                </span>
              </div>
              <div className="flex gap-3">
                <Translate size={22} weight="duotone" className="mt-0.5 shrink-0 text-amber" />
                <div>
                  <h3 className="font-semibold">{t('features.languages.title')}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text/70">{t('features.languages.body')}</p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
