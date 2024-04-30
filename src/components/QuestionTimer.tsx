import React from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "../store/quizStore";

type TypeProp={
  type:"quiz"|"end"
}
function QuestionTimer({type}:TypeProp) {
    const question=useQuizStore(state=>state.question);
  return (
    <motion.div>
      <motion.p
        animate={{ opacity: [1, 0] }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="text-8xl text-white"
      >
        { type == 'quiz' ? question : "END"}
      </motion.p>
    </motion.div>
  );
}

export default QuestionTimer;
