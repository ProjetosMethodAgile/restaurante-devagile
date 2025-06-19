import { VariacaoBase } from "./../variacoes/variacoesType";
import { CategoriaBase } from "./../categoria/categoriaType";
import { EmpresaBase } from "./../empresa/empresaType";

export type ProdutoBase = {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  tipo: string;
  empresas: EmpresaBase[];
  categorias: CategoriaBase[];
  variacoes: VariacaoBase[];

};
