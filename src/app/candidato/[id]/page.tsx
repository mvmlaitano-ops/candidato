import { notFound } from "next/navigation";
import Link from "next/link";
import { buscarCandidatoPorId, listarCandidatos } from "@/lib/tse";
import { calcularComparacao, calcularComparacaoPorCategoria } from "@/lib/calculations";
import PatrimonyCard from "@/app/components/PatrimonyCard";
import ComparisonCards from "@/app/components/ComparisonCards";
import CategoryChart from "@/app/components/CategoryChart";
import EvolutionChart from "@/app/components/EvolutionChart";
import AssetTable from "@/app/components/AssetTable";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return listarCandidatos().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const c = buscarCandidatoPorId(id);
  if (!c) return { title: "Candidato não encontrado" };
  return {
    title: `${c.nome} — Patrimônio | Candidatto`,
    description: `Evolução patrimonial de ${c.nome} (${c.partido}) entre 2022 e 2026.`,
  };
}

export default async function CandidatoPage({ params }: Props) {
  const { id } = await params;
  const candidato = buscarCandidatoPorId(id);
  if (!candidato) notFound();

  const comparacao = calcularComparacao(candidato);
  const dadosCategorias = calcularComparacaoPorCategoria(candidato);

  return (
    <div className="pt-12">
      <div className="max-w-3xl mx-auto px-5 py-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-text-3 hover:text-accent transition-colors mb-8 group"
        >
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-accent">
              {candidato.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-text-1 tracking-tight">
              {candidato.nome}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded-md">
                {candidato.partido}
              </span>
              <span className="text-xs text-text-3">{candidato.cargo} &middot; {candidato.estado}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5">
          <PatrimonyCard
            total2022={candidato.patrimonio2022.total}
            total2026={candidato.patrimonio2026.total}
            comparacao={comparacao}
          />
          <ComparisonCards comparacao={comparacao} />
          <CategoryChart dados={dadosCategorias} />
          <EvolutionChart candidato={candidato} />
          <AssetTable candidato={candidato} />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-accent/[0.04] border border-accent/10 rounded-lg px-4 py-3 text-center">
          <p className="text-[10px] text-text-3">
            2022: declarações TSE &middot; 2026: <span className="text-accent/70">simulado</span> &middot;{" "}
            <a href="https://divulgacandcontas.tse.jus.br" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-accent transition-colors">
              tse.jus.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
