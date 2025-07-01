import { motion } from "framer-motion";

export default function AddProdutosPed() {
  const motionProps = {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
    columnLeft: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    columnRight: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
  };

  return (
    <>
      <motion.div
        key="two-columns"
        variants={motionProps.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
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
    </>
  );
}
