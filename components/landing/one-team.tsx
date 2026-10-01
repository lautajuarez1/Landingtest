"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { TEAM_COPY, TEAM_ROLES } from "@/lib/content"
import { MOTION } from "@/lib/animation"

export function OneTeam() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from("[data-team-node]", {
      scale: 0.7,
      opacity: 0,
      stagger: MOTION.stagger,
      ease: MOTION.ease.out,
      scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} aria-labelledby="equipo-title" id="equipo" className="on-dark relative overflow-hidden bg-graphite px-6 py-24 text-white md:px-10 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(233,109,69,.19),transparent_27%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,.06),transparent_24%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="section-kicker">Una red, una direccion</p>
          <h2 id="equipo-title" className="mt-3 text-4xl leading-none md:text-6xl">{TEAM_COPY.title}</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/72">{TEAM_COPY.description}</p>
          <ul className="mt-8 space-y-3 border-l border-orange pl-5 text-sm text-white/85">
            {TEAM_COPY.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
          <div className="mt-10 border-t border-white/15 pt-5"><p className="font-heading text-xl">{TEAM_COPY.rolesTitle}</p><p className="mt-1 text-sm leading-relaxed text-white/55">{TEAM_COPY.rolesDescription}</p></div>
        </div>

        <div className="team-network relative mx-auto grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="pointer-events-none absolute inset-[17%_13%] rounded-full border border-orange/25" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-[31%_28%] rounded-full border border-white/10" aria-hidden="true" />
          {TEAM_ROLES.map((role, index) => (
            <article data-team-node key={role} className={`team-node team-node-${index} relative z-10 min-h-28 rounded-2xl border border-white/12 bg-white/[.055] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-orange/70 hover:bg-orange/15 sm:min-h-32`}>
              <span className="block font-mono text-[10px] text-orange">0{index + 1}</span>
              <h3 className="mt-5 text-sm leading-snug text-white">{role}</h3>
            </article>
          ))}
          <div data-team-node className="pointer-events-none absolute left-1/2 top-1/2 z-20 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-orange bg-navy text-center shadow-[0_0_0_10px_rgba(36,36,36,.8),0_0_58px_rgba(233,109,69,.3)] sm:size-32"><span className="font-heading text-2xl tracking-[-.08em]">creato<span className="text-orange">.</span></span></div>
        </div>
      </div>
    </section>
  )
}
