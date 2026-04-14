"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface CandidatoResumo {
  id: string;
  nome: string;
  partido: string;
  cargo: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<CandidatoResumo[]>([]);
  const [aberto, setAberto] = useState(false);
  const router = useRouter();

  const buscar = async (termo: string) => {
    setQuery(termo);
    if (termo.length < 2) {
      setResultados([]);
      setAberto(false);
      return;
    }
    try {
      const res = await fetch(`/api/candidatos?nome=${encodeURIComponent(termo)}`);
      const data = await res.json();
      setResultados(data);
      setAberto(true);
    } catch {
      setResultados([]);
    }
  };

  const selecionar = (id: string) => {
    setAberto(false);
    setQuery("");
    router.push(`/candidato/${id}`);
  };

  return (
    <div className="relative w-full">
      <div className="relative bg-surface border border-border rounded-xl focus-within:border-accent/30 transition-colors">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => buscar(e.target.value)}
          onFocus={() => resultados.length > 0 && setAberto(true)}
          onBlur={() => setTimeout(() => setAberto(false), 200)}
          placeholder="Buscar candidato..."
          className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-text-1 placeholder:text-text-3 focus:outline-none rounded-xl"
        />
      </div>

      <AnimatePresence>
        {aberto && resultados.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-surface border border-border rounded-xl overflow-hidden z-40 shadow-2xl shadow-black/40"
          >
            {resultados.map((c) => (
              <button
                key={c.id}
                onClick={() => selecionar(c.id)}
                className="w-full text-left px-4 py-3 hover:bg-surface-2 transition-colors flex items-center gap-3 border-b border-border/50 last:border-b-0"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-semibold text-accent">
                    {c.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-text-1">{c.nome}</span>
                  <span className="block text-[10px] text-text-3 mt-0.5">{c.partido} &middot; {c.cargo}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
