
import getClientes from "@/src/actions/clientes/getClientes";
import ClientesContainer from "@/src/components/Clientes/ClientesContainer";

export default async function ClientePage() {

const {data} = await getClientes();
console.log(data);
  return (
    <div  >
      <ClientesContainer clientes={data} />
    </div>
  );
}
