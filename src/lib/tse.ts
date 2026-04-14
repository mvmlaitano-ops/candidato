import type { Candidato } from "@/types";
import sampleCandidates from "@/data/sample-candidates.json";

const candidates = sampleCandidates as Candidato[];

export function buscarCandidatos(nome: string): Candidato[] {
  const termo = nome.toLowerCase().trim();
  if (!termo) return candidates;
  return candidates.filter(
    (c) =>
      c.nome.toLowerCase().includes(termo) ||
      c.partido.toLowerCase().includes(termo) ||
      c.cargo.toLowerCase().includes(termo)
  );
}

export function buscarCandidatoPorId(id: string): Candidato | undefined {
  return candidates.find((c) => c.id === id);
}

export function listarCandidatos(): Candidato[] {
  return candidates;
}
