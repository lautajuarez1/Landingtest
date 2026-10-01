"use client"

import { Building2, ChevronLeft, ChevronRight, IceCreamCone } from "lucide-react"
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { CASES, PILLARS, WHATSAPP_URL, type CaseStudy } from "@/lib/content"
import { cn } from "@/lib/utils"

function CaseCover({ item }: { item: CaseStudy }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (item.images.length < 2) return
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % item.images.length),
      3000
    )
    return () => window.clearInterval(timer)
  }, [item.images.length])
  const image = item.images[active]
  if (!image) {
    const Icon =
      item.id === "heladeria"
        ? IceCreamCone
        : item.id === "farmacias-3d"
        ? Building2
        : Building2
    return (
      <div className="flex h-full min-h-0 flex-col justify-end bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:16px_16px] bg-graphite p-6">
        <Icon className="mb-auto size-16 text-orange/90" strokeWidth={1} aria-hidden="true" />
        <p className="font-display text-2xl text-white">{item.shortTitle}</p>
      </div>
    )
  }
  return (
    <div
      role="img"
      aria-label={image.alt}
      className={`relative h-full min-h-0 shrink-0 bg-white bg-center ${
        image.kind === "photo" ? "bg-cover" : "bg-contain bg-no-repeat"
      }`}
      style={{ backgroundImage: `url("${image.src}")` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
    </div>
  )
}

function CaseCard({ item }: { item: CaseStudy }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const message = encodeURIComponent(`Hola, vi el caso "${item.shortTitle}" y quiero algo parecido.`)

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    // Hover Intent: 130ms delay prevents accidental expansion when scrolling past
    hoverTimerRef.current = setTimeout(() => {
      setHovered(true)
    }, 130)
  }

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    setHovered(false)
    if (cardRef.current) {
      cardRef.current.scrollTo({ top: 0, behavior: "smooth" })
      if (cardRef.current.contains(document.activeElement)) {
        (document.activeElement as HTMLElement)?.blur?.()
      }
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setHovered(false)
      if (cardRef.current) {
        cardRef.current.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [])

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      aria-labelledby={`${item.id}-title`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setHovered(true)}
      onBlur={handleBlur}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest("a, button")) {
          if (document.activeElement && cardRef.current?.contains(document.activeElement)) {
            (document.activeElement as HTMLElement).blur()
          }
        }
      }}
      className={`case-card group relative flex shrink-0 flex-col rounded-2xl border border-white/10 bg-graphite text-white outline-none transition-[width,opacity,transform] duration-500 ease-out hover:-translate-y-2 focus-within:z-10 focus-visible:ring-2 focus-visible:ring-orange ${
        hovered ? "case-card-expanded" : ""
      }`}
    >
      <div className="case-cover relative shrink-0">
        <CaseCover item={item} />
      </div>
      <div className="case-summary min-h-[9.5rem] shrink-0 p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {item.areas.map((area) => (
            <span
              key={area}
              className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/75"
            >
              {PILLARS.find((pillar) => pillar.id === area)?.name.split(" ")[0]}
            </span>
          ))}
        </div>
        <h3 id={`${item.id}-title`} className="font-display text-xl leading-tight">
          {item.shortTitle}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">
          {item.project}
        </p>
      </div>
      <div className="case-detail min-h-0 flex-1 bg-graphite p-5">
        <div className="pt-4">
          <h3 className="font-display text-lg">{item.title}</h3>
          <p className="mt-3 text-sm font-semibold text-white">Lo que hicimos:</p>
          <ul className="mt-1 space-y-1 text-sm text-white/75">
            {item.work.map((entry) => (
              <li key={entry} className="flex gap-2">
                <span className="text-orange">•</span>
                <span>{entry}</span>
              </li>
            ))}
          </ul>
          <a
            href={`${WHATSAPP_URL.split("?text=")[0]}?text=${message}`}
            onClick={(event) => event.stopPropagation()}
            className="mt-4 inline-block text-sm font-semibold text-orange hover:underline"
          >
            Quiero algo así →
          </a>
        </div>
      </div>
    </article>
  )
}

function MobileCaseCard({ item }: { item: CaseStudy }) {
  const message = encodeURIComponent(`Hola, vi el caso "${item.shortTitle}" y quiero algo parecido.`)
  return (
    <article className="flex w-[82vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/10 bg-graphite text-white shadow-xl">
      <div className="relative h-48 w-full shrink-0">
        <CaseCover item={item} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {item.areas.map((area) => (
            <span
              key={area}
              className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/80"
            >
              {PILLARS.find((p) => p.id === area)?.name.split(" ")[0]}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-semibold leading-snug">
          {item.shortTitle}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-white/70 line-clamp-2">
          {item.project}
        </p>

        <div className="mt-3 border-t border-white/10 pt-3">
          <p className="text-xs font-semibold text-white/90">Lo que hicimos:</p>
          <ul className="mt-1 space-y-1 text-xs text-white/75">
            {item.work.slice(0, 3).map((entry) => (
              <li key={entry} className="flex gap-2">
                <span className="text-orange">•</span>
                <span className="line-clamp-1">{entry}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={`${WHATSAPP_URL.split("?text=")[0]}?text=${message}`}
          className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-orange py-2.5 text-xs font-semibold text-white shadow transition hover:bg-orange/90 active:scale-95"
        >
          <span>Quiero algo así</span>
          <ChevronRight className="size-3.5" />
        </a>
      </div>
    </article>
  )
}

function MobileServices() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 300
    const idx = Math.round(el.scrollLeft / cardWidth)
    setActiveIndex(Math.min(CASES.length - 1, Math.max(0, idx)))
  }

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 300
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" })
    setActiveIndex(idx)
  }

  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {/* Native horizontal snap slider with peek */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CASES.map((item) => (
          <MobileCaseCard key={item.id} item={item} />
        ))}
      </div>

      {/* Navigation cues: Dots & Slide counter */}
      <div className="flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-1.5">
          {CASES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Ir al caso ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === activeIndex ? "w-5 bg-orange" : "w-1.5 bg-navy/20"
              )}
            />
          ))}
        </div>
        <span className="text-[11px] font-medium text-navy/60">
          ({activeIndex + 1}/{CASES.length})
        </span>
      </div>
    </div>
  )
}

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 })
  const [dragging, setDragging] = useState(false)
  const pointerRef = useRef({ x: -1, y: -1, inside: false })
  const loopWidthRef = useRef(0)
  const speedRef = useRef(0.08)
  const cases = CASES

  useEffect(() => {
    // Only run continuous marquee loop on desktop (>= 1024px)
    if (typeof window !== "undefined" && window.innerWidth < 1024) return

    let frame = 0
    let lastTime = performance.now()
    const BASE_SPEED = 0.08

    const measure = () => {
      const track = trackRef.current
      if (track) loopWidthRef.current = track.scrollWidth / 2
    }
    const resizeObserver = new ResizeObserver(measure)
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current)
      if (trackRef.current.firstElementChild) {
        resizeObserver.observe(trackRef.current.firstElementChild)
      }
    }
    measure()

    const tick = (time: number) => {
      const track = trackRef.current
      const elapsed = Math.min(40, time - lastTime)
      lastTime = time
      const loopWidth = loopWidthRef.current

      if (track && loopWidth > track.clientWidth && !dragRef.current.active) {
        const { x, inside } = pointerRef.current
        let targetSpeed = BASE_SPEED

        if (inside) {
          const bounds = track.getBoundingClientRect()
          const edgeZone = Math.max(120, Math.min(240, bounds.width * 0.2))
          const distLeft = x - bounds.left
          const distRight = bounds.right - x

          if (distLeft >= 0 && distLeft <= edgeZone) {
            // Near left edge: reverse / retroceder
            const factor = 1 - Math.max(0, distLeft) / edgeZone
            targetSpeed = -BASE_SPEED * (1.1 + factor * 2.2)
          } else if (distRight >= 0 && distRight <= edgeZone) {
            // Near right edge: accelerate forward / acelerar un poco
            const factor = 1 - Math.max(0, distRight) / edgeZone
            targetSpeed = BASE_SPEED * (1.1 + factor * 2.2)
          } else {
            // Center of track (hovering/reading cards): pause
            targetSpeed = 0
          }
        }

        // Smooth speed transition with lerp
        const lerpFactor = Math.min(1, elapsed * 0.01)
        speedRef.current += (targetSpeed - speedRef.current) * lerpFactor

        if (Math.abs(speedRef.current) > 0.001) {
          const next = track.scrollLeft + speedRef.current * elapsed
          track.scrollLeft = ((next % loopWidth) + loopWidth) % loopWidth
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const handleWindowBlur = () => {
      pointerRef.current = { x: -1, y: -1, inside: false }
    }
    window.addEventListener("blur", handleWindowBlur)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener("blur", handleWindowBlur)
    }
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest("a, button")) return
    const track = trackRef.current
    if (!track) return
    dragRef.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft }
    setDragging(true)
    speedRef.current = 0
    track.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    pointerRef.current = { x: event.clientX, y: event.clientY, inside: true }
    if (dragRef.current.active) {
      const loopWidth = loopWidthRef.current
      const next = dragRef.current.startScroll - (event.clientX - dragRef.current.startX)
      track.scrollLeft = loopWidth ? ((next % loopWidth) + loopWidth) % loopWidth : next
    }
  }
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    dragRef.current.active = false
    setDragging(false)
    if (event.pointerType !== "mouse") {
      pointerRef.current = { x: -1, y: -1, inside: false }
    }
  }
  const onPointerLeave = () => {
    if (!dragRef.current.active) pointerRef.current = { x: -1, y: -1, inside: false }
  }

  return (
    <section
      aria-labelledby="casos-title"
      id="casos"
      className="flex min-h-0 flex-col overflow-hidden bg-mist px-6 py-24 text-navy md:px-10 md:py-32"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
        <header className="mb-8 shrink-0 md:mb-10">
          <div>
            <p className="section-kicker mb-3">
              Casos de éxito
            </p>
            <h2 id="casos-title" className="max-w-3xl font-heading text-4xl leading-none tracking-[-.06em] sm:text-5xl md:text-6xl">
              Negocios que escalaron con creato
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-navy/65 md:text-base">
              Proyectos reales en las cinco áreas: del diseño de un local a un sistema de gestión.
            </p>
          </div>
        </header>

        {/* DESKTOP MARQUEE (lg and up) */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerLeave}
          onMouseMove={onPointerMove}
          onMouseLeave={onPointerLeave}
          className={`case-marquee hidden min-h-0 flex-1 lg:block ${
            dragging ? "case-marquee-dragging" : ""
          }`}
        >
          <div className="case-track flex h-full gap-4">
            {[...cases, ...cases].map((item, index) => (
              <CaseCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* MOBILE CAROUSEL (< lg) */}
        <MobileServices />

        <div className="mt-10 flex shrink-0 items-center justify-between gap-4 border-t border-navy/15 pt-6">
          <p className="font-heading text-xl md:text-2xl">¿Armaste algo parecido?</p>
          <a
            className="rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange/85"
            href={`${WHATSAPP_URL.split("?text=")[0]}?text=${encodeURIComponent(
              "Hola, quiero contarte sobre mi proyecto."
            )}`}
          >
            Contanos tu proyecto
          </a>
        </div>
      </div>
    </section>
  )
}

export function CaseArrow({ direction }: { direction: "left" | "right" }) {
  return direction === "left" ? <ChevronLeft /> : <ChevronRight />
}
