import { motion } from "framer-motion";
const Welcome = () => {
  return (
    <motion.div
      className="flex items-center w-full animate-pulse justify-center py-4 max-md:py-2 max-sm:py-1 border-b-4 border-b-slate-900"
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <div className="text-center text-yellow-400 text-4xl font-bold p-6 rounded-lg shadow-[2px_2px_10px] shadow-yellow-400 max-md:text-3xl  max-sm:text-2xl max-md:p-4 max-sm:p-2 max-md:rounded-md">
        Welcome to <span className="underline">HireMe</span> - Home Page
      </div>
    </motion.div>
  );
};

export default Welcome;
