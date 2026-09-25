import { Microphone } from '@/components/ui/icons'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

type Message = { from: 'user' | 'bot'; text: string }

export function AssistantShowcase() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const chat = t('assistant.chat', { returnObjects: true }) as Message[]

  return (
    <section id="assistant" className="bg-inverse py-20 text-inverse-fg md:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{t('assistant.title')}</h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-inverse-fg/75">{t('assistant.body')}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* Live chat component, rendered with real UI rather than a screenshot */}
          <div className="rounded-2xl border border-white/10 bg-[#0b1510]/40 p-4 sm:p-6 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-inverse-accent text-sm font-semibold text-[#0b1510]">
                  N
                </span>
                <span className="font-semibold">{t('assistant.name')}</span>
              </div>
              <span className="flex items-center gap-2 text-sm text-inverse-fg/70">
                <span className="relative grid size-7 place-items-center rounded-full bg-inverse-accent/20">
                  <Microphone size={15} weight="fill" className="text-inverse-accent" />
                  <span className="mic-pulse absolute inset-0 rounded-full border border-inverse-accent" />
                </span>
                {t('assistant.listening')}
              </span>
            </div>

            <ul className="mt-5 space-y-3" aria-label={t('assistant.name')}>
              {chat.map((m, i) => (
                <motion.li
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: i * 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <p
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed',
                      m.from === 'user'
                        ? 'rounded-ee-md bg-saffron text-saffron-fg'
                        : 'rounded-es-md bg-white/8 text-inverse-fg',
                    )}
                  >
                    {m.text}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="relative h-72 overflow-hidden rounded-2xl lg:col-span-5 lg:h-auto">
            <img
              src="/img/grilled-steak.webp"
              alt={t('assistant.imageAlt')}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
