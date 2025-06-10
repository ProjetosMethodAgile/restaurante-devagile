export type VariacaoBase = {
  id: string;
  codigo: number;
  nome: string;
  empresa: {
    id: string;
    codigo: number;
    razao_social: string;
  };
};
