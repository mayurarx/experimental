import { motion } from "framer-motion";
import Hotkey from "./Hotkey";
import Command from "./Command";

export default function Navbar() {
  return (
    <div className="flex justify-between items-start">
      <div>
        <motion.div className="overflow-hidden">
          <motion.p
            initial={{ translateY: 44 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            Mayura Ramanayaka
          </motion.p>
        </motion.div>
        <motion.div className="overflow-hidden">
          <motion.p
            initial={{ translateY: 44 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 * 0.15 }}>
            Software Engineer, <a href="#">UENO®</a>
          </motion.p>
        </motion.div>
        <motion.div className="overflow-hidden">
          <motion.p
            initial={{ translateY: 44 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 2 * 0.15 }}>
            Kandy, Sri Lanka
          </motion.p>
        </motion.div>
      </div>

      <div className="flex items-center space-x-3">
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 2 * 0.15 }}>
          <Hotkey keys={["Cmd", "K"]} />
        </motion.div>
        <Command />
      </div>
    </div>
  );
}
