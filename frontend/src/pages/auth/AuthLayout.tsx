import { RecipeImage } from '@/components/RecipeImage'
import { Container } from '@/components/ui/Container'

export function AuthLayout({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <Container className="grid min-h-[calc(100dvh-4rem)] items-center gap-12 py-12 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-md lg:mx-0">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-3 text-muted">{body}</p>
        <div className="mt-8">{children}</div>
      </div>
      <div className="hidden overflow-hidden rounded-2xl lg:block">
        <RecipeImage src="/img/ratatouille.webp" className="aspect-[4/5] max-h-[78dvh] w-full" />
      </div>
    </Container>
  )
}
