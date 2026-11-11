import { LinkButton } from "@/registry/default/link-button/link-button";
import { NexoraButton } from "@/registry/default/nexora-button/nexora-button";

export default function Home() {
  return (
    <main className="container mx-auto space-y-10 p-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Nexora UI</h1>
        <p className="text-muted-foreground">
          Reusable components built with shadcn/ui.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Variants</h2>

        <div className="flex flex-wrap gap-3">
          <NexoraButton>Default</NexoraButton>
          <NexoraButton variant="secondary">Secondary</NexoraButton>
          <NexoraButton variant="destructive">Destructive</NexoraButton>
          <NexoraButton variant="outline">Outline</NexoraButton>
          <NexoraButton variant="ghost">Ghost</NexoraButton>
          <NexoraButton variant="link">Link</NexoraButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Sizes</h2>

        <div className="flex flex-wrap items-center gap-3">
          <NexoraButton size="sm">Small</NexoraButton>
          <NexoraButton size="default">Default</NexoraButton>
          <NexoraButton size="lg">Large</NexoraButton>
        </div>
      </section>
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">LinkButton Playground</h1>
        <p className="text-muted-foreground">
          Test LinkButton variants and sizes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>

        <div className="flex flex-wrap gap-3">
          <LinkButton href="/" variant="default">
            Default
          </LinkButton>

          <LinkButton href="/" variant="secondary">
            Secondary
          </LinkButton>

          <LinkButton href="/" variant="destructive">
            Destructive
          </LinkButton>

          <LinkButton href="/" variant="outline">
            Outline
          </LinkButton>

          <LinkButton href="/" variant="ghost">
            Ghost
          </LinkButton>

          <LinkButton href="/" variant="link">
            Link
          </LinkButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>

        <div className="flex flex-wrap items-center gap-3">
          <LinkButton href="/" size="sm">
            Small
          </LinkButton>

          <LinkButton href="/" size="default">
            Default
          </LinkButton>

          <LinkButton href="/" size="lg">
            Large
          </LinkButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Link properties</h2>

        <div className="flex flex-wrap gap-3">
          <LinkButton href="/dashboard" prefetch={false}>
            Dashboard
          </LinkButton>

          <LinkButton
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
          >
            External Website
          </LinkButton>
        </div>
      </section>
    </main>
  );
}
