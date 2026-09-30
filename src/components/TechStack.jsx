import {
  Code2,
  Terminal,
  GitBranch,
  Container,
  Cpu,
  Globe,
  Server,
  Cog,
} from 'lucide-react'

const TOOLS = [
  { name: 'C', Icon: Code2, level: 'daily' },
  { name: 'Python', Icon: Code2, level: 'daily' },
  { name: 'Bash', Icon: Terminal, level: 'daily' },
  { name: 'Jenkins', Icon: Cog, level: 'daily' },
  { name: 'Git', Icon: GitBranch, level: 'daily' },
  { name: 'Docker', Icon: Container, level: 'daily' },
  { name: 'Yocto', Icon: Cpu, level: 'daily' },
  { name: 'Linux', Icon: Server, level: 'daily' },
  { name: 'Gerrit', Icon: GitBranch, level: 'daily' },
  { name: 'Jira', Icon: Globe, level: 'daily' },
  { name: 'GDB', Icon: Terminal, level: 'daily' },
  { name: 'Wireshark', Icon: Globe, level: 'daily' },
]

const LEVEL_STYLES = {
  daily: 'bg-emerald-950 text-emerald-300',
}

export default function TechStack() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {TOOLS.map(({ name, Icon, level }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:shadow-sm transition-shadow"
        >
          <Icon size={28} className="text-zinc-500" />
          <span className="text-sm font-medium text-zinc-200">{name}</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${LEVEL_STYLES[level]}`}
          >
            {level}
          </span>
        </div>
      ))}
    </div>
  )
}
