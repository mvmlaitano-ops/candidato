import type { Candidato, Comparacao, CategoriaComparacao } from "@/types";
import { SALARIO_MINIMO_2026, CARRO_POPULAR_2026 } from "./constants";
import { CategoriaPatrimonio } from "@/types";

export function calcularComparacao(candidato: Candidato): Comparacao {
  const total2022 = candidato.patrimonio2022.total;
  const total2026 = candidato.patrimonio2026.total;
  const aumentoTotal = total2026 - total2022;
  const variacaoPercentual = total2022 > 0 ? ((aumentoTotal / total2022) * 100) : 0;

  return {
    aumentoTotal,
    variacaoPercentual,
    emSalariosMinimos: Math.round(aumentoTotal / SALARIO_MINIMO_2026),
    emCarrosPopulares: Math.round((aumentoTotal / CARRO_POPULAR_2026) * 10) / 10,
  };
}

export function calcularComparacaoPorCategoria(candidato: Candidato): CategoriaComparacao[] {
  const categorias = Object.values(CategoriaPatrimonio);

  return categorias.map((cat) => {
    const valor2022 = candidato.patrimonio2022.porCategoria[cat] || 0;
    const valor2026 = candidato.patrimonio2026.porCategoria[cat] || 0;
    const variacao = valor2022 > 0 ? ((valor2026 - valor2022) / valor2022) * 100 : 0;

    return { categoria: cat, valor2022, valor2026, variacao };
  }).filter((item) => item.valor2022 > 0 || item.valor2026 > 0);
}
