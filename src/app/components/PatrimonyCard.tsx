"use client";

import { motion } from "framer-motion";
import type { Comparacao } from "@/types";
import { formatarMoeda, formatarPercentual } from "@/lib/constants";

interface Props {
  total2022: number;
  total2026: number;
  comparacao: Comparacao;
}

export default function PatrimonyCard({ total2022, total2026, comparacao }: Props) {
  const aumentou = comparacao.aumentoTotal >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="bg-surface border border-border rounded-xl overflow-hidden"
    >
      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="p-5">
          <p className="text-[10px] text-text-3 font-medium mb-2">2022</p>
          <p className="text-xl sm:text-2xl font-extrabold text-text-2 mono tracking-tight">
            {formatarMoeda(total2022)}
          </p>
        </div>
        <div className="p-5">
          <p className="text-[10px] text-text-3 font-medium mb-2">2026 <span className="text-accent/50">sim.</span></p>
          <p className="text-xl sm:text-2xl font-extrabold text-text-1 mono tracking-tight">
            {formatarMoeda(total2026)}
          </p>
        </div>
      </div>

      <div className="glow-line" />

      <div className="px-5 py-4 flex items-center justify-between bg-surface-2/50">
        <div>
          <p className="text-[10px] text-text-3 font-medium mb-1">Variação</p>
          <p className={`text-lg font-extrabold mono ${aumentou ? "change-up" : "change-down"}`}>
            {aumentou ? "+" : ""}{formatarMoeda(comparacao.aumentoTotal)}
          </p>
        </div>
        <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold mono ${
          aumentou ? "bg-up/10 text-up" : "bg-down/10 text-down"
        }`}>
          <svg className={`w-3 h-3 ${aumentou ? "" : "rotate-180"}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {formatarPercentual(comparacao.variacaoPercentual)}
        </div>
      </div>
    </motion.div>
  );
}
