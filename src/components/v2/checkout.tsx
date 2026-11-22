"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, Download, MessageCircle, Video, Lock, ShieldCheck } from "lucide-react";
import { GUARANTEE_DAYS } from "./config";

// v2 checkout: instant access, no dates/slots. Same Selar product + prefill as the original modal.
const SELAR_URL = "https://selar.com/l71r84zw4y";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useCheckout = () => useContext(Ctx);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Checkout isOpen={isOpen} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}

function Checkout({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDrop(true), 900);
    return () => {
      clearTimeout(t);
      setDrop(false);
    };
  }, [isOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    const q = new URLSearchParams({ quickcheckout: "1", email: email.trim(), fullname: name.trim(), currency: "NGN" });
    setTimeout(() => (window.location.href = `${SELAR_URL}?${q.toString()}`), 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center" onClick={onClose}>
          <div className="absolute inset-0 bg-[#141210]/50 backdrop-blur-sm" />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="v2-root relative w-full max-w-[440px] rounded-t-[30px] border-2 border-b-0 border-[#141210] bg-[#fff6e9] px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-3 sm:rounded-[30px] sm:border-b-2"
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#141210]/20" />
            <button onClick={onClose} aria-label="Close" className="v2-pop-sm absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <X className="h-4 w-4" />
            </button>

            <div className="text-center">
              <div className="inline-block rotate-[-2deg] rounded-full bg-[#a8c69f] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] v2-pop-sm">Start today</div>
              <h3 className="v2-display mt-3 text-[1.7rem] font-extrabold leading-tight">
                Get more <span className="v2-serif text-[#f2643a]">paying clients</span>
              </h3>
            </div>

            <div className="mt-3 flex h-[58px] items-center justify-center gap-3">
              <AnimatePresence mode="popLayout">
                {!drop ? (
                  <motion.span key="a" exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }} className="v2-display text-4xl font-extrabold">₦75,000</motion.span>
                ) : (
                  <motion.div key="b" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5">
                    <span className="text-base font-bold text-[#141210]/40 line-through">₦75,000</span>
                    <span className="v2-display text-[2.6rem] font-extrabold leading-none">₦30,000</span>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }} className="rotate-6 rounded-lg bg-[#ffd84d] px-2 py-1 text-[11px] font-extrabold v2-pop-sm">-60%</motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[#141210]/50">Pay once · Keep it forever</div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-bold leading-tight">
              <div className="rounded-2xl bg-[#ffd84d] p-2.5 v2-pop-sm"><Download className="mx-auto mb-1 h-4 w-4" />Video lessons</div>
              <div className="rounded-2xl bg-[#8ec5ff] p-2.5 v2-pop-sm"><MessageCircle className="mx-auto mb-1 h-4 w-4" />Your mentor</div>
              <div className="rounded-2xl bg-[#ffb8c6] p-2.5 v2-pop-sm"><Video className="mx-auto mb-1 h-4 w-4" />1-on-1 help</div>
            </div>

            <form onSubmit={submit} className="mt-4 space-y-2.5">
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" autoComplete="name"
                className="w-full rounded-2xl border-2 border-[#141210] bg-white px-4 py-3.5 text-[15px] outline-none placeholder:text-[#141210]/35 focus:shadow-[3px_3px_0_#f2643a]" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Your email (we send your access here)" autoComplete="email" inputMode="email"
                className="w-full rounded-2xl border-2 border-[#141210] bg-white px-4 py-3.5 text-[15px] outline-none placeholder:text-[#141210]/35 focus:shadow-[3px_3px_0_#f2643a]" />
              <button type="submit" disabled={loading} className="v2-pop v2-press flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f2643a] py-4 text-[16px] font-extrabold text-white disabled:opacity-70">
                {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Opening safe payment page…</>) : (<>Pay ₦30,000 and start <ArrowRight className="h-5 w-5" /></>)}
              </button>
            </form>
            {GUARANTEE_DAYS > 0 && (
              <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border-2 border-[#141210] bg-[#a8c69f] px-3 py-2 text-[12.5px] font-extrabold">
                <ShieldCheck className="h-4 w-4" /> {GUARANTEE_DAYS}-day money-back guarantee. No risk.
              </div>
            )}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#141210]/50">
              <Lock className="h-3.5 w-3.5" /> Safe payment on Selar · Card or bank transfer · Access sent to your email
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
