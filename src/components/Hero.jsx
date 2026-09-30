import { Github, Linkedin, Mail, FileText } from 'lucide-react'

const SOCIAL_LINKS = [
  { href: 'https://github.com/IraAga', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/iraklis-agathis-920655160/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:iagathis@outlook.com', label: 'Email', Icon: Mail },
]

export default function Hero() {
  return (
    <header id="hero" className="py-20 sm:py-28">
      <div className="space-y-6">
        <div className="flex items-start gap-6">
          <img
            src={`${import.meta.env.BASE_URL}cv-image.jpeg`}
            alt="Iraklis Agathis"
            className="h-24 w-24 rounded-full object-cover border border-zinc-800 shrink-0"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Iraklis Agathis
            </h1>
            <p className="mt-2 text-xl text-zinc-400">
              DevOps / Platform Engineer
            </p>
          </div>
        </div>

        <p className="max-w-2xl text-zinc-400 leading-relaxed">
          Software Engineer with 3+ years building reliable systems in
          telecommunications and automotive platforms — environments where
          downtime isn&apos;t an option. Strengths in debugging complex
          production issues, CI/CD pipeline management (Jenkins, Git, Docker),
          and Linux engineering. Curious, improvement-driven, and fluent in
          AI-assisted development workflows.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={18} />
              {label}
            </a>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}cv.pdf`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <FileText size={16} />
            View CV
          </a>
        </div>
      </div>
    </header>
  )
}
