import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import type { Aisle, ShoppingItem } from '@/api/types'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Basket, Check, Plus, Warning, X } from '@/components/ui/icons'
import { StateMessage } from '@/components/ui/StateMessage'
import { useMe } from '@/features/auth/queries'
import {
  useAddShoppingItem,
  useClearChecked,
  useDeleteShoppingItem,
  useShoppingList,
  useToggleShoppingItem,
} from '@/features/planner/queries'
import { useLang } from '@/hooks/useLocalized'
import { formatAmount } from '@/lib/amount'
import { cn } from '@/lib/cn'
import { langOf, pick } from '@/lib/localize'

const AISLES: Aisle[] = ['produce', 'meat', 'dairy', 'bakery', 'pantry', 'spices', 'drinks', 'other']

function Row({ item }: { item: ShoppingItem }) {
  const { t, i18n } = useTranslation()
  const lang = useLang()
  const toggle = useToggleShoppingItem()
  const remove = useDeleteShoppingItem()
  const name = item.name.custom ?? pick(item.name, lang)
  const amount = formatAmount(item.quantity, item.unit, t, i18n.language)

  return (
    <li className="group flex items-center gap-2">
      <label className="flex min-h-12 flex-1 cursor-pointer items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-2">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => toggle.mutate({ id: item.id, checked: !item.checked })}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            'grid size-6 shrink-0 place-items-center rounded-lg border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary',
            item.checked ? 'border-primary bg-primary text-primary-fg' : 'border-border',
          )}
        >
          {item.checked && <Check size={14} weight="bold" />}
        </span>
        <span className={cn('flex-1', item.checked && 'text-muted line-through')}>
          <span lang={item.name.custom ? undefined : langOf(item.name, lang)}>{name}</span>
          {amount && <span className="ms-2 text-sm text-muted tabular-nums">{amount}</span>}
        </span>
      </label>
      <button
        type="button"
        onClick={() => remove.mutate(item.id)}
        aria-label={t('shopping.remove', { name })}
        className="grid size-9 shrink-0 place-items-center rounded-full text-muted opacity-100 hover:bg-surface-2 hover:text-text md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
      >
        <X size={16} weight="bold" />
      </button>
    </li>
  )
}

export default function Shopping() {
  const { t } = useTranslation()
  const me = useMe()
  const list = useShoppingList(Boolean(me.data))
  const add = useAddShoppingItem()
  const clear = useClearChecked()
  const [name, setName] = useState('')

  const groups = useMemo(() => {
    const byAisle = new Map<Aisle, ShoppingItem[]>()
    for (const item of list.data ?? []) byAisle.set(item.aisle, [...(byAisle.get(item.aisle) ?? []), item])
    return AISLES.filter((a) => byAisle.has(a)).map((a) => ({ aisle: a, items: byAisle.get(a)! }))
  }, [list.data])

  if (me.isSuccess && !me.data) return <Navigate to="/login?next=%2Fshopping" replace />

  const items = list.data ?? []
  const remaining = items.filter((i) => !i.checked).length
  const checkedCount = items.length - remaining

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = name.trim()
    if (!value) return
    add.mutate(value, { onSuccess: () => setName('') })
  }

  return (
    <Container className="max-w-3xl py-10 md:py-14">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('shopping.title')}</h1>
      {list.isSuccess && items.length > 0 && (
        <p className="mt-2 text-muted" aria-live="polite">
          {t('shopping.remaining', { count: remaining })}
        </p>
      )}

      <form onSubmit={submit} className="mt-8 flex gap-2">
        <label htmlFor="new-item" className="sr-only">
          {t('shopping.addLabel')}
        </label>
        <input
          id="new-item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={120}
          placeholder={t('shopping.addPlaceholder')}
          className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none focus-visible:outline-none"
        />
        <Button type="submit" size="lg" disabled={!name.trim() || add.isPending}>
          <Plus size={18} weight="bold" />
          {t('shopping.add')}
        </Button>
      </form>

      <div className="mt-8">
        {list.isPending ? (
          <div className="space-y-3" aria-busy="true">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-surface-2" />
            ))}
          </div>
        ) : list.isError ? (
          <StateMessage icon={<Warning size={24} weight="bold" />} title={t('explore.errorTitle')} body={t('explore.errorBody')} />
        ) : items.length === 0 ? (
          <StateMessage
            icon={<Basket size={24} weight="duotone" />}
            title={t('shopping.emptyTitle')}
            body={t('shopping.emptyBody')}
            action={<ButtonLink to="/planner">{t('shopping.toPlanner')}</ButtonLink>}
          />
        ) : (
          <div className="space-y-8">
            {groups.map(({ aisle, items: rows }) => (
              <section key={aisle} aria-labelledby={`aisle-${aisle}`}>
                <h2 id={`aisle-${aisle}`} className="mb-2 flex items-baseline justify-between border-b border-border pb-2">
                  <span className="font-semibold">{t(`aisles.${aisle}`)}</span>
                  <span className="text-sm text-muted tabular-nums">{rows.filter((r) => !r.checked).length}</span>
                </h2>
                <ul className="space-y-0.5">
                  {rows.map((item) => (
                    <Row key={item.id} item={item} />
                  ))}
                </ul>
              </section>
            ))}
            {checkedCount > 0 && (
              <Button variant="secondary" onClick={() => clear.mutate()} disabled={clear.isPending}>
                {t('shopping.clearChecked')}
              </Button>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
