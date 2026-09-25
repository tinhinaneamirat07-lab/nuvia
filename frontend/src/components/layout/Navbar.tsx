import { List, X } from '@/components/ui/icons'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { to: '/explore', key: 'nav.explore' },
  { to: '/planner', key: 'nav.planner' },
  { to: '/assistant', key: 'nav.assistant' },
]

export function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/95">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-text' : 'text-muted hover:text-text',
                  )
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitch />
          <ThemeToggle />
          <ButtonLink to="/login" variant="ghost" size="sm">
            {t('nav.login')}
          </ButtonLink>
          <ButtonLink to="/register" size="sm">
            {t('nav.start')}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-full hover:bg-surface-2"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium hover:bg-surface-2"
                >
                  {t(l.key)}
                </NavLink>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3">
                <LanguageSwitch />
                <div className="flex gap-2">
                  <ButtonLink to="/login" variant="secondary" size="sm" onClick={() => setOpen(false)}>
                    {t('nav.login')}
                  </ButtonLink>
                  <ButtonLink to="/register" size="sm" onClick={() => setOpen(false)}>
                    {t('nav.start')}
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
