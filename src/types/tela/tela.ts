export type TelaBase = {
  id: string;
  codigo: string;
  nome: string;
  tela_parent_id?: string;
  href: string;
  subtelas?: SubtelaBase[];
};

export type SubtelaBase = {
  codigo: number;
  nome: string;
  id: string;
  href: string;
  tela_parent_id: string;
};
