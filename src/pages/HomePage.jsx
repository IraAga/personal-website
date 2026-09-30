import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'

export default function HomePage({ sections }) {
  useEffect(() => {
    document.title = 'Iraklis Agathis – DevOps / Platform Engineer'
  }, [])

  return (
    <>
      <Hero />
      <div className="page-fade">
        <p className="text-zinc-400 max-w-2xl leading-relaxed mb-10">
          {/* short index copy */}
          Select a chapter to read it separately, or start from where we left
          off — experience, education, tooling, learning and contact each have
          their own page.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map(({ id, label, href, description, icon: Icon }, i) => (
            <Link
              key={id}
              to={href}
              className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:shadow-sm transition-shadow"
            >
              <span className="font-mono text-[11px] text-zinc-600 mt-1 tracking-wider">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <Icon size={16} className="text-zinc-400 shrink-0" />
                  <span className="font-semibold text-zinc-100">{label}</span>
                </span>
                <span className="block text-sm text-zinc-400 mt-1 leading-relaxed">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
