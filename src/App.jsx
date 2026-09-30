import {
  GraduationCap,
  Briefcase,
  Wrench,
  BookOpen,
  Send,
} from 'lucide-react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Education from './components/Education'
import TechStack from './components/TechStack'
import Now from './components/Now'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TableOfContents from './components/TableOfContents'
import HomePage from './pages/HomePage'
import SectionPage from './pages/SectionPage'
// Side project (bt-traffic-gen) hidden for now — re-enable with:
// import ToolHighlight from './components/ToolHighlight'

const SECTIONS = [
  {
    id: 'experience',
    label: 'Experience',
    title: 'Experience',
    href: '/experience',
    number: '01',
    icon: Briefcase,
    Content: Projects,
    description: 'DevOps and software engineering case studies.',
  },
  {
    id: 'education',
    label: 'Education',
    title: 'Education',
    href: '/education',
    number: '02',
    icon: GraduationCap,
    Content: Education,
    description: 'Degrees and academic awards.',
  },
  {
    id: 'tooling',
    label: 'Tooling',
    title: 'Tooling',
    href: '/tooling',
    number: '03',
    icon: Wrench,
    Content: TechStack,
    description: 'Languages, pipelines and platforms I work in.',
  },
  {
    id: 'learning',
    label: 'Learning',
    title: 'Learning',
    href: '/learning',
    number: '04',
    icon: BookOpen,
    Content: Now,
    description: 'What I am currently exploring.',
  },
  // Side project (bt-traffic-gen) hidden for now — re-enable with:
  // { id: 'tool-highlight', label: 'Side Project', title: 'Side Project', href: '/side-project', number: '05', icon: Code2, Content: ToolHighlight, description: '...' },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Contact',
    href: '/contact',
    number: '06',
    icon: Send,
    Content: Contact,
    description: 'Embedded Linux, CI/CD automation and infrastructure tooling — get in touch.',
  },
]

function Shell() {
  const location = useLocation()
  const activeId = SECTIONS.find((s) => s.href === location.pathname)?.id

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <TableOfContents
        items={SECTIONS.map(({ id, label, href }) => ({ id, label, href }))}
        activeId={activeId}
      />
      <Routes>
        <Route path="/" element={<HomePage sections={SECTIONS} />} />
        <Route
          path="/:sectionId"
          element={
            <SectionPageResolver />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

function SectionPageResolver() {
  const { sectionId } = useParams()
  const section = SECTIONS.find((s) => s.id === sectionId)
  return section ? <SectionPage section={section} /> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
