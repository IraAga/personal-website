import { GraduationCap, Award, FileText } from 'lucide-react'

const DEGREES = [
  {
    title: 'MSc in Next Generation Communication Networks and Distributed Application Environments',
    institution: 'University of West Attica',
    period: 'Starting Oct 5, 2026',
  },
  {
    title: 'BSc in Computer Science',
    institution: 'University of Crete',
    period: 'Sep 2013 – Jul 2021',
    thesis: `${import.meta.env.BASE_URL}thesis.pdf`,
  },
]

const AWARDS = [
  {
    title: 'Undergraduate Scholarship',
    institution: 'FORTH-ICS',
    period: 'Mar 2020 – Aug 2021',
  },
]

export default function Education() {
  return (
    <div className="space-y-8">
      {DEGREES.map(({ title, institution, period, thesis }) => (
        <div key={title}>
          <div className="flex items-start gap-4">
            <GraduationCap size={20} className="text-zinc-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-zinc-200">{title}</h3>
              <p className="text-sm text-zinc-400">{institution}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{period}</p>
              {thesis && (
                <a
                  href={thesis}
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText size={12} />
                  View thesis
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      {AWARDS.map(({ title, institution, period }) => (
        <div key={title}>
          <div className="flex items-start gap-4">
            <Award size={20} className="text-zinc-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-zinc-200">{title}</h3>
              <p className="text-sm text-zinc-400">{institution}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{period}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
