import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const OPEN_DELAY = 200
const CLOSE_DELAY = 300

/*
 * Scroll variant — sections open themselves as the reader scrolls past
 * (checked against the reveal line in the lower part of the viewport,
 * while scrolling down). The page toggles the accordion state; content
 * fades + rises in as each section expands.
 */
function ScrollSection({
  id,
  isOpen,
  onReveal,
  onActive,
  onOpen,
  onClose,
  children,
  getScrollDir,
  ...headerProps
}) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  // Collapsed content must not be keyboard-reachable: a link inside a faded,
  // clipped section would still tab. (React 18 lacks an `inert` prop.)
  useEffect(() => {
    const el = contentRef.current
    if (el) el.inert = !isOpenRef.current
  }, [isOpen])
  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          // Only reveal when crossing the line while scrolling down;
          // moving up across it must not force-open collapsed sections.
          if (getScrollDir() && entry.boundingClientRect.top > 0) {
            onReveal()
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    )
    observer.observe(header)
    return () => observer.disconnect()
  }, [onReveal, getScrollDir])

  // Active tracking: the header sitting in the middle band defines which
  // TOC entry is highlighted.
  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onActive(id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    observer.observe(header)
    return () => observer.disconnect()
  }, [id, onActive])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="scroll-mt-14 border-t border-zinc-800"
    >
      <div ref={headerRef}>
        <HeaderButton
          {...headerProps}
          isOpen={isOpen}
          onToggle={() => (isOpen ? onClose() : onOpen())}
        />
      </div>
      <div
        id={`${id}-content`}
        className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            ref={contentRef}
            className={`pb-8 transition-[opacity,translate] duration-[350ms] ease-out ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function HeaderButton({ id, title, Icon, isOpen, onToggle, titleRight }) {
  return (
    <button
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && isOpen) {
          e.stopPropagation()
          onToggle(false)
        }
      }}
      aria-expanded={isOpen}
      aria-controls={`${id}-content`}
      className="flex w-full items-center justify-between py-6 text-left"
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={22} className="text-zinc-500 shrink-0" />}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        {titleRight}
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
    </button>
  )
}

/*
 * Hover variant — page controls the accordion via isOpen/onOpen/onClose so
 * only one section is open at a time. The whole <section> (header + body)
 * is the hover zone.
 */
function HoverSection({ isOpen, onOpen, onClose, id, children, ...headerProps }) {
  const timerRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  /*
   * Anchor stabilization: while open/close transitions shift the layout,
   * continuously correct page scroll so THIS section's header stays at its
   * current viewport position — the cursor zone never slips away mid-gesture.
   * (Replaces the previous scrollIntoView, which only scrolled when the
   * element was fully off-screen.)
   */
  useLayoutEffect(() => {
    if (!isOpen) return
    const el = sectionRef.current
    if (!el) return
    const startY = el.getBoundingClientRect().top
    const t0 = performance.now()
    let raf
    const stabilize = () => {
      const delta = el.getBoundingClientRect().top - startY
      if (Math.abs(delta) > 0.5) {
        // 'instant' — html has scroll-behavior:smooth; per-frame corrections must not queue smooth scrolls
        window.scrollBy({ top: delta, behavior: 'instant' })
      }
      if (performance.now() - t0 < 450) {
        raf = requestAnimationFrame(stabilize)
      }
    }
    raf = requestAnimationFrame(stabilize)
    return () => cancelAnimationFrame(raf)
  }, [isOpen])

  const clearTimer = () => {
    clearTimeout(timerRef.current)
    timerRef.current = null
  }

  const handleMouseEnter = () => {
    clearTimer()
    if (!isOpen) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        onOpen()
      }, OPEN_DELAY)
    }
  }

  const handleMouseLeave = () => {
    clearTimer()
    if (isOpen) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        onClose()
      }, CLOSE_DELAY)
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border-t border-zinc-800"
    >
      <HeaderButton
        {...headerProps}
        isOpen={isOpen}
        onToggle={() => (isOpen ? onClose() : onOpen())}
      />
      <div
        id={`${id}-content`}
        className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`pb-8 transition-[opacity,translate] duration-[350ms] ease-out ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* Long content scrolls internally so the header stays put
                while reading — the panel never grows past ~70% viewport. */}
            <div className="max-h-[70vh] overflow-y-scroll scroll-thin">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/*
 * Click variant — the previous rollback behavior: click toggles, height
 * animated via measured max-height with a ResizeObserver keeping it accurate.
 */
function ClickSection({ defaultOpen = false, ...headerProps }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)
  const id = headerProps.id

  const toggle = (next) => setIsOpen(typeof next === 'boolean' ? next : !isOpen)

  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return

    const measure = () => setHeight(el.scrollHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="border-t border-zinc-800">
      <HeaderButton {...headerProps} isOpen={isOpen} onToggle={toggle} />
      <div
        id={`${id}-content`}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? height : 0 }}
      >
        <div ref={contentRef} className="pb-8">
          {children}
        </div>
      </div>
    </section>
  )
}

export default function CollapsibleSection({
  variant = 'scroll',
  /* scroll props */
  isOpen,
  onReveal,
  onActive,
  onOpen,
  onClose,
  getScrollDir,
  /* hover props */
  // (hover reuses isOpen/onOpen/onClose)
  /* click props */
  defaultOpen,
  /* shared */
  ...rest
}) {
  if (variant === 'click') {
    return <ClickSection defaultOpen={defaultOpen} {...rest} />
  }
  if (variant === 'hover') {
    return <HoverSection isOpen={isOpen} onOpen={onOpen} onClose={onClose} {...rest} />
  }
  return (
    <ScrollSection
      id={rest.id}
      isOpen={isOpen}
      onReveal={onReveal}
      onActive={onActive}
      onOpen={onOpen}
      onClose={onClose}
      getScrollDir={getScrollDir}
    >
      {rest.children}
    </ScrollSection>
  )
}
