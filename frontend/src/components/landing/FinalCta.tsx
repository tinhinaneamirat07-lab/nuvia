import { ArrowRight } from '@/components/ui/icons'
import { useTranslation } from 'react-i18next'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function FinalCta() {
  const { t } = useTranslation()
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-saffron-soft p-8 md:flex-row md:items-end md:p-12">
            <div>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance md:text-5xl">
                {t('cta.title')}
              </h2>
              <p className="mt-3 text-text/70">{t('cta.body')}</p>
            </div>
            <ButtonLink to="/register" size="lg">
              {t('nav.start')}
              <ArrowRight size={18} weight="bold" className="rtl:-scale-x-100" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
