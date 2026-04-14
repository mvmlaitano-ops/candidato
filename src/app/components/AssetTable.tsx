"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Candidato } from "@/types";
import { formatarMoeda } from "@/lib/constants";

const CORES: Record<string, string> = {
  "Imóveis": "#00D4AA",
  "Renda Fixa": "#3b82f6",
  "Renda Variável": "#a78bfa",
  "Empresas": "#f59e0b",
  "Criptomoedas": "#ec4899",
  "Outros": "#52525b",
};

export default function AssetTable({ candidato }: { candidato: Candidato }) {
  const [ano, setAno] = useState<2022 | 2026>(2026);
  const p = ano === 2022 ? candidato.patrimonio2022 : candidato.patrimonio2026;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.5 }}
      className="bg-surface border border-border rounded-xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <p className="text-[10px] text-text-3 font-medium">Bens declarados</p>
        <div className="flex bg-surface-2 rounded-lg p-0.5 border border-border">
          {([2022, 2026] as const).map((y) => (
            <button
              key={y}
              onClick={() => setAno(y)}
              className={`px-3 py-1 text-[10px] font-semibold rounded-md transition-all ${
                ano === y ? "bg-accent text-bg" : "text-text-3 hover:text-text-1"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border/50">
        {p.bens.map((bem, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-surface-2/50 transition-colors">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: CORES[bem.categoria] || "#52525b" }} />
              <div className="min-w-0">
                <p className="text-sm text-text-1 truncate">{bem.descricao}</p>
                <p className="text-[9px] text-text-3 uppercase tracking-wider">{bem.categoria}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-text-1 mono ml-3 shrink-0">
              {formatarMoeda(bem.valor)}
            </p>
          </div>
        ))}
      </div>

      <div className="px-5 py-3.5 border-t border-border flex justify-between items-center bg-surface-2/30">
        <span className="text-[10px] text-text-3 font-medium uppercase tracking-wider">Total</span>
        <span className="text-lg font-extrabold text-accent mono tracking-tight">
          {formatarMoeda(p.total)}
        </span>
      </div>
    </motion.div>
  );
}
