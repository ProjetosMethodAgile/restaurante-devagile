export type FormClienteData = {
  id:string;
  nome:       string;
  contato?   :  string;
  email?      : string;
  cpf        : string;
  rua: string;
  numero:     string;
  bairro:     string;
  cep:        string;
  cidade?    :  string;
  estado?    :  string;
  complemento?: string;
  frete:      string;
  observacao?:  string;
};