"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import type { CategoriaComparacao } from "@/types";
import { formatarMoeda } from "@/lib/constants";

interface Props {
  dados: CategoriaComparacao[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-surface-2 border border-border rounded-lg p-3 text-xs shadow-xl shadow-black/30">
      <p className="font-semibold text-text-1 mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-text-3">{p.name}</span>
          <span className="font-semibold text-text-1 mono ml-auto">{formatarMoeda(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

export default function CategoryChart({ dados }: Props) {
  const formatY = (v: number) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
    return String(v);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
      className="bg-surface border border-border rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] text-text-3 font-medium">Por categoria</p>
        <div className="flex items-center gap-3 text-[10px] text-text-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-text-3/40" /> 2022</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-accent" /> 2026</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={dados} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis dataKey="categoria" tick={{ fontSize: 10, fill: "#52525b" }} tickLine={false} axisLine={{ stroke: "#27272a" }} interval={0} angle={-15} textAnchor="end" height={55} />
          <YAxis tick={{ fontSize: 10, fill: "#52525b" }} tickFormatter={formatY} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,212,170,0.03)" }} />
          <Bar dataKey="valor2022" name="2022" fill="#52525b" radius={[4, 4, 0, 0]} barSize={16} />
          <Bar dataKey="valor2026" name="2026" fill="#00D4AA" radius={[4, 4, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
