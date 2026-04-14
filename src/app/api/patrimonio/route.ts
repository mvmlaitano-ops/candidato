import { NextRequest, NextResponse } from "next/server";
import { buscarCandidatoPorId } from "@/lib/tse";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Parâmetro 'id' é obrigatório" }, { status: 400 });
  }

  const candidato = buscarCandidatoPorId(id);

  if (!candidato) {
    return NextResponse.json({ error: "Candidato não encontrado" }, { status: 404 });
  }

  return NextResponse.json(candidato);
}
