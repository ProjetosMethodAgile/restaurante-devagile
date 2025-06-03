import ComponenteClientes from "@/src/components/Clientes/ComponenteClientes";

export default function ClientePage() {
const clientes = [
  { nome: "Ana Paula Lima", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345678", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente1@exemplo.com", cpf: "123.456.789-00" },
  { nome: "João Pedro Oliveira", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345679", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente2@exemplo.com", cpf: "123.456.789-01" },
  { nome: "Mariana Batista", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345680", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente3@exemplo.com", cpf: "123.456.789-02" },
  { nome: "Lucas Fernandes", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345681", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente4@exemplo.com", cpf: "123.456.789-03" },
  { nome: "Bruna Cardoso", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345682", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente5@exemplo.com", cpf: "123.456.789-04" },

  { nome: "Ana Paula Lima", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345678", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente1@exemplo.com", cpf: "123.456.789-00" },
  { nome: "João Pedro Oliveira", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345679", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente2@exemplo.com", cpf: "123.456.789-01" },
  { nome: "Mariana Batista", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345680", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente3@exemplo.com", cpf: "123.456.789-02" },
  { nome: "Lucas Fernandes", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345681", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente4@exemplo.com", cpf: "123.456.789-03" },
  { nome: "Bruna Cardoso", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-578", telefone: "11912345682", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente5@exemplo.com", cpf: "123.456.789-04" },
  { nome: "Ana Paula Lima", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345678", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente1@exemplo.com", cpf: "123.456.789-00" },
  { nome: "João Pedro Oliveira", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345679", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente2@exemplo.com", cpf: "123.456.789-01" },
  { nome: "Mariana Batista", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345680", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente3@exemplo.com", cpf: "123.456.789-02" },
  { nome: "Lucas Fernandes", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345681", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente4@exemplo.com", cpf: "123.456.789-03" },
  { nome: "Bruna Cardoso", logradouro: "Rua das Flores", numeroInt: "456", bairro: "Jardim das Rosas", CEP: "12345-678", telefone: "11912345682", frete: "3,00", observacao: "Cliente VIP", cidade: "São Paulo", Estado: "SP", complemento: "Casa 5", email: "cliente5@exemplo.com", cpf: "123.456.789-04" },

];


  return (
    <div >
      <ComponenteClientes clientes={clientes} />
    </div>
  );
}
