export type TelaBase = {
  id: string;
  codigo: string;
  nome: string;
  tela_parent?: string;
  subtelas?: SubtelaBase[];
};

export type SubtelaBase = {
  nome: string;
  id: string;
};
