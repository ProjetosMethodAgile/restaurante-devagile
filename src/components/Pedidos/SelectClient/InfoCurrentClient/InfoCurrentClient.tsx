import { motion } from "framer-motion";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { twMerge } from "tailwind-merge";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";

export type InfoCurrentClientProps = React.ComponentProps<"div"> & {
  currentClient: ClienteBase;
};

export default function InfoCurrentClient({
  currentClient,
  className,
}: InfoCurrentClientProps) {
  return (
    <motion.div
      key="current-cli"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`${twMerge(className)}`}
    >
      <PrimaryTitle title="Detalhes do Cliente" className="mb-2 text-lg" />
      <p>
        <strong>Nome:</strong> {currentClient.nome}
      </p>
      <p>
        <strong>Contato:</strong> {currentClient.contato}
      </p>
      {currentClient.cpf && (
        <p>
          <strong>Endereço:</strong>{" "}
          {currentClient.cidade +
            ", " +
            currentClient.bairro +
            ", " +
            currentClient.estado +
            ", " +
            currentClient.numero}
        </p>
      )}
      <p>
        <strong>Cep:</strong> {currentClient.cep}
      </p>
    </motion.div>
  );
}
