"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star } from "lucide-react";
import { JoinButton } from "./cta";

export const TICKER = ["MORE CLIENTS", "BETTER PRICES", "HELP ON WHATSAPP", "START TODAY", "NO ADS NEEDED", "500+ DESIGNERS JOINED"];

export function Ticker({ dark = true }: { dark?: boolean }) {
  const row = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div className={`overflow-hidden border-y-2 border-[#141210] py-2 ${dark ? "bg-[#141210] text-[#fff6e9]" : "bg-[#ffd84d] text-[#141210]"}`}>
      <div className="flex w-max animate-[v2-marquee-x_24s_linear_infinite] gap-5 whitespace-nowrap text-[12px] font-extrabold tracking-[0.12em]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-5">
            {t} <span className="text-[#f2643a]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// The result, shown not told: clients messaging YOU.
const CHATS = [
  { who: "Mrs. Bello", where: "Lekki", msg: "Hello! I need an interior designer for my 3-bedroom flat. How much do you charge?", time: "9:14" },
  { who: "David", where: "Abuja", msg: "I saw your work on Instagram. Can you design my new office?", time: "11:02" },
  { who: "Sarah", where: "London", msg: "Love your style! Can we do a call this week for my living room?", time: "2:37" },
];

function ClientPhone() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const ids = CHATS.map((_, k) => setTimeout(() => setN(k + 1), 700 + k * 1300));
    return () => ids.forEach(clearTimeout);
  }, []);
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="v2-pop rounded-[38px] bg-[#141210] p-2">
        <div className="overflow-hidden rounded-[31px] bg-[#efe6d8]">
          <div className="flex items-center gap-2.5 bg-[#1f7a5a] px-4 py-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[13px] font-extrabold">You</div>
            <div className="leading-tight">
              <div className="text-[13px] font-extrabold">Your WhatsApp</div>
              <div className="text-[10.5px] text-white/80">{n} new client message{n === 1 ? "" : "s"}</div>
            </div>
          </div>
          <div className="h-[248px] space-y-2.5 p-3">
            <AnimatePresence>
              {CHATS.slice(0, n).map((c) => (
                <motion.div
                  key={c.who}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm"
                >
                  <div className="text-[11px] font-extrabold text-[#1f7a5a]">
                    {c.who} · {c.where}
                  </div>
                  <div className="text-[12.5px] leading-snug text-[#141210]">{c.msg}</div>
                  <div className="text-right text-[9.5px] text-[#141210]/40">{c.time}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="v2-wobble v2-pop-sm absolute -right-3 top-16 rounded-full bg-[#ffd84d] px-3 py-1.5 text-[12px] font-extrabold" style={{ ["--r" as string]: "7deg" }}>
        This could be you 👀
      </div>
    </div>
  );
}

export function V2Hero() {
  return (
    <section className="relative overflow-hidden">
      <Ticker />
      <div className="v2-blueprint relative px-5 pb-10 pt-4">
        <div className="flex items-center justify-between">
          <div className="v2-display text-[16px] font-extrabold leading-none">
            the client<span className="v2-serif text-[#f2643a]"> engine</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border-2 border-[#141210] bg-white px-2.5 py-1 text-[11px] font-extrabold">
            <Star className="h-3.5 w-3.5 fill-[#ffd84d] text-[#141210]" /> 500+ joined
          </div>
        </div>

        {/* WHO it is for */}
        <div className="mt-5 inline-block rounded-full border-2 border-[#141210] bg-[#a8c69f] px-3 py-1 text-[12px] font-extrabold">
          For interior designers &amp; architects in Nigeria
        </div>

        {/* WHAT you get (the result) */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="v2-display mt-3 text-[2.7rem] font-extrabold leading-[0.95]"
        >
          Get more clients who <span className="v2-mark v2-serif text-[3rem] [--mark:#ffd84d]">pay you well.</span>
        </motion.h1>

        {/* 12 s explainer: autoplays muted on phones, loops, 359 KB */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="v2-pop relative mt-4 aspect-video w-full overflow-hidden rounded-[22px] bg-[#fff6e9]"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/v2/promo.mp4"
            poster="/v2/promo-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="12-second video explaining the program"
          />
        </motion.div>

        {/* HOW, in one simple line */}
        <p className="mt-3 text-[16px] font-medium leading-snug text-[#141210]/80">
          We teach you how to find clients online, <b className="text-[#141210]">step by step</b>. And we help you <b className="text-[#141210]">1-on-1</b> until it works.
        </p>

        <ul className="mt-4 space-y-2">
          {["Clients find you on Instagram, Facebook & Google", "No need to pay for ads", "Your own mentor on WhatsApp"].map((t) => (
            <li key={t} className="flex items-center gap-2.5 text-[15px] font-bold">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#141210] bg-[#a8c69f]">
                <Check className="h-3.5 w-3.5" />
              </span>
              {t}
            </li>
          ))}
        </ul>

        {/* PRICE + ACTION */}
        <div className="mt-6">
          <JoinButton label="Yes, I want more clients" />
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-[12.5px] font-semibold text-[#141210]/65">
          <div className="flex -space-x-2">
            {["#ffd84d", "#8ec5ff", "#ffb8c6", "#a8c69f"].map((c, i) => (
              <span key={i} className="h-6 w-6 rounded-full border-2 border-[#141210]" style={{ background: c }} />
            ))}
          </div>
          500+ Nigerian designers already joined
        </div>

        {/* SHOW the result: a designer like you, and her phone full of clients */}
        <div className="relative mt-9">
          <div className="v2-arch v2-pop relative mx-auto aspect-[4/5] w-[86%] overflow-hidden">
            <Image src="/v2/designer.webp" alt="A Nigerian interior designer reading new client messages on her phone" fill priority sizes="340px" className="object-cover" />
          </div>
          <div className="relative -mt-36 ml-auto w-[78%]">
            <ClientPhone />
          </div>
        </div>
      </div>
    </section>
  );
}
