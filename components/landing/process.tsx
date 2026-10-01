"use client"

import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { STEPS } from "@/lib/content"
import { MOTION } from "@/lib/animation"

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.innerWidth < 1024 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo("[data-process-line]", { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 35%", scrub: true },
    })
    gsap.from("[data-process-step]", {
      y: 34,
      opacity: 0,
      stagger: MOTION.stagger * 2,
      ease: MOTION.ease.out,
      scrollTrigger: { trigger: sectionRef.current, start: "top 62%" },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} aria-labelledby="proceso-title" id="proceso" className="relative overflow-hidden bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-5 border-b border-navy/15 pb-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><p className="section-kicker">De la idea a la obra</p><h2 id="proceso-title" className="mt-3 text-4xl leading-none text-navy md:text-6xl">Nuestra metodología</h2></div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">Un proceso visible, coordinado y sin partes sueltas. Cada decisión suma al mismo resultado.</p>
        </header>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-navy/15 lg:block" />
          <div data-process-line className="absolute left-0 right-0 top-12 hidden h-px origin-left bg-orange lg:block" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, index) => (
              <li data-process-step key={step.title} className="group relative border-l border-navy/15 pl-5 sm:pl-6 lg:border-l-0 lg:pl-0">
                <span className="relative z-10 mb-8 flex size-10 items-center justify-center rounded-full border border-navy/20 bg-white font-heading text-xs font-semibold text-navy transition group-hover:border-orange group-hover:bg-orange group-hover:text-white lg:mb-12">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-heading text-5xl leading-none tracking-[-.08em] text-orange/25 transition group-hover:text-orange/70">0{index + 1}</p>
                <h3 className="mt-4 text-xl leading-tight text-navy">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-navy/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-heading text-xl text-navy">¿Arrancamos con el paso 1?</p><p className="mt-1 text-sm text-muted-foreground">Analizamos tu caso sin cargo y te presentamos una propuesta global a medida.</p></div>
          <a href="#contacto" className="group inline-flex w-fit items-center gap-3 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange"><span>Hablemos de tu caso</span><ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
        </div>
      </div>
    </section>
  )
}
