"use client";

import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useCheckout } from "./checkout";
import { PROGRAM, naira, waLink, GUARANTEE_DAYS } from "./config";

// The main action everywhere: one big, obvious tap target.
export function JoinButton({ label = "Join the program", sub = true, className = "" }: { label?: string; sub?: boolean; className?: string }) {
  const { open } = useCheckout();
  return (
    <div className={className}>
      <motion.button
        onClick={open}
        whileTap={{ scale: 0.97 }}
        className="v2-pop v2-press group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[20px] bg-[#f2643a] px-5 py-[14px] font-extrabold text-white"
      >
        <span className="pointer-events-none absolute inset-0 animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <span className="relative flex flex-col items-center leading-tight">
          <span className="flex items-center gap-2 text-[18px]">
            {label} <ArrowRight className="h-5 w-5 transition-transform group-active:translate-x-1" />
          </span>
          <span className="mt-0.5 text-[12.5px] font-bold text-white/90">Only {naira(PROGRAM.price)} · start today</span>
        </span>
      </motion.button>
      {sub && (
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12.5px] font-semibold text-[#141210]/60">
          <span>Normal price</span> <span className="text-[#141210]/40 line-through">{naira(PROGRAM.regular)}</span>
          <span className="rotate-[-3deg] rounded-md border-2 border-[#141210] bg-[#ffd84d] px-1.5 text-[10px] font-extrabold text-[#141210]">-60%</span>
          <span>· pay once, keep forever</span>
        </div>
      )}
      {sub && GUARANTEE_DAYS > 0 && (
        <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[12.5px] font-extrabold text-[#1f7a5a]">
          <ShieldCheck className="h-4 w-4" /> {GUARANTEE_DAYS}-day money-back guarantee
        </div>
      )}
    </div>
  );
}

// Only renders when a WhatsApp number is set in config.ts
export function WhatsAppButton({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const href = waLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`v2-pop-sm v2-press flex items-center justify-center gap-2 rounded-[16px] bg-[#25D366] font-extrabold text-[#141210] ${compact ? "h-[52px] w-[52px] shrink-0" : "w-full px-4 py-3 text-[14.5px]"} ${className}`}
      aria-label="Ask a question on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      {!compact && "Ask a question on WhatsApp"}
    </a>
  );
}
