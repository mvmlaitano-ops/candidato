import Link from "next/link";
import SearchBar from "./components/SearchBar";
import AnimatedHome from "./components/AnimatedHome";
import HeroVideo from "./components/HeroVideo";
import WordRotator from "./components/WordRotator";
import { listarCandidatos } from "@/lib/tse";
import { formatarMoeda, formatarPercentual } from "@/lib/constants";

export default function Home() {
  const candidatos = listarCandidatos();

  return (
    <div className="pt-12">
      {/* Ticker */}
      <div className="border-b border-border bg-surface overflow-hidden">
        <div className="ticker-track py-1.5">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center shrink-0 gap-6 px-3">
              {candidatos.map((c) => {
                const variacao = c.patrimonio2022.total > 0
                  ? ((c.patrimonio2026.total - c.patrimonio2022.total) / c.patrimonio2022.total) * 100
                  : 0;
                return (
                  <div key={`${set}-${c.id}`} className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-semibold text-text-2">{c.nome.split(" ")[0].toUpperCase()}</span>
                    <span className="text-[10px] font-semibold text-text-1 mono">{formatarMoeda(c.patrimonio2026.total)}</span>
                    <span className={`text-[10px] font-bold mono ${variacao >= 0 ? "change-up" : "change-down"}`}>
                      {formatarPercentual(variacao)}
                    </span>
                    <span className="text-text-3 mx-1">&middot;</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-5 pt-16 pb-12">
        <HeroVideo />
        <AnimatedHome>
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="live-dot" />
              <span className="text-[11px] text-text-3 font-medium">Dados públicos &middot; TSE</span>
            </div>

            <h1 className="text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold leading-[1.15] tracking-tight mb-8">
              Quanto <WordRotator /> seu candidato fez nos últimos 4 anos?
            </h1>

            <div className="max-w-md">
              <SearchBar />
            </div>
          </div>
        </AnimatedHome>
      </section>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-5 mb-8">
        <div className="bg-accent/[0.04] border border-accent/10 rounded-lg px-4 py-2.5 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-[11px] text-text-2">
            Dados de 2022 do TSE. Valores de 2026 são <span className="text-accent font-medium">simulados</span> para demonstração.
          </p>
        </div>
      </div>

      {/* Instruments grid */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-text-2">Candidatos</h2>
          <span className="text-[10px] text-text-3 mono">{candidatos.length} ativos</span>
        </div>

        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
          {candidatos.map((c) => {
            const aumento = c.patrimonio2026.total - c.patrimonio2022.total;
            const variacao = c.patrimonio2022.total > 0
              ? (aumento / c.patrimonio2022.total) * 100
              : 0;

            return (
              <Link
                key={c.id}
                href={`/candidato/${c.id}`}
                className="instrument flex items-center gap-4 px-5 py-4 bg-surface"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-accent">
                    {c.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </span>
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-1 truncate">{c.nome}</p>
                  <p className="text-[10px] text-text-3 mt-0.5">{c.partido} &middot; {c.cargo}</p>
                </div>

                {/* Mini chart placeholder */}
                <div className="hidden sm:flex items-end gap-px h-6 mr-4">
                  {[0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.75, 1].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-sm bg-accent/30"
                      style={{ height: `${h * 24}px` }}
                    />
                  ))}
                </div>

                {/* Values */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-text-1 mono">
                    {formatarMoeda(c.patrimonio2026.total)}
                  </p>
                  <p className={`text-xs font-bold mono ${variacao >= 0 ? "change-up" : "change-down"}`}>
                    {formatarPercentual(variacao)}
                  </p>
                </div>

                {/* Arrow */}
                <svg className="w-4 h-4 text-text-3 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <h2 className="text-sm font-semibold text-text-2 mb-8">Como funciona</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Dados do TSE",
                desc: "Todo candidato declara seus bens ao Tribunal Superior Eleitoral.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                ),
                title: "Comparação visual",
                desc: "Evolução por categoria — imóveis, renda fixa, empresas e mais.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Linguagem real",
                desc: "Valores traduzidos em salários mínimos e carros populares.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-surface border border-border rounded-xl p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center text-accent mb-4">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-text-1 mb-1.5">{item.title}</p>
                <p className="text-xs text-text-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
