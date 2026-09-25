import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const { t } = useTranslation()
  const groups = [
    {
      title: t('footer.product'),
      links: [
        { to: '/explore', label: t('nav.explore') },
        { to: '/planner', label: t('nav.planner') },
        { to: '/assistant', label: t('nav.assistant') },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { to: '/about', label: t('footer.about') },
        { to: '/privacy', label: t('footer.privacy') },
        { to: '/terms', label: t('footer.terms') },
      ],
    },
  ]

  return (
    <footer className="border-t border-border">
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-xs space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed text-muted">{t('footer.tagline')}</p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-semibold">{g.title}</h3>
            <ul className="mt-4 space-y-3">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted transition-colors hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="border-t border-border py-6">
        <p className="text-xs text-muted">{t('footer.rights')}</p>
      </Container>
    </footer>
  )
}
