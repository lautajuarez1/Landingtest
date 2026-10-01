"use client"

import Lenis from "lenis"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

type SmoothScrollControls = { pause: () => void; resume: () => void }

const SmoothScrollContext = createContext<SmoothScrollControls>({
  pause: () => {},
  resume: () => {},
})

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useGSAP(() => {
    if (window.innerWidth < 1024 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.registerPlugin(ScrollTrigger)
    const instance = new Lenis({ lerp: 0.09, smoothWheel: true })
    const update = (time: number) => instance.raf(time * 1000)

    instance.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(update)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const controls = useMemo(() => ({ pause: () => lenis?.stop(), resume: () => lenis?.start() }), [lenis])

  return (
    <SmoothScrollContext.Provider value={controls}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export const useSmoothScroll = () => useContext(SmoothScrollContext)
