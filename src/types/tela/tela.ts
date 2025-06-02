export type TelaBase = {
  id: string;
  codigo: string;
  nome: string;
  tela_parent_id?: string;
  subtelas?: string[];
};
