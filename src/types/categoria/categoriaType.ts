import { EmpresaBase } from "../empresa/empresaType";

export type CategoriaBase = {
  id: string;
  codigo: number;
  nome: string;
  cor_hex: string;
  empresa: EmpresaBase;
};
