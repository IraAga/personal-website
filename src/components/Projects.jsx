import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const CASE_STUDIES = [
  {
    title: 'Android Platform CI/CD for Automotive Infotainment',
    role: 'DevOps Android Platform Engineer',
    challenge:
      'Distributed engineering teams needed a reliable build and release infrastructure for Android platform integration in automotive infotainment systems. Build failures propagated silently, multi-repo manifest management was fragile, and internal releases lacked traceability across feature branches.',
    approach:
      'Developed and maintained CI/CD pipelines in Jenkins, configuring build parameters and orchestrating job execution for continuous integration. Managed version control across multiple Git repositories with manifest synchronization, performing selective upstream commit integration. Participated in Gerrit code reviews to evaluate changes for quality and integration impact before promotion.',
    outcome:
      'Stable build state maintained across distributed teams. Reliable internal release distribution with clear traceability from commit to artifact. Cross-team collaboration improved through structured code review workflows.',
    learnings:
      'Selective upstream commit integration is the key to maintaining stability while staying current — merge everything and you break the build; merge nothing and you accumulate technical debt. Cross-language and time-zone collaboration demands written, reproducible debugging handoffs.',
  },
  {
    title: 'MPLS Router OS — Production Support & Feature Dev',
    role: 'Software Engineer',
    challenge:
      'Developing and maintaining the operating system of MPLS routers handling high-throughput network traffic. Production issues required rapid diagnosis and patching without compromising stability for telecommunications customers.',
    approach:
      'Diagnosed and resolved complex production issues through systematic reproduction, root-cause analysis, and targeted patch delivery. Extended the configuration management component to validate, collect, and store hierarchical queue scheduling metrics, contributing to platform observability. Wrote clean, maintainable C code within a large-scale, performance-sensitive codebase.',
    outcome:
      'System stability maintained for telecommunications customers under high-throughput conditions. Enhanced observability through queue scheduling metrics enabled proactive performance monitoring before issues reached production.',
    learnings:
      'Root-cause analysis in systems is a forensic discipline — reproduce first, hypothesise second. Adding observability to existing C codebases pays compounding returns: every metric you surface today is a production incident you avert tomorrow.',
  },
]

function CaseStudy({ study, isOpen, onToggle }) {
  const { title, role, challenge, approach, outcome, learnings } = study
  const sections = [
    { label: 'Challenge', content: challenge },
    { label: 'Approach', content: approach },
    { label: 'Outcome', content: outcome },
    { label: 'Learnings', content: learnings },
  ]

  const contentId = title.toLowerCase().replace(/[^a-z]+/g, '-') + '-content'

  return (
    <div className="border border-zinc-800 rounded-xl">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-4 p-6 sm:p-8 text-left"
      >
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-zinc-400 mt-0.5">{role}</p>
        </div>
        <ChevronDown
          size={20}
          className={`text-zinc-500 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={contentId}
        className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`px-6 sm:px-8 pb-6 sm:pb-8 space-y-4 transition-[opacity,translate] duration-[350ms] ease-out ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {sections.map(({ label, content }) => (
              <div key={label}>
                <h4 className="text-sm font-semibold text-zinc-300 mb-1">{label}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [openIdx, setOpenIdx] = useState(-1)

  return (
    <div className="space-y-4">
      {CASE_STUDIES.map((study, i) => (
        <CaseStudy
          key={study.title}
          study={study}
          isOpen={openIdx === i}
          onToggle={() => setOpenIdx((idx) => (idx === i ? -1 : i))}
        />
      ))}
    </div>
  )
}
