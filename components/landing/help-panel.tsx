"use client"

import { useRef } from "react"
import { ArrowRight, X } from "lucide-react"
import { COMPANY_NAME, HELP_PHRASES } from "@/lib/content"
import { ContactActions, EmailLink } from "./contact-links"

export function HelpPanel() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-navy"
      >
        ¿Cómo podemos ayudarte?
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="help-title"
        className="on-dark m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-graphite p-0 text-white backdrop:bg-black/60"
      >
        <div className="mx-auto flex min-h-full max-w-6xl flex-col px-6 py-6 md:px-10 md:py-10">
          <div className="flex items-center justify-between">
            <span className="font-heading text-lg font-semibold">{COMPANY_NAME}</span>
            <button
              type="button"
              onClick={close}
              className="flex size-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-graphite"
            >
              <X className="size-6" aria-hidden="true" />
              <span className="sr-only">Cerrar panel</span>
            </button>
          </div>

          <h2
            id="help-title"
            className="mt-12 text-3xl text-white md:mt-16 md:text-5xl"
          >
            ¿Cómo podemos ayudarte?
          </h2>

          <ul className="mt-10 grid gap-x-12 gap-y-1 md:grid-cols-2">
            {HELP_PHRASES.map((phrase) => (
              <li key={phrase.keyword}>
                <a
                  href={`#${phrase.target}`}
                  onClick={close}
                  className="group flex items-start gap-4 border-b border-white/15 py-5 text-lg leading-snug text-white/80 transition-colors hover:text-white md:text-xl"
                >
                  <ArrowRight
                    className="mt-1 size-5 shrink-0 text-orange transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                  <span>
                    {phrase.before}
                    <strong className="font-semibold text-white">{phrase.keyword}</strong>
                    {phrase.after}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-5 pt-14 sm:flex-row sm:items-center sm:gap-8">
            <ContactActions onDark />
            <EmailLink className="text-white" />
          </div>
        </div>
      </dialog>
    </>
  )
}
