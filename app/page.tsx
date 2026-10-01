import { BudgetCta } from "@/components/landing/budget-cta"
import { Hero } from "@/components/landing/hero"
import { OneTeam } from "@/components/landing/one-team"
import { Pillars } from "@/components/landing/pillars"
import { Process } from "@/components/landing/process"
import { Services } from "@/components/landing/services"
import { SmoothScroll } from "@/components/landing/smooth-scroll"
import { ScrollProgress } from "@/components/landing/scroll-progress"
import { WhatsAppFloat } from "@/components/landing/whatsapp-float"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll>
        <div id="inicio"><Hero /></div>
        <main>
          <Pillars />
          <OneTeam />
          <Services />
          <Process />
          <BudgetCta />
        </main>
      </SmoothScroll>
      <WhatsAppFloat />
    </>
  )
}
