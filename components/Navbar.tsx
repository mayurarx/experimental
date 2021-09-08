import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <motion.p
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}>
        Mayura Ramanayaka
      </motion.p>
      <ul className="flex items-center space-x-5">
        <motion.li
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="underline">
          Blog
        </motion.li>
        <motion.li
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-xl">
          ⌘
        </motion.li>
      </ul>
    </div>
  );
}
