import { useEffect } from 'react'

/*
 * Generic standalone page for one chapter: mono chapter number, big title,
 * then the section's content laid out plainly (no accordion machinery —
 * everything is just visible on its own page).
 */
export default function SectionPage({ section }) {
  const { label, title, Content } = section

  useEffect(() => {
    document.title = `${title ?? label} – Iraklis Agathis`
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [section])

  return (
    <article className="page-fade">
      <header className="py-12 sm:py-16">
        <p className="font-mono text-sm text-zinc-400 mb-3">§ {section.number}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title ?? label}</h1>
        {section.description && (
          <p className="mt-3 text-lg text-zinc-400">{section.description}</p>
        )}
      </header>
      <div className="border-t border-zinc-800 py-10 sm:py-12">
        <Content />
      </div>
    </article>
  )
}
