"use client"

import { useState } from "react"
import { Check, X, Phone, Mail, MessageCircle } from "lucide-react"
import {
  ON_YOUR_OWN,
  WITH_US,
  WHATSAPP_URL,
  SCHEDULE_URL,
  CONTACT_EMAIL,
  CONTACT_DETAILS,
  PILLARS,
  SOCIAL_LINKS,
} from "@/lib/content"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function BudgetCta() {
  const [tab, setTab] = useState<"traditional" | "experience">("experience")
  const list = tab === "traditional" ? ON_YOUR_OWN : WITH_US

  return (
    <>
      <section
        id="presupuesto"
        aria-labelledby="presupuesto-title"
        className="relative overflow-hidden bg-muted px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="max-w-2xl">
            <p className="section-kicker">Menos coordinacion, mas avance</p>
            <h2 id="presupuesto-title" className="mt-3 text-4xl leading-none text-navy md:text-6xl">
              Trabajemos juntos
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Contanos los desafíos de tu negocio y te armamos una propuesta global para resolverlos todos.
            </p>
          </div>
          <div className="mt-10 md:mt-14">
            <div
              role="tablist"
              aria-label="Comparación de caminos"
              className="mb-4 flex rounded-full bg-white p-1 md:hidden"
            >
              <button
                role="tab"
                aria-selected={tab === "traditional"}
                onClick={() => setTab("traditional")}
                className="flex-1 rounded-full px-3 py-2 text-sm aria-selected:bg-navy aria-selected:text-white"
              >
                El camino tradicional
              </button>
              <button
                role="tab"
                aria-selected={tab === "experience"}
                onClick={() => setTab("experience")}
                className="flex-1 rounded-full px-3 py-2 text-sm aria-selected:bg-navy aria-selected:text-white"
              >
                La experiencia creato
              </button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Comparison
                title="El camino tradicional"
                items={ON_YOUR_OWN}
                icon="x"
                className="hidden md:block"
              />
              <Comparison
                title="La experiencia creato"
                items={WITH_US}
                icon="check"
                itemsOverride={list}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zona de Contacto & Footer Corporativo Simple (Estilo Autocity con fondo oscuro bg-navy / grafito) */}
      <footer
        id="contacto"
        aria-labelledby="contacto-title"
        className="on-dark relative overflow-hidden border-t border-white/10 bg-navy px-6 py-20 text-white md:px-10 md:py-28"
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between">
          <div className="mb-16 max-w-3xl border-b border-white/15 pb-10"><p className="section-kicker">Un proyecto, un solo contacto</p><h2 id="contacto-title" className="mt-3 text-4xl leading-none tracking-[-.065em] md:text-6xl">Hagamos que tu negocio se mueva.</h2><p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">Escribinos, agendemos una reunion o contanos que tenes en mente. El equipo correcto se arma desde el primer mensaje.</p></div>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 lg:gap-8">
            {/* Col 1: Logo & Redes Sociales */}
            <div className="lg:col-span-3">
              <a href="#inicio" className="font-heading text-3xl font-semibold tracking-[-0.04em] text-white">
                creato<span className="text-orange">.</span>
              </a>
              <div className="mt-5 flex items-center gap-3 text-white/75">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="Instagram de Creato"
                >
                  <InstagramIcon className="size-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="LinkedIn de Creato"
                >
                  <LinkedinIcon className="size-5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="WhatsApp de Creato"
                >
                  <MessageCircle className="size-5" />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="Correo de Creato"
                >
                  <Mail className="size-5" />
                </a>
              </div>
            </div>

            {/* Col 2: Áreas */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-base font-bold text-white">Áreas</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
                {PILLARS.map((pillar) => (
                  <li key={pillar.id}>
                    <a href={`#${pillar.id}`} className="transition-colors hover:text-orange">
                      {pillar.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Nosotros */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-base font-bold text-white">Nosotros</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
                <li>
                  <a href="#casos" className="transition-colors hover:text-orange">
                    Casos de éxito
                  </a>
                </li>
                <li>
                  <a href="#proceso" className="transition-colors hover:text-orange">
                    Nuestra metodología
                  </a>
                </li>
                <li>
                  <a href="#equipo" className="transition-colors hover:text-orange">
                    Un solo equipo
                  </a>
                </li>
                <li>
                  <a href="#presupuesto" className="transition-colors hover:text-orange">
                    Presupuesto integral
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Contacto */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-base font-bold text-white">Contacto</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange"
                  >
                    WhatsApp directo
                  </a>
                </li>
                <li>
                  <a
                    href={SCHEDULE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange"
                  >
                    Agendar videollamada
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="break-all transition-colors hover:text-orange"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Teléfono, Horarios y Ubicaciones */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-orange" aria-hidden="true" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-base font-bold text-white transition-colors hover:text-orange"
                >
                  {CONTACT_DETAILS.phoneLabel}
                </a>
              </div>
              <div className="mt-3.5 flex flex-col gap-1.5 text-xs text-white/70 leading-relaxed">
                <p>
                  <strong className="font-semibold text-white">{CONTACT_DETAILS.hours.split(":")[0]}:</strong>{" "}{CONTACT_DETAILS.hours.split(":").slice(1).join(":")}
                </p>
                <p>
                  <strong className="font-semibold text-white">{CONTACT_DETAILS.response.split(":")[0]}:</strong>{" "}{CONTACT_DETAILS.response.split(":").slice(1).join(":")}
                </p>
                <p>
                  <strong className="font-semibold text-white">{CONTACT_DETAILS.coverage.split(":")[0]}:</strong>{" "}{CONTACT_DETAILS.coverage.split(":").slice(1).join(":")}
                </p>
                <p>
                  <strong className="font-semibold text-white">{CONTACT_DETAILS.remote.split(":")[0]}:</strong>{" "}{CONTACT_DETAILS.remote.split(":").slice(1).join(":")}
                </p>
                <p>
                  <strong className="font-semibold text-white">{CONTACT_DETAILS.administration}:</strong> {CONTACT_EMAIL}
                </p>
              </div>
            </div>
          </div>

          {/* Subfooter inferior */}
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} creato.com.ar Todos los derechos reservados · Términos y Condiciones · Privacidad
            </p>
            <p className="font-heading text-xs font-semibold tracking-wider uppercase text-white/70">
              Muchas soluciones, un solo contacto.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

function Comparison({
  title,
  items,
  icon,
  className,
  itemsOverride,
}: {
  title: string
  items: string[]
  icon: "x" | "check"
  className?: string
  itemsOverride?: string[]
}) {
  return (
    <div
      className={`rounded-3xl border p-6 md:p-8 ${
        icon === "check" ? "on-dark bg-navy text-white" : "bg-white text-navy"
      } ${icon === "check" ? "border-navy" : "border-navy/10 shadow-[0_18px_60px_rgba(23,23,23,.07)]"} ${className ?? ""}`}
    >
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm md:gap-3 md:text-base">
        {(itemsOverride ?? items).map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden="true">
              {icon === "check" ? (
                <Check className="mt-0.5 size-4 shrink-0 text-orange" />
              ) : (
                <X className="mt-0.5 size-4 shrink-0 text-graphite/50" />
              )}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
