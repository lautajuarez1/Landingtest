"use client"

import { useEffect, useState } from "react"

const sections = [
  ["inicio", "Inicio"],
  ["pilares", "Áreas"],
  ["equipo", "Un solo equipo"],
  ["casos", "Casos de éxito"],
  ["proceso", "Metodología"],
  ["presupuesto", "Trabajemos juntos"],
  ["contacto", "Contacto"],
] as const

export function SectionDots() {
  const [active, setActive] = useState("inicio")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -40%", threshold: 0 },
    )
    sections.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Secciones" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 md:block">
      <ul className="flex flex-col items-center gap-3 rounded-full bg-black/20 p-2 backdrop-blur-sm">
        {sections.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label}
              aria-current={active === id ? "true" : undefined}
              className="block size-2.5 rounded-full border border-white/80 bg-white/40 transition-all aria-[current=true]:size-3 aria-[current=true]:bg-orange"
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
