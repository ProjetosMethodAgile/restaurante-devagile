
import FiltrarClientes from "./FiltrarCliente/FiltrarCliente";
import FormCliente from "./FormCliente/FormCliente";

export default function ClientePage() {
  
  
  
  
   const clientes = [
      {
        nome: "Maria Silva",
        logradouro: "Rua Benedito Batalha",
        numero: "353",
        bairro: "Centro",
        CEP: "05050-050",
        telefone: "11 9 8557-1544",
        frete: "1,50",
      },
      {
        nome: "Roberto Santos",
        logradouro: "Av. Teste",
        numero: "456",
        bairro: "Centro",
        CEP: "05123-456",
        telefone: "11 9 9123-45678",
        frete: "2,00",
      },
      {
        nome: "Roberto Santos",
        logradouro: "Av. Teste",
        numero: "456",
        bairro: "Centro",
        CEP: "05123-456",
        telefone: "11 9 9123-45678",
        frete: "2,00",
      },
      // … mais clientes
    ]



  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 h-auto lg:h-screen bg-gray-50">
      <section className="w-full lg:w-2/3 bg-white rounded-lg shadow p-4 lg:p-6 overflow-auto">
          <FiltrarClientes clientes={clientes}/>
      </section>
      <section className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 lg:p-6 overflow-auto">
      <FormCliente/>
      </section>
    </div>
  );
}
