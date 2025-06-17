import getMotoristas from "@/src/actions/motorista/pegaTodosMotoristas";
import MotoristaContainer from "@/src/components/Motorista/MotoristaContainer/MotoristaContainer";



export default async function MotoristaPage() {

  const motoristas = await getMotoristas()
  console.log(motoristas);
  
  return (
    <section>
        <MotoristaContainer/>
    </section>
  );
}
