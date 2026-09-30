const TOPICS = [
  'OpenCode and Claude Code for AI-assisted development workflows',
  'Platform engineering for Android automotive infotainment at scale',
  'Developing my expertise in modern Cloud Technologies (Azure)',
  'Kubernetes and Docker — container orchestration for platform tooling',
]

export default function Now() {
  return (
    <div>
      <p className="text-zinc-400 mb-4">
        What I&apos;m currently learning and exploring:
      </p>
      <ul className="space-y-2">
        {TOPICS.map((topic) => (
          <li key={topic} className="flex items-start gap-3 text-sm text-zinc-400">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
            {topic}
          </li>
        ))}
      </ul>
    </div>
  )
}
