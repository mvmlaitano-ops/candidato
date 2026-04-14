import { NextRequest, NextResponse } from "next/server";
import { buscarCandidatos } from "@/lib/tse";

export async function GET(request: NextRequest) {
  const nome = request.nextUrl.searchParams.get("nome") || "";
  const resultados = buscarCandidatos(nome);

  const resumo = resultados.map((c) => ({
    id: c.id,
    nome: c.nome,
    partido: c.partido,
    cargo: c.cargo,
    estado: c.estado,
    patrimonio2022: c.patrimonio2022.total,
    patrimonio2026: c.patrimonio2026.total,
  }));

  return NextResponse.json(resumo);
}
