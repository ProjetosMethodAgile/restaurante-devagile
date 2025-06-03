export type TelaBase = {
  id: string;
  codigo: string;
  nome: string;
  tela_parent?: string;
  subtelas?: string[];
};

export type SubtelaBase = {
  nome: string;
  id: string
}
