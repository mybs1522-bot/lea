"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CreditCard, Mail, MessageCircle, PlayCircle, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { JoinButton } from "./cta";
import { GUARANTEE_DAYS, MENTOR } from "./config";

/* ---------------- what's inside the program (modules + phone mockup) ---------------- */
const MODULES = [
  ["Make your Instagram look professional", "So clients trust you at first look"],
  ["Post your work the right way", "So people message you, not just like"],
  ["Find people who want a designer", "In Lagos, Abuja and abroad"],
  ["Get clients without paying for ads", "Free methods that work"],
  ["Use small ads the smart way", "Only if you want to"],
  ["What to say to clients", "So they say yes and pay you"],
  ["Bonus: bigger clients in Lagos & Abuja", "Charge more for your work"],
];

export function Inside() {
  return (
    <section className="px-5 py-16">
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f2643a]">What you will learn</div>
        <h2 className="v2-display mt-3 text-[2.1rem] font-extrabold leading-[0.98]">
          Easy videos, <span className="v2-serif v2-mark [--mark:#ffd84d]">step by step</span>
        </h2>
        <p className="mx-auto mt-2 max-w-[310px] text-[14px] text-[#141210]/60">Short videos. Watch on your phone. Do one step, then the next. Your mentor helps you.</p>
      </div>
      <div className="relative mx-auto mt-8 max-w-[360px]">
        <div className="v2-arch v2-pop relative aspect-[4/3.4] overflow-hidden">
          <Image src="/v2/learn.webp" alt="A Nigerian architect watching a lesson on his phone" fill sizes="360px" className="object-cover" />
        </div>
        <div className="v2-wobble v2-pop-sm absolute -left-1 top-6 rounded-full bg-[#ffd84d] px-3 py-1.5 text-[12px] font-extrabold" style={{ ["--r" as string]: "-6deg" }}>Learn anywhere 📱</div>
      </div>
      <div className="mx-auto -mt-10 max-w-[330px]">
        <div className="v2-pop relative rounded-[42px] bg-[#141210] p-2.5">
          <div className="overflow-hidden rounded-[34px] bg-[#fff6e9]">
            <div className="flex items-center justify-between px-5 pb-2 pt-3 text-[11px] font-bold">
              <span>9:41</span>
              <span className="h-5 w-20 rounded-full bg-[#141210]" />
              <span>100%</span>
            </div>
            <div className="px-4 pb-4">
              <div className="rounded-2xl bg-[#f2643a] p-3.5 text-white">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/80">Your program</div>
                <div className="v2-display text-[1.15rem] font-extrabold leading-tight">The Client Engine</div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/30">
                  <motion.div initial={{ width: "8%" }} whileInView={{ width: "43%" }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full rounded-full bg-[#ffd84d]" />
                </div>
                <div className="mt-1 text-[10px] font-bold text-white/85">3 of 7 modules done</div>
              </div>
              <div className="mt-3 space-y-2">
                {MODULES.map(([t, d], i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 rounded-2xl border-2 border-[#141210] bg-white p-2.5"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-[#141210] text-[12px] font-extrabold ${i < 3 ? "bg-[#a8c69f]" : i === 3 ? "bg-[#ffd84d]" : "bg-[#fff6e9]"}`}>
                      {i < 3 ? <CheckCircle2 className="h-4 w-4" /> : i === 3 ? <PlayCircle className="h-4 w-4" /> : i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-extrabold leading-tight">{t}</div>
                      <div className="truncate text-[11px] text-[#141210]/55">{d}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-[11px] font-semibold text-[#141210]/45">Program preview</div>
      </div>
    </section>
  );
}

/* ---------------- what happens after you pay: the handhold ---------------- */
const AFTER = [
  { icon: CreditCard, c: "#ffd84d", t: "Pay ₦30,000", d: "Use your card or a bank transfer. It is safe." },
  { icon: Mail, c: "#8ec5ff", t: "Check your email", d: "Your access is there right away." },
  { icon: MessageCircle, c: "#a8c69f", t: "Say hi to your mentor", d: "On WhatsApp. Your mentor guides you." },
  { icon: PlayCircle, c: "#ffb8c6", t: "Start today", d: "Stuck? Get 1-on-1 help. We fix it with you." },
];
export function AfterPay() {
  return (
    <section className="px-5 py-16">
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f2643a]">Easy as 1, 2, 3, 4</div>
        <h2 className="v2-display mt-3 text-[2.1rem] font-extrabold leading-[0.98]">
          What happens <span className="v2-serif v2-mark [--mark:#8ec5ff]">after you pay</span>
        </h2>
      </div>
      <div className="relative mx-auto mt-8 max-w-[380px]">
        <div className="absolute bottom-6 left-[27px] top-6 w-0.5 border-l-2 border-dashed border-[#141210]/30" />
        <div className="space-y-4">
          {AFTER.map((a, i) => (
            <motion.div key={a.t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative flex items-start gap-4">
              <div className="v2-pop-sm relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: a.c }}>
                <a.icon className="h-6 w-6" />
              </div>
              <div className="pt-1">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#141210]/45">Step {i + 1}</div>
                <div className="v2-display text-[1.15rem] font-extrabold leading-tight">{a.t}</div>
                <div className="text-[13.5px] text-[#141210]/65">{a.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- readable testimonials: swipe sideways, no auto-scroll ---------------- */
const STORIES = [
  ["From 2 inquiries per month to 8-10 quality leads per week. My revenue tripled in 2 months.", "Amara Eze", "Interior Designer · Port Harcourt", "#ffb8c6", "Revenue tripled in 2 months"],
  ["I was charging ₦400K per room. Now my starting rate is $3,500 (about ₦5.6M). Same SketchUp file, different client.", "Aisha Mohammed", "Interior Designer · Kano", "#ffffff", "₦400K → ₦5.6M per room"],
  ["I took 3 courses before. None worked. This isn't a course, it's a machine. First $8K project (₦12.8M) in week 2.", "David Okonkwo", "Architect · Lagos", "#c9b6ff", "₦12.8M project in week 2"],
  ["I got my first US client within 10 days. A homeowner in Houston signed a $12,000 contract. That's over ₦19M from one project.", "Chidi Okafor", "Interior Designer · Lagos", "#ffd84d", "₦19M from one project"],
  ["Landed 2 projects from the UK worth £18K (about ₦36M) combined in 3 weeks. This system no be beans!", "Emeka Nwosu", "Architect · Abuja", "#8ec5ff", "₦36M in 3 weeks"],
  ["Set everything up on Saturday. By Wednesday, 3 DMs from Dubai clients. Signed one for $22K (₦35M).", "Ngozi Obi", "Residential Designer", "#a8c69f", "₦35M from Dubai"],
];
export function Stories() {
  return (
    <section className="py-16">
      <div className="px-5">
        <div className="relative mx-auto max-w-[360px]">
          <div className="v2-arch v2-pop relative aspect-[1/0.7] overflow-hidden">
            <Image src="/v2/lagos-living.webp" alt="A finished luxury living room in a Lagos apartment" fill sizes="360px" className="object-cover" />
          </div>
          <div className="v2-pop absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-[-2deg] whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-center">
            <div className="v2-display text-[1.7rem] font-extrabold leading-none text-[#f2643a]">₦380M+</div>
            <div className="text-[11px] font-bold">earned by Nigerian members</div>
          </div>
        </div>
        <h2 className="v2-display mt-12 text-center text-[1.9rem] font-extrabold leading-[1]">
          They did it. <span className="v2-serif">You can too.</span>
        </h2>
        <p className="mt-1 text-center text-[12.5px] font-semibold text-[#141210]/50">Swipe → to read more</p>
      </div>
      <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {STORIES.map((s) => (
          <div key={s[1]} className="v2-pop flex w-[78%] shrink-0 snap-center flex-col justify-between rounded-[24px] p-5" style={{ background: s[3] }}>
            <div>
              <div className="inline-block rounded-full border-2 border-[#141210] bg-white px-2.5 py-0.5 text-[11px] font-extrabold">{s[4]}</div>
              <p className="mt-3 text-[15px] font-semibold leading-snug">&ldquo;{s[0]}&rdquo;</p>
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#141210] bg-white text-[12px] font-extrabold">
                {s[1].split(" ").map((x) => x[0]).join("")}
              </div>
              <div>
                <div className="text-[14px] font-extrabold leading-tight">{s[1]}</div>
                <div className="text-[11.5px] text-[#141210]/60">{s[2]} · ★★★★★</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="px-5 text-center text-[11px] text-[#141210]/45">Stories shared by members. Results depend on your work and how well you follow the steps.</p>
    </section>
  );
}

/* ---------------- meet your mentor (shows only when MENTOR is set in config.ts) ---------------- */
export function Mentor() {
  if (!MENTOR) return null;
  return (
    <section className="px-5 py-16">
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f2643a]">Meet your mentor</div>
        <h2 className="v2-display mt-3 text-[2.1rem] font-extrabold leading-[0.98]">
          A real person <span className="v2-serif">holding your hand</span>
        </h2>
      </div>
      <div className="v2-pop mx-auto mt-8 max-w-[360px] overflow-hidden rounded-[28px] bg-white">
        <div className="v2-arch relative mx-auto mt-5 aspect-square w-[58%] overflow-hidden border-2 border-[#141210] bg-gradient-to-br from-[#ffd84d] via-[#ffb8c6] to-[#c9b6ff]">
          {MENTOR.photo ? (
            <Image src={MENTOR.photo} alt={MENTOR.name} fill sizes="220px" className="object-cover object-[50%_20%]" />
          ) : (
            <div className="v2-display flex h-full w-full items-center justify-center text-[4.5rem] font-extrabold text-[#141210]">
              {MENTOR.name.split(" ").map((x) => x[0]).join("")}
            </div>
          )}
        </div>
        <div className="p-5 text-center">
          <div className="v2-display text-[1.5rem] font-extrabold">{MENTOR.name}</div>
          <div className="text-[13px] font-semibold text-[#141210]/55">{MENTOR.role}</div>
          <p className="mt-3 text-[14.5px] leading-relaxed">&ldquo;{MENTOR.bio}&rdquo;</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {MENTOR.proof.map((p) => (
              <span key={p} className="rounded-full border-2 border-[#141210] bg-[#ffd84d] px-3 py-1 text-[12px] font-extrabold">{p}</span>
            ))}
          </div>
          {MENTOR.ledBy && <div className="mt-4 border-t-2 border-dashed border-[#141210]/15 pt-3 text-[12.5px] font-semibold text-[#141210]/60">{MENTOR.ledBy}</div>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- guarantee (shows only when GUARANTEE_DAYS > 0) ---------------- */
export function Guarantee() {
  if (!GUARANTEE_DAYS) return null;
  return (
    <div className="v2-pop mx-auto mt-6 flex max-w-[380px] items-center gap-4 rounded-[24px] bg-[#a8c69f] p-5">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#141210] bg-white">
        <ShieldCheck className="h-9 w-9" />
        <span className="absolute -bottom-2 rounded-full border-2 border-[#141210] bg-[#ffd84d] px-2 text-[11px] font-extrabold">{GUARANTEE_DAYS} days</span>
      </div>
      <div>
        <div className="v2-display text-[1.2rem] font-extrabold leading-tight">{GUARANTEE_DAYS}-day money-back guarantee</div>
        <div className="mt-1 text-[13px]">Join, look inside, and if it&apos;s not for you, ask for a full refund within {GUARANTEE_DAYS} days.</div>
      </div>
    </div>
  );
}

/* ---------------- payment trust under CTAs ---------------- */
export function PayTrust() {
  return (
    <div className="mt-3 text-center">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {["Visa", "Mastercard", "Verve", "Bank transfer"].map((m) => (
          <span key={m} className="rounded-md border-2 border-[#141210] bg-white px-2 py-0.5 text-[10.5px] font-extrabold">{m}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-[#141210]/60">
        <Lock className="h-3.5 w-3.5" /> Safe payment, processed by Selar
      </div>
    </div>
  );
}

export function MidCTA({ label = "Yes, I want more clients" }: { label?: string }) {
  return (
    <div className="mx-auto max-w-[380px] px-5">
      <JoinButton label={label} />
    </div>
  );
}
