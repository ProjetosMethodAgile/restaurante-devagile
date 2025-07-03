import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export type ModalAddItemsPedProps = React.ComponentProps<"div"> & {
  setopenAddProdModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalAddItemsPed({
  setopenAddProdModal,
  ...props
}: ModalAddItemsPedProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto p-6"
      >
        <div className="flex gap-5">
          <div
            onClick={() => setopenAddProdModal(false)}
            className="pl-2 text-blue-800 active:scale-105 hover:scale-102 cursor-pointer "
          >
            <ArrowLeft />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            Adicionar items ao pedido
          </h1>
        </div>
      </motion.div>
    </div>
  );
}
