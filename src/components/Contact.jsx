import { Github, Linkedin, Mail } from 'lucide-react'

const LINKS = [
  {
    href: 'mailto:iagathis@outlook.com',
    label: 'iagathis@outlook.com',
    Icon: Mail,
  },
  {
    href: 'https://github.com/IraAga',
    label: 'github.com/IraAga',
    Icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/iraklis-agathis-920655160/',
    label: 'linkedin.com/in/iraklis-agathis',
    Icon: Linkedin,
  },
]

export default function Contact() {
  return (
    <div>
      <p className="text-zinc-400 mb-6 max-w-xl leading-relaxed">
        I work on <strong>embedded Linux systems</strong>,{' '}
        <strong>CI/CD automation</strong>, and <strong>infrastructure
        tooling</strong>. If you have an opening or a project where these
        might fit — or just want to talk shop — drop me a line.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {LINKS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
