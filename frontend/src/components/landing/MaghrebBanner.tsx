import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function MaghrebBanner() {
  const { t } = useTranslation()
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <Reveal>
          <div className="relative flex min-h-[420px] overflow-hidden rounded-2xl">
            <img
              src="/img/breads.webp"
              alt={t('maghreb.imageAlt')}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1510]/90 via-[#0b1510]/40 to-[#0b1510]/10 md:bg-gradient-to-r md:rtl:bg-gradient-to-l" />
            <div className="relative mt-auto max-w-lg p-6 text-[#eef3ef] md:my-auto md:p-12">
              <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{t('maghreb.title')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#eef3ef]/85">{t('maghreb.body')}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
