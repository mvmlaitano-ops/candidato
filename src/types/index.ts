export interface Bem {
  descricao: string;
  valor: number;
  categoria: CategoriaPatrimonio;
}

export interface PatrimonioAno {
  ano: number;
  total: number;
  bens: Bem[];
  porCategoria: Record<CategoriaPatrimonio, number>;
}

export interface Candidato {
  id: string;
  nome: string;
  partido: string;
  cargo: string;
  estado: string;
  foto?: string;
  patrimonio2022: PatrimonioAno;
  patrimonio2026: PatrimonioAno;
}

export interface Comparacao {
  aumentoTotal: number;
  variacaoPercentual: number;
  emSalariosMinimos: number;
  emCarrosPopulares: number;
}

export interface CategoriaComparacao {
  categoria: string;
  valor2022: number;
  valor2026: number;
  variacao: number;
}

export enum CategoriaPatrimonio {
  IMOVEIS = "Imóveis",
  RENDA_FIXA = "Renda Fixa",
  RENDA_VARIAVEL = "Renda Variável",
  EMPRESAS = "Empresas",
  CRIPTOMOEDAS = "Criptomoedas",
  OUTROS = "Outros",
}
