"use client";

import { motion } from "framer-motion";
import type { Comparacao } from "@/types";
import { formatarMoeda, formatarNumero, SALARIO_MINIMO_2026, CARRO_POPULAR_2026 } from "@/lib/constants";

interface Props {
  comparacao: Comparacao;
}

export default function ComparisonCards({ comparacao }: Props) {
  if (comparacao.aumentoTotal <= 0) return null;

  const items = [
    {
      value: formatarNumero(comparacao.emSalariosMinimos),
      label: "salarios minimos",
      detail: `Equivale a ${formatarNumero(comparacao.emSalariosMinimos)}x o SM de ${formatarMoeda(SALARIO_MINIMO_2026)}`,
    },
    {
      value: formatarNumero(comparacao.emCarrosPopulares),
      label: "carros populares",
      detail: `${formatarNumero(comparacao.emCarrosPopulares)} Renault Kwid de ${formatarMoeda(CARRO_POPULAR_2026)}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
    >
      <p className="text-[10px] text-text-3 font-medium mb-3">Equivalente a</p>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="bg-surface border border-border rounded-xl p-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-accent mono tracking-tight leading-none">
              {item.value}
            </p>
            <p className="text-[11px] font-semibold text-text-2 mt-1.5 uppercase tracking-wider">
              {item.label}
            </p>
            <p className="text-[10px] text-text-3 mt-2 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
