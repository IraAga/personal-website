import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/*
 * Shared chrome for every page: sticky numbered TOC nav + a thin scroll
 * progress hairline. Active chapter derives from the current route.
 */
export default function TableOfContents({ items, activeId }) {
  const barRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const bar = barRef.current
      const offset = Math.max((bar?.getBoundingClientRect().top ?? 0) + window.scrollY, 1)
      const pct = ((window.scrollY - offset) / Math.max(max - offset, 1)) * 100
      setProgress(Number.isFinite(pct) ? Math.round(Math.min(100, Math.max(0, pct))) : 0)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <nav
      ref={barRef}
      aria-label="Table of contents"
      className="sticky top-0 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800"
    >
      <div className="flex gap-x-6 overflow-x-auto scroll-thin whitespace-nowrap items-baseline">
        <Link
          to="/"
          aria-current={activeId ? undefined : 'page'}
          className={`flex items-baseline gap-1.5 py-2.5 text-sm border-b-2 -mb-px transition-colors ${
            !activeId
              ? 'border-zinc-100 text-zinc-100 font-semibold'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <span className="font-mono text-[11px] tracking-wider text-zinc-400">§</span>
          Home
        </Link>
        {items.map(({ id, label, href }, i) => (
          <Link
            key={id}
            to={href}
            aria-current={activeId === id ? 'page' : undefined}
            className={`flex items-baseline gap-1.5 py-2.5 text-sm border-b-2 -mb-px transition-colors ${
              activeId === id
                ? 'border-zinc-100 text-zinc-100 font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span
              className={`font-mono text-[11px] tracking-wider ${
                activeId === id ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            {label}
          </Link>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="h-0.5 bg-zinc-100 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </nav>
  )
}
