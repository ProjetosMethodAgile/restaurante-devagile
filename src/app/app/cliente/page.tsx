import { getAllCustomer } from "@/src/actions/clientes/getAllCustomers";
import ComponenteClientes from "@/src/components/Clientes/ComponenteClientes";

export default async function ClientePage() {


async function fetchClientes() {
  const response = await getAllCustomer();  
  return response;
}

const clientes= await fetchClientes();
  return (
    <div >
      <ComponenteClientes clientes={clientes} />
    </div>
  );
}
