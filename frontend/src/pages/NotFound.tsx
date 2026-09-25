import { CookingPot } from '@/components/ui/icons'
import { useTranslation } from 'react-i18next'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center py-20">
      <CookingPot size={44} weight="duotone" className="text-primary" />
      <h1 className="mt-6 max-w-lg text-3xl font-semibold tracking-tight md:text-4xl">{t('notFound.title')}</h1>
      <p className="mt-3 text-muted">{t('notFound.body')}</p>
      <ButtonLink to="/" variant="secondary" className="mt-8">
        {t('notFound.back')}
      </ButtonLink>
    </Container>
  )
}
