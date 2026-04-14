"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import type { Candidato } from "@/types";
import { CategoriaPatrimonio } from "@/types";
import { formatarMoeda } from "@/lib/constants";

const CORES: Record<string, string> = {
  "Imóveis": "#00D4AA",
  "Renda Fixa": "#3b82f6",
  "Renda Variável": "#a78bfa",
  "Empresas": "#f59e0b",
  "Criptomoedas": "#ec4899",
  "Outros": "#52525b",
};

function Tip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-xs shadow-xl shadow-black/30">
      <p className="text-text-3">{payload[0].name}</p>
      <p className="font-bold text-text-1 mono">{formatarMoeda(payload[0].value)}</p>
    </div>
  );
}

export default function EvolutionChart({ candidato }: { candidato: Candidato }) {
  const categorias = Object.values(CategoriaPatrimonio);
  const make = (p: typeof candidato.patrimonio2022) =>
    categorias.map((c) => ({ name: c, value: p.porCategoria[c] || 0 })).filter((d) => d.value > 0);

  const d22 = make(candidato.patrimonio2022);
  const d26 = make(candidato.patrimonio2026);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4 }}
      className="bg-surface border border-border rounded-xl p-5"
    >
      <p className="text-[10px] text-text-3 font-medium mb-4">Distribuição</p>
      <div className="grid grid-cols-2 gap-2">
        {[{ label: "2022", data: d22, opacity: 0.5 }, { label: "2026", data: d26, opacity: 1 }].map((set) => (
          <div key={set.label}>
            <p className="text-center text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">{set.label}</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={set.data} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {set.data.map((e) => (
                    <Cell key={e.name} fill={CORES[e.name] || "#52525b"} opacity={set.opacity} />
                  ))}
                </Pie>
                <Tooltip content={<Tip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
        {categorias
          .filter((c) => (candidato.patrimonio2022.porCategoria[c] || 0) > 0 || (candidato.patrimonio2026.porCategoria[c] || 0) > 0)
          .map((c) => (
            <div key={c} className="flex items-center gap-1.5 text-[10px] text-text-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CORES[c] }} />
              {c}
            </div>
          ))}
      </div>
    </motion.div>
  );
}
