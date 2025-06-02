export type EmpresaBase = {
  id: string;
  codigo: string;
  status: string;
  razao_social: string;
  cnpj: string;
  tipoEmpresa: { nome: string };
};
