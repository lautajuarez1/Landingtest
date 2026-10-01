"use client"

import Image from "next/image"
import { ArrowDownRight, Menu } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState } from "react"
import { HERO } from "@/lib/content"
import { MOTION } from "@/lib/animation"
import { HelpPanel } from "./help-panel"

export function Hero() {
  const [compact, setCompact] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 32)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.from("[data-hero-reveal]", {
      yPercent: 115,
      opacity: 0,
      duration: MOTION.duration.reveal,
      ease: MOTION.ease.out,
      stagger: MOTION.stagger,
      delay: 0.15,
    })
  }, { scope: heroRef })

  return (
    <header ref={heroRef} className="hero-shell on-dark relative isolate flex min-h-[46rem] h-dvh overflow-hidden bg-navy text-white">
      <Image src="/images/hero.png" alt="" fill priority sizes="100vw" className="hero-image object-cover" />
      <div className="hero-noise absolute inset-0" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <nav aria-label="Secciones principales" className={`hero-nav fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5 ${compact ? "hero-nav-compact" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-xl sm:px-5">
          <a href="#inicio" className="font-heading text-xl font-semibold tracking-[-0.07em] text-white">creato<span className="text-orange">.</span></a>
          <div className="hidden items-center gap-5 lg:flex">
            {HERO.navigation.map(([label, href]) => <a key={href} href={href} className="text-xs font-medium tracking-wide text-white/65 transition hover:text-orange">{label}</a>)}
          </div>
          <a href="#contacto" className="inline-flex items-center gap-2 rounded-full bg-orange px-3 py-2 text-xs font-semibold text-white transition hover:scale-[1.03] sm:px-4">
            Hablemos <ArrowDownRight className="size-3.5" aria-hidden="true" />
          </a>
          <a href="#pilares" aria-label="Abrir navegacion" className="grid size-8 place-items-center rounded-full border border-white/20 text-white lg:hidden"><Menu className="size-4" /></a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-12 pt-32 sm:px-10 sm:pb-20">
        <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange">
          <span className="size-2 rounded-full bg-orange shadow-[0_0_18px_5px_rgba(233,109,69,.45)]" />
          <span data-hero-reveal>Soluciones integrales para negocios</span>
        </div>
        <div className="overflow-hidden"><p data-hero-reveal className="font-heading text-[clamp(4.5rem,14vw,12rem)] font-semibold leading-[.72] tracking-[-0.1em] text-white">creato<span className="text-orange">.</span></p></div>
        <h1 className="mt-8 max-w-5xl overflow-hidden text-[clamp(2.6rem,6.4vw,6.7rem)] leading-[.95] tracking-[-0.065em] text-white"><span data-hero-reveal className="inline-block">{HERO.title}</span></h1>
        <div data-hero-reveal className="mt-8 grid max-w-4xl gap-6 border-t border-white/20 pt-5 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{HERO.description}</p>
          <HelpPanel />
        </div>
      </div>

      <a href="#pilares" className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-white/60 transition hover:text-white md:flex"><span className="grid size-10 place-items-center rounded-full border border-white/25">↓</span> Explora</a>
    </header>
  )
}
