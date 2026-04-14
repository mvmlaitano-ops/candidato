export const SALARIO_MINIMO_2026 = 1621;
export const CARRO_POPULAR_2026 = 78690; // Renault Kwid 1.0

export const CORES_CATEGORIAS: Record<string, string> = {
  "Imóveis": "#2563eb",
  "Renda Fixa": "#16a34a",
  "Renda Variável": "#eab308",
  "Empresas": "#9333ea",
  "Criptomoedas": "#f97316",
  "Outros": "#6b7280",
};

export const CORES_COMPARACAO = {
  ano2022: "#94a3b8",
  ano2026: "#2563eb",
};

export const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatarPercentual = (valor: number): string => {
  const sinal = valor >= 0 ? "+" : "";
  return `${sinal}${valor.toFixed(1)}%`;
};

export const formatarNumero = (valor: number): string => {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
};
