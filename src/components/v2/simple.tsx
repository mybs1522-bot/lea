"use client";

import dynamic from "next/dynamic";
import { JoinButton } from "./cta";
import { SUPPORT_EMAIL, INSTAGRAM, waLink } from "./config";

const RoomScene = dynamic(() => import("./room-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#ffd9c4]" />,
});

// Simple proof right under the hero.
export function ProofStrip() {
  return (
    <div className="grid grid-cols-3 divide-x-2 divide-[#141210] border-y-2 border-[#141210] bg-[#ffd84d] text-center">
      {[
        ["500+", "designers joined"],
        ["₦380M+", "earned by members"],
        ["Today", "you can start"],
      ].map(([v, l]) => (
        <div key={l} className="px-1 py-3.5">
          <div className="v2-display text-[1.45rem] font-extrabold leading-none">{v}</div>
          <div className="mt-1 text-[11px] font-bold">{l}</div>
        </div>
      ))}
    </div>
  );
}

// The real problem, in plain words, with the 3D room as the "your work" picture.
export function WhyNoClients() {
  return (
    <section className="px-5 py-16">
      <h2 className="v2-display text-center text-[2.1rem] font-extrabold leading-[1]">
        Your work is good. <span className="v2-serif v2-mark [--mark:#ffb8c6]">So why no clients?</span>
      </h2>
      <div className="relative mx-auto mt-7 w-full max-w-[360px]">
        <div className="v2-arch v2-pop relative aspect-[1/0.85] overflow-hidden bg-gradient-to-b from-[#ffe7d8] to-[#ffc9ad]">
          <RoomScene className="absolute inset-0" />
        </div>
        <div className="v2-wobble v2-pop-sm absolute -left-2 top-8 rounded-full bg-white px-3 py-1.5 text-[12px] font-extrabold" style={{ ["--r" as string]: "-7deg" }}>
          Your beautiful work
        </div>
      </div>
      <div className="mx-auto mt-7 max-w-[360px] space-y-3 text-center">
        <p className="text-[17px] font-bold leading-snug">
          Because the people who need a designer <span className="text-[#f2643a]">can&apos;t find you.</span>
        </p>
        <p className="text-[15px] leading-relaxed text-[#141210]/70">
          They are on Instagram, Facebook and Google every day, looking for someone like you. This program shows you how to be the designer they find, and pay.
        </p>
      </div>
      <div className="mx-auto mt-6 max-w-[380px]">
        <JoinButton label="Show me how" />
      </div>
    </section>
  );
}

// Footer: who we are + how to reach us. Contact items show only when set in config.ts.
export function Footer() {
  const wa = waLink();
  return (
    <footer className="border-t-2 border-[#141210] bg-[#141210] px-5 pb-32 pt-10 text-[#fff6e9]">
      <div className="v2-display text-[20px] font-extrabold">
        the client<span className="v2-serif text-[#f2643a]"> engine</span>
      </div>
      <p className="mt-2 max-w-[320px] text-[13px] leading-relaxed text-[#fff6e9]/65">
        An online program that helps interior designers and architects in Nigeria get more clients who pay well.
      </p>
      {(SUPPORT_EMAIL || wa || INSTAGRAM) && (
        <div className="mt-5 space-y-1.5 text-[13.5px] font-semibold">
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="block underline underline-offset-2">WhatsApp us</a>}
          {SUPPORT_EMAIL && <a href={`mailto:${SUPPORT_EMAIL}`} className="block underline underline-offset-2">{SUPPORT_EMAIL}</a>}
          {INSTAGRAM && <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="block underline underline-offset-2">@{INSTAGRAM} on Instagram</a>}
        </div>
      )}
    </footer>
  );
}
