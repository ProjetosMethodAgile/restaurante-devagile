import { Empresa } from "../../empresa/type/empresaType";

export type AcaoTela = {
  id: string;
  codigo: number;
  nome: string;
  descricao: string;
  telaId: string;
};

export type UsuarioAcaoTela = {
  id: string;
  usuario_id: string;
  acao_tela_id: string;
  acao_tela: AcaoTela;
};

export type Tela = {
  id: string;
  nome?: string; // adicione outros campos conforme necessário
};

export type UsuarioTela = {
  id: string;
  usuario_id: string;
  tela_id: string;
  tela: Tela;
};

export type Role = {
  id: string;
  codigo: number;
  nome: string;
  descricao: string;
};


export type UsuarioEmpresa = {
  id: string;
  usuario_id: string;
  empresa_id: string;
  status: boolean;
  deletado: boolean;
  empresa: Empresa;
};

export type UsuarioData = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  status: boolean;
  codigo: number;
  createdAt: string;
  updatedAt: string;
  reseta_senha: boolean;
  deletado: boolean;
  role_Id: string;
  roleid: Role;
  Usuario_AcaoTela: UsuarioAcaoTela[];
  Usuario_Tela: UsuarioTela[];
  usuarioEmpresa: UsuarioEmpresa[];
};
