export type VariacaoBase = {
  id: string;
  codigo: number;
  nome: string;
  preco: number;
  empresa: {
    id: string;
    codigo: number;
    razao_social: string;
  };
};

