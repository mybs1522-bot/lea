import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import "@/components/v2/v2.css";
import { CheckoutProvider } from "@/components/v2/checkout";
import { V2Hero, Ticker } from "@/components/v2/hero";
import { PlanQuiz } from "@/components/v2/plan-quiz";
import { OfferBento, FloorPlan, PassOffer, V2Faq, FinalClose, StickyBar } from "@/components/v2/sections";
import { ProofStrip, WhyNoClients, Footer } from "@/components/v2/simple";
import { Inside, AfterPay, Stories, Mentor, MidCTA } from "@/components/v2/program";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-v2-serif" });

export const metadata: Metadata = {
  title: "Get More Clients Who Pay You Well | For Interior Designers & Architects in Nigeria",
  description: "We teach you how to find clients online, step by step, and help you 1-on-1 until it works. For interior designers and architects in Nigeria. ₦30,000, start today.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff6e9",
};

// Cold / impulse flow: what it is + big tap → "that's me" → what you get → inside → steps
// → proof → mentor → price + join → after you pay → objections → last call.
export default function V2Page() {
  return (
    <CheckoutProvider>
      <div className={`v2-root ${serif.variable} min-h-screen bg-[#f3e4cc]`}>
        <main className="mx-auto max-w-[480px] overflow-x-hidden border-x-2 border-[#141210] bg-[#fff6e9]">
          <V2Hero />
          <ProofStrip />
          <PlanQuiz />
          <WhyNoClients />
          <OfferBento />
          <Inside />
          <MidCTA />
          <FloorPlan />
          <Stories />
          <MidCTA label="I want clients like this" />
          <Mentor />
          <PassOffer />
          <AfterPay />
          <V2Faq />
          <Ticker dark={false} />
          <FinalClose />
          <Footer />
        </main>
        <StickyBar />
      </div>
    </CheckoutProvider>
  );
}
