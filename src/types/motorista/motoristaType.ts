export type MotoristaBase = {
  id:string;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  contato: string;
  email: string;
  cep: string;
  numero: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  observacao: string;
  numeroCnh: string;
  categoria: string;
  emissaocnh: string;
  validadecnh: string;
  logradouro:string;
  deletado:boolean;
};

export type ContainerMotoristaProps = {
  motoristas: MotoristaBase[];
  setAlteraMotorista: React.Dispatch<React.SetStateAction<string>>;
  setEdita?: React.Dispatch<React.SetStateAction<boolean>>;
  edita?: boolean;
dataAlteraMotorista?: string;
};

export type GetMotoristaPorIDResponse = {
  data: MotoristaBase[];        
  error: string | null;
};
