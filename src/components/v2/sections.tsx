"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, MessageCircle, Video, FileText, RefreshCw, Gift, ArrowRight, Check } from "lucide-react";
import { ScrollVelocityContainer, ScrollVelocityRow } from "./ui/scroll-velocity";
import { useCheckout } from "./checkout";
import { JoinButton, WhatsAppButton } from "./cta";
import { Guarantee, PayTrust } from "./program";

/* ---------------- velocity marquee (21st.dev scroll-velocity) ---------------- */
export function VelocityRows() {
  const a = ["LAGOS", "ABUJA", "HOUSTON", "LONDON", "DUBAI", "TORONTO"];
  const b = ["PAYING CLIENTS", "BETTER BUDGETS", "BOOKED CALENDAR", "NO PRICE WARS"];
  return (
    <div className="overflow-hidden border-y-2 border-[#141210] bg-[#ffd84d] py-4">
      <ScrollVelocityContainer className="space-y-1">
        <ScrollVelocityRow baseVelocity={3} direction={1}>
          {a.map((w) => (
            <span key={w} className="v2-display mx-4 text-[2rem] font-extrabold text-transparent [-webkit-text-stroke:1.5px_#141210]">{w} ✦</span>
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={3} direction={-1}>
          {b.map((w) => (
            <span key={w} className="v2-display mx-4 text-[2rem] font-extrabold">{w} <span className="v2-serif text-[#f2643a]">✺</span></span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}

/* ---------------- what you get: bento ---------------- */
export function OfferBento() {
  return (
    <section className="px-5 py-16">
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f2643a]">Here is what you get</div>
        <h2 className="v2-display mt-3 text-[2.1rem] font-extrabold leading-[0.98]">
          Lessons <span className="v2-serif">+</span> a mentor <span className="v2-serif">+</span> <span className="v2-mark [--mark:#8ec5ff]">real help</span>
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <motion.div whileInView={{ rotate: -1 }} initial={{ rotate: 0 }} viewport={{ once: true }} className="v2-pop relative col-span-2 overflow-hidden rounded-[26px] bg-[#f2643a] p-5 text-white">
          <Download className="h-7 w-7" />
          <div className="v2-display mt-3 max-w-[200px] text-[1.6rem] font-extrabold leading-none">Easy video lessons</div>
          <div className="mt-2 max-w-[230px] text-[13.5px] text-white/85">Watch on your phone. Do it step by step. Keep it forever.</div>
          <div className="absolute right-4 top-4 flex h-[72px] w-[72px] rotate-12 items-center justify-center rounded-full border-2 border-[#141210] bg-[#ffd84d] text-center text-[10px] font-extrabold uppercase leading-tight text-[#141210]">
            Lifetime
            <br />
            access
          </div>
        </motion.div>
        <div className="v2-pop rounded-[24px] bg-[#8ec5ff] p-4">
          <MessageCircle className="h-6 w-6" />
          <div className="v2-display mt-3 text-[1.15rem] font-extrabold leading-tight">Your own mentor</div>
          <div className="mt-1 text-[12.5px] text-[#141210]/70">Chat on WhatsApp when you need help.</div>
        </div>
        <div className="v2-pop rounded-[24px] bg-[#ffb8c6] p-4">
          <Video className="h-6 w-6" />
          <div className="v2-display mt-3 text-[1.15rem] font-extrabold leading-tight">1-on-1 help</div>
          <div className="mt-1 text-[12.5px] text-[#141210]/70">Stuck? We sit with you and fix it.</div>
        </div>
        <div className="v2-pop rounded-[24px] bg-[#a8c69f] p-4">
          <FileText className="h-6 w-6" />
          <div className="v2-display mt-3 text-[1.15rem] font-extrabold leading-tight">Copy-paste messages</div>
          <div className="mt-1 text-[12.5px] text-[#141210]/70">What to say so clients say yes.</div>
        </div>
        <div className="v2-pop rounded-[24px] bg-white p-4">
          <RefreshCw className="h-6 w-6" />
          <div className="v2-display mt-3 text-[1.15rem] font-extrabold leading-tight">Free updates</div>
          <div className="mt-1 text-[12.5px] text-[#141210]/70">New lessons added free, forever.</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- how it works: a floor plan that draws itself ---------------- */
const ROOMS = [
  { n: "01", t: "Join today", d: "Pay once. Get access right away.", x: 8, y: 8, w: 150, h: 120, c: "#ffd84d" },
  { n: "02", t: "Watch and do", d: "Follow the easy videos, step by step.", x: 166, y: 8, w: 150, h: 120, c: "#8ec5ff" },
  { n: "03", t: "Clients message you", d: "People start asking for your price.", x: 8, y: 136, w: 150, h: 150, c: "#ffb8c6" },
  { n: "04", t: "You get paid", d: "We help you close the deal.", x: 166, y: 136, w: 150, h: 150, c: "#a8c69f" },
];
export function FloorPlan() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const [k, setK] = useState(0);
  useEffect(() => p.on("change", (v) => setK(v)), [p]);
  return (
    <section className="v2-blueprint-blue relative overflow-hidden px-5 py-16 text-white">
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#ffd84d]">4 easy steps</div>
        <h2 className="v2-display mt-3 text-[2.1rem] font-extrabold leading-[0.98]">
          How it <span className="v2-serif text-[#ffd84d]">works</span>
        </h2>
      </div>
      <div ref={ref} className="relative mx-auto mt-9 w-full max-w-[360px]">
        <svg viewBox="0 0 324 294" className="w-full overflow-visible">
          {ROOMS.map((r, i) => {
            const on = Math.min(1, Math.max(0, k * 4.4 - i));
            const per = 2 * (r.w + r.h);
            return (
              <g key={r.n}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="6" fill={r.c} fillOpacity={on * 0.95} />
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="6" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray={per} strokeDashoffset={per * (1 - on)} />
                {/* door swing */}
                <path d={`M ${r.x + r.w - 34} ${r.y + r.h} a 26 26 0 0 1 26 -26`} fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" opacity={on} />
                <text x={r.x + 12} y={r.y + 30} fontSize="22" fontWeight="800" fill="#141210" opacity={on} style={{ fontFamily: "var(--font-heading)" }}>{r.n}</text>
              </g>
            );
          })}
        </svg>
        <div className="mt-6 space-y-3">
          {ROOMS.map((r, i) => (
            <motion.div key={r.n} initial={{ opacity: 0.3, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ margin: "-30% 0px -40% 0px" }} className="flex gap-3 rounded-2xl border-2 border-white/80 bg-white/10 p-3.5 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#141210] text-sm font-extrabold text-[#141210]" style={{ background: r.c }}>{r.n}</div>
              <div>
                <div className="v2-display text-[1.05rem] font-extrabold">{r.t}</div>
                <div className="text-[13px] text-white/80">{r.d}</div>
              </div>
              <span className="sr-only">step {i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
        <div className="relative mx-auto mt-8 max-w-[360px]">
          <div className="v2-arch relative aspect-[4/3.6] overflow-hidden border-2 border-white shadow-[4px_4px_0_#141210]">
            <Image src="/v2/meeting.webp" alt="A Nigerian interior designer closing a deal with happy clients" fill sizes="360px" className="object-cover" />
          </div>
          <div className="v2-wobble v2-pop-sm absolute -right-1 bottom-6 rounded-full bg-[#a8c69f] px-3 py-1.5 text-[12px] font-extrabold text-[#141210]" style={{ ["--r" as string]: "6deg" }}>Step 4: you get paid 🤝</div>
        </div>
    </section>
  );
}

/* ---------------- the pass (offer card, tilt + beam) ---------------- */
function PassCard() {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 }), sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const glare = useTransform(sry, (v) => `${50 + v * 3}%`);
  useEffect(() => {
    const onTilt = (e: DeviceOrientationEvent) => {
      ry.set(Math.max(-12, Math.min(12, (e.gamma ?? 0) / 3)));
      rx.set(Math.max(-10, Math.min(10, -((e.beta ?? 50) - 50) / 4)));
    };
    window.addEventListener("deviceorientation", onTilt, { passive: true });
    return () => window.removeEventListener("deviceorientation", onTilt);
  }, [rx, ry]);
  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
        }}
        onPointerLeave={() => { rx.set(0); ry.set(0); }}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="v2-pop relative mx-auto aspect-[1.58] w-full max-w-[360px] overflow-hidden rounded-[24px] bg-[conic-gradient(from_210deg_at_70%_30%,#ffd84d,#ffb8c6,#c9b6ff,#8ec5ff,#a8c69f,#ffd84d)] p-5"
      >
        <span className="v2-beam" style={{ ["--dur" as string]: 4.5, ["--size" as string]: 120, ["--c1" as string]: "#fff", ["--c2" as string]: "#f2643a" }} />
        <motion.div style={{ left: glare }} className="pointer-events-none absolute -top-1/2 h-[200%] w-24 -translate-x-1/2 rotate-[25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        {/* tiny plan drawing */}
        <svg viewBox="0 0 80 60" className="absolute right-4 top-12 h-16 w-20 opacity-60">
          <rect x="2" y="2" width="76" height="56" fill="none" stroke="#141210" strokeWidth="2" />
          <path d="M40 2 V34 M2 34 H52 M52 34 V58" fill="none" stroke="#141210" strokeWidth="2" />
          <path d="M52 34 a12 12 0 0 1 12 -12" fill="none" stroke="#141210" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#141210]/60">Normal price ₦75,000</div>
            <div className="v2-display text-[1.4rem] font-extrabold leading-none">You pay today</div>
          </div>
          <div className="rotate-6 rounded-md border-2 border-[#141210] bg-white px-2 py-0.5 text-[10px] font-extrabold">-60%</div>
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
          <div className="space-y-0.5 text-[11px] font-bold">
            <div>✓ All lessons</div>
            <div>✓ Your mentor</div>
            <div>✓ 1-on-1 help</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold text-[#141210]/50 line-through">₦75,000</div>
            <div className="v2-display text-[2.1rem] font-extrabold leading-none">₦30,000</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const INCLUDED = [
  "All the video lessons (yours forever)",
  "Your own mentor on WhatsApp",
  "1-on-1 help when you are stuck",
  "Make your Instagram, Facebook & Google look professional",
  "Copy-paste messages that turn chats into paid jobs",
  "Free ways to get clients: no ads needed",
];
const BONUS = ["Get bigger clients in Lagos & Abuja", "Join our designers group", "Free updates forever"];

export function PassOffer() {
  return (
    <section id="v2-offer" className="v2-blueprint relative border-y-2 border-[#141210] bg-[#fdebd3] px-5 py-16">
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f2643a]">The price</div>
        <h2 className="v2-display mt-3 text-[2.1rem] font-extrabold leading-[0.98]">
          Everything for <span className="v2-serif v2-mark [--mark:#a8c69f]">one small price</span>
        </h2>
        <p className="mt-2 text-[15px] font-semibold text-[#141210]/65">Pay once. Keep it forever.</p>
      </div>
      <div className="mt-7">
        <PassCard />
      </div>
      <div className="v2-pop mx-auto mt-8 max-w-[380px] space-y-3 rounded-[26px] bg-white p-5">
        {INCLUDED.map((x) => (
          <div key={x} className="flex items-start gap-3 text-[14px] font-medium">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#141210] bg-[#a8c69f]"><Check className="h-3 w-3" /></span>
            {x}
          </div>
        ))}
        <div className="pt-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#f2643a]">+ Free bonuses</div>
        {BONUS.map((x) => (
          <div key={x} className="flex items-start gap-3 text-[14px] font-medium">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#141210] bg-[#ffd84d]"><Gift className="h-3 w-3" /></span>
            {x}
          </div>
        ))}
        <div className="rounded-2xl border-2 border-[#141210] bg-[#ffd84d] p-4 text-center">
          <div className="text-[12px] font-extrabold uppercase tracking-[0.1em]">₦30,000 is about</div>
          <div className="v2-display text-[2.1rem] font-extrabold leading-none">₦1,000 a day</div>
          <div className="mt-1 text-[13px] font-semibold">for one month. One good client can pay you <b className="text-[#f2643a]">₦1,000,000+</b>.</div>
        </div>
        <div className="pt-2">
          <JoinButton label="Yes, I want more clients" />
          <PayTrust />
        </div>
      </div>
      <Guarantee />
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQ = [
  ["What do I get?", "Easy video lessons, your own mentor on WhatsApp, and 1-on-1 help when you are stuck."],
  ["When do I get it?", "Right away. After you pay, check your email. Your access is there."],
  ["How do I pay? Is it safe?", "You pay on Selar, a safe Nigerian payment page. Use your card or a bank transfer."],
  ["I am not good with tech. Can I do it?", "Yes. If you can use WhatsApp and Instagram, you can do this. And we help you."],
  ["Do I need to pay for ads?", "No. You can get clients for free. Ads are only if you want them."],
  ["I don't have a website. Is that ok?", "Yes. Your Instagram, Facebook and Google page is enough."],
  ["What if I get stuck?", "Message your mentor, or get 1-on-1 help. We fix it with you."],
  ["What if it is not for me?", "You are covered by our 7-day money-back guarantee. Look inside, and if it's not for you, message us within 7 days for a full refund."],
  ["Is ₦30,000 worth it?", "One good client can pay you ₦1,000,000 or more. So one client pays for this many times over."],
];
export function V2Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="px-5 py-14">
      <h2 className="v2-display text-center text-[2rem] font-extrabold">
        Questions? <span className="v2-serif">Easy answers.</span>
      </h2>
      <div className="mx-auto mt-6 max-w-[400px] space-y-3">
        {FAQ.map(([q, a], i) => (
          <div key={q} className={`v2-pop-sm overflow-hidden rounded-[18px] ${o === i ? "bg-[#ffd84d]" : "bg-white"}`}>
            <button onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[14.5px] font-extrabold">
              {q}
              <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${o === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {o === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 text-[13.5px] leading-relaxed text-[#141210]/75">
                  {a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- final close + sticky bar ---------------- */
export function FinalClose() {
  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-10 text-center">
      <div className="relative mx-auto max-w-[360px]">
        <div className="v2-arch v2-pop relative mx-auto aspect-[1/1.05] w-[78%] overflow-hidden">
          <Image src="/v2/couple.webp" alt="A Nigerian couple looking for a designer on their phone" fill sizes="280px" className="object-cover" />
        </div>
        <div className="v2-wobble v2-pop-sm absolute -right-1 top-6 rounded-full bg-[#ffb8c6] px-3 py-1.5 text-[12px] font-extrabold" style={{ ["--r" as string]: "8deg" }}>your next client 👋</div>
      </div>
      <div className="v2-display mt-8 text-[2.3rem] font-extrabold leading-[0.98]">
        Someone needs a designer <span className="v2-serif v2-mark [--mark:#ffd84d]">today.</span>
      </div>
      <p className="mx-auto mt-3 max-w-[320px] text-[14.5px] text-[#141210]/65">Let them find YOU. Join today. We show you how, and we help you.</p>
      <div className="mx-auto mt-7 max-w-[380px]">
        <JoinButton label="Yes, I want more clients" />
      </div>
    </section>
  );
}

export function StickyBar() {
  const { open } = useCheckout();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => {
      const offer = document.getElementById("v2-offer")?.getBoundingClientRect();
      const inOffer = !!offer && offer.top < window.innerHeight * 0.5 && offer.bottom > window.innerHeight * 0.5;
      const quiz = document.getElementById("v2-quiz")?.getBoundingClientRect();
      const inQuiz = !!quiz && quiz.top < window.innerHeight && quiz.bottom > window.innerHeight * 0.35;
      setShow(window.scrollY > window.innerHeight * 0.9 && !inOffer && !inQuiz && window.innerHeight + window.scrollY < document.body.scrollHeight - 260);
    };
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 110 }} animate={{ y: 0 }} exit={{ y: 110 }} transition={{ type: "spring", stiffness: 300, damping: 26 }} className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[480px] px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2">
          <button onClick={open} className="v2-pop v2-press flex w-full items-center justify-between rounded-[20px] bg-white p-2 pl-4 text-[#141210]">
            <span className="text-left leading-tight">
              <span className="block text-[15px] font-extrabold">₦30,000 <span className="text-xs font-semibold text-[#141210]/40 line-through">₦75,000</span></span>
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#f2643a]">Start today · we help you</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-[14px] border-2 border-[#141210] bg-[#f2643a] px-4 py-3 text-sm font-extrabold text-white">
              Join <ArrowRight className="h-4 w-4" />
            </span>
          </button>
          <WhatsAppButton compact />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
