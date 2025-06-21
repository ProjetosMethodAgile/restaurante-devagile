import getMotoristas from "@/src/actions/motorista/pegaTodosMotoristas";
import MotoristaContainer from "@/src/components/Motorista/MotoristaContainer/MotoristaContainer";



export default async function MotoristaPage() {
 const { data } = await getMotoristas();
const motoristasArray = data?? [];
console.log(data);

  return (
    <section>
        <MotoristaContainer motoristas={motoristasArray} />
    </section>
  );
}
