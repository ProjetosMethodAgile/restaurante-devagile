import { AnimatePresence, motion, scale } from "framer-motion";

export default function AddProdutosPed() {
  const motionProps = {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0, scale: -10 },
    },
    columnLeft: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    columnRight: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="two-columns"
          variants={motionProps.containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            when: "beforeChildren", // entra antes dos filhos
            staggerChildren: 0.2,
            staggerDirection: -1, // inverte o stagger para a saída
          }}
          className="grid grid-cols-2 gap-6 w-full"
        >
          <motion.div
            variants={motionProps.columnLeft}
            className="bg-slate-50 p-6 rounded shadow-md xl:w-100"
          >
            Coluna 1
          </motion.div>

          <motion.div
            variants={motionProps.columnRight}
            className="bg-slate-50 p-6 rounded shadow-md"
          >
            Coluna 2
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
