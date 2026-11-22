"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Lock, Sparkles } from "lucide-react";
import { useCheckout } from "./checkout";
import { PROGRAM, naira } from "./config";

// 3 taps → a personal client plan. Every tap is a small "yes"; the plan makes the program feel made for them.
type Opt = { id: string; e: string; t: string; c: string };
const QS: { q: string; opts: Opt[] }[] = [
  {
    q: "How many new clients do you get in a month?",
    opts: [
      { id: "low", e: "😩", t: "0–1 clients", c: "#ffb8c6" },
      { id: "mid", e: "😐", t: "2–3 clients", c: "#ffd84d" },
      { id: "high", e: "🙂", t: "4 or more", c: "#a8c69f" },
    ],
  },
  {
    q: "Where do your clients come from now?",
    opts: [
      { id: "friends", e: "🤝", t: "Friends & referrals", c: "#8ec5ff" },
      { id: "posts", e: "📱", t: "My Instagram posts", c: "#ffb8c6" },
      { id: "boost", e: "💸", t: "Paid boosts", c: "#ffd84d" },
      { id: "none", e: "🤷", t: "Nowhere yet", c: "#c9b6ff" },
    ],
  },
  {
    q: "How much do you want from one project?",
    opts: [
      { id: "500k", e: "💵", t: "₦500,000", c: "#a8c69f" },
      { id: "1m", e: "💰", t: "₦1,000,000", c: "#ffd84d" },
      { id: "5m", e: "🏆", t: "₦5,000,000+", c: "#f2643a" },
    ],
  },
];

const FIX: Record<string, string> = {
  friends: "Stop waiting for friends to send clients. Get strangers who need a designer to message you.",
  posts: "Turn your likes into messages. Post your work the right way so people ask for your price.",
  boost: "Stop wasting money on boosts. Use the free methods that bring real clients.",
  none: "Start from zero the easy way. Make your Instagram look professional so clients trust you.",
};
const GOAL: Record<string, string> = {
  "500k": "₦500,000",
  "1m": "₦1,000,000",
  "5m": "₦5,000,000+",
};
const NOW: Record<string, number> = { low: 0.12, mid: 0.3, high: 0.5 };

function Confetti() {
  const bits = Array.from({ length: 28 });
  const cols = ["#f2643a", "#ffd84d", "#8ec5ff", "#a8c69f", "#ffb8c6", "#c9b6ff"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((_, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: Math.cos(i * 1.7) * (120 + (i % 5) * 30), y: Math.sin(i * 1.7) * (90 + (i % 4) * 30) + 160, opacity: 0, rotate: i * 47 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-1/2 top-16 h-2.5 w-1.5 rounded-sm"
          style={{ background: cols[i % cols.length] }}
        />
      ))}
    </div>
  );
}

export function PlanQuiz() {
  const { open } = useCheckout();
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<string[]>([]);
  const done = step >= QS.length;
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (done) box.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  const pick = (id: string) => {
    const next = [...ans.slice(0, step), id];
    setAns(next);
    setTimeout(() => setStep((s) => s + 1), 260);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const [clients, source, goal] = ans;
  const now = NOW[clients] ?? 0.2;

  return (
    <section id="v2-quiz" className="relative px-5 py-16">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#141210] bg-[#ffd84d] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.1em]">
          <Sparkles className="h-3.5 w-3.5" /> Free · 3 taps
        </div>
        <h2 className="v2-display mt-4 text-[2.2rem] font-extrabold leading-[0.98]">
          Get your free <span className="v2-serif v2-mark [--mark:#8ec5ff]">client plan</span>
        </h2>
        <p className="mt-2 text-[15px] font-semibold text-[#141210]/65">Answer 3 quick questions. See exactly what to fix.</p>
      </div>

      <div ref={box} className="v2-pop relative mx-auto mt-7 max-w-[400px] scroll-mt-4 overflow-hidden rounded-[28px] bg-white p-5">
        {/* progress */}
        <div className="flex items-center gap-3">
          {step > 0 && !done ? (
            <button onClick={back} aria-label="Back" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#141210]">
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : null}
          <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-[#141210] bg-[#fff6e9]">
            <motion.div animate={{ width: `${(Math.min(step, QS.length) / QS.length) * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="h-full bg-[#f2643a]" />
          </div>
          <div className="shrink-0 text-[12px] font-extrabold">{done ? "Done ✓" : `${step + 1} of ${QS.length}`}</div>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
              <div className="v2-display mt-5 text-[1.45rem] font-extrabold leading-tight">{QS[step].q}</div>
              <div className={`mt-4 grid gap-3 ${QS[step].opts.length === 4 ? "grid-cols-2" : "grid-cols-1"}`}>
                {QS[step].opts.map((o) => {
                  const sel = ans[step] === o.id;
                  return (
                    <motion.button
                      key={o.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => pick(o.id)}
                      className={`v2-press flex items-center gap-3 rounded-2xl border-2 border-[#141210] p-3.5 text-left text-[16px] font-extrabold ${sel ? "shadow-[1px_1px_0_#141210]" : "shadow-[4px_4px_0_#141210]"} ${QS[step].opts.length === 4 ? "flex-col items-start" : ""}`}
                      style={{ background: o.c }}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#141210] bg-white text-2xl">{o.e}</span>
                      <span className="flex-1">{o.t}</span>
                      {sel && <Check className="h-5 w-5" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="plan" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 20 }} className="relative">
              <Confetti />
              <div className="mt-4 text-center">
                <div className="text-4xl">🎉</div>
                <div className="v2-display mt-1 text-[1.6rem] font-extrabold leading-tight">Your client plan is ready</div>
              </div>

              {/* now → goal gauge */}
              <div className="mt-5 rounded-2xl border-2 border-[#141210] bg-[#fff6e9] p-4">
                <div className="flex justify-between text-[11px] font-extrabold uppercase tracking-[0.08em]">
                  <span>You now</span>
                  <span className="text-[#f2643a]">Your goal: {GOAL[goal]} / project</span>
                </div>
                <div className="relative mt-2 h-5 overflow-hidden rounded-full border-2 border-[#141210] bg-white">
                  <motion.div
                    initial={{ width: `${now * 100}%` }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(45deg,#a8c69f_0_8px,#8fb586_8px_16px)]"
                  />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${now * 100}%` }} transition={{ duration: 0.8 }} className="absolute inset-y-0 left-0 border-r-2 border-[#141210] bg-[#ffb8c6]" />
                </div>
                <div className="relative mt-1 h-4 text-[10px] font-extrabold">
                  <span className="absolute -translate-x-1/2" style={{ left: `${Math.max(8, now * 100)}%` }}>▲ you</span>
                  <span className="absolute right-0">goal ▲</span>
                </div>
                <div className="mt-1.5 text-center text-[12px] font-bold text-[#141210]/60">The program closes this gap, step by step</div>
              </div>

              {/* personal steps */}
              <div className="mt-4 space-y-2.5">
                {[
                  { t: "Your #1 fix", d: FIX[source] },
                  { t: "Your next step", d: "Get people in Lagos, Abuja and abroad who need a designer to find you, without paying for ads." },
                  { t: "Your money step", d: `Learn what to say so clients agree to pay ${GOAL[goal]} for a project.` },
                ].map((x, i) => (
                  <motion.div key={x.t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }} className="flex gap-3 rounded-2xl border-2 border-[#141210] p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#141210] bg-[#ffd84d] text-[13px] font-extrabold">{i + 1}</div>
                    <div>
                      <div className="text-[13px] font-extrabold text-[#f2643a]">{x.t}</div>
                      <div className="text-[14px] font-semibold leading-snug">{x.d}</div>
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-[#141210]/30 p-3 text-[13px] font-bold text-[#141210]/55">
                  <Lock className="h-4 w-4 shrink-0" /> The full step-by-step videos + your mentor are inside the program
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={open}
                className="v2-pop v2-press relative mt-5 flex w-full flex-col items-center overflow-hidden rounded-[20px] bg-[#f2643a] px-5 py-[14px] font-extrabold text-white"
              >
                <span className="pointer-events-none absolute inset-0 animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative text-[18px]">Unlock my full plan →</span>
                <span className="relative text-[12.5px] font-bold text-white/90">Only {naira(PROGRAM.price)} · start today</span>
              </motion.button>
              <button onClick={() => { setAns([]); setStep(0); }} className="mt-3 w-full text-center text-[12px] font-semibold text-[#141210]/45 underline underline-offset-2">
                Start again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
