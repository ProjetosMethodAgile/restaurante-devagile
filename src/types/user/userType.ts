import { RoleBase } from "../role/roleType";
import { AcaoTelaBase } from "../tela/acao-tela/acaoTela";
import { TelaBase } from "../tela/tela";

export type UsuarioBase = {
  id: string;
  codigo: string;
  nome: string;
  email: string;
  deletado: boolean;
  reseta_senha: boolean;
  role: RoleBase;
  empresas: {
    empresa: {
      id: string;
      codigo: string;
      status: string;
      razao_social: string;
      cnpj: string;
      tipoEmpresa: { nome: string };
    };
  }[];
  telas: TelaBase[]
};

export type UsuarioTelas = UsuarioBase & {
  telas: {
    tela: TelaBase & {
      acoes: AcaoTelaBase[];
    };
  }[];
};
