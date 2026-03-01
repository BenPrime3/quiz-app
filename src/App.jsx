import QuizApp from './components/QuizApp';
import { motion, AnimatePresence } from "framer-motion";

function App() {

  return (
    <>
      <QuizApp />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-20 left-[-10%] text-[180px] font-bold text-white/5 blur-sm select-none"
        >
          WHAT
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute top-[45%] right-[-5%] text-[200px] font-bold text-white/5 blur-sm select-none rotate-12"
        >
          WHY
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 left-[20%] text-[160px] font-bold text-white/5 blur-sm select-none -rotate-6"
        >
          HOW
        </motion.div>

      </div>
    </>
  )
}

export default App
