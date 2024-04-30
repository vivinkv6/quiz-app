import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "../store/quizStore";
import { questions } from "../constant/questions";
import { Question } from "../types/types";
import QuestionTimer from "../components/QuestionTimer";

//icon
import { FaCoins, FaMedal } from "react-icons/fa6";
function Quiz() {
  const question = useQuizStore((state) => state.question);
  const points=useQuizStore((state)=>state.point)
  const [fetchQuestion, setFetchQuestion] = useState<Question>();
  const [timer, setTimer] = useState<boolean>(true);
  const [len, setLen] = useState<number>(0);

  useEffect(() => {
    const ques = questions.find((quiz) => quiz.id == question);
    setLen(questions.length);
    setFetchQuestion(ques);
  }, [question, fetchQuestion, len]);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 2000);
  }, [setTimer]);
  return (
    <>
      {timer ? (
        <div
          className={`flex justify-center items-${
            timer ? "center" : "start"
          } w-[100%] h-[100dvh] bg-fuchsia-950`}
        >
          <QuestionTimer />
        </div>
      ) : (
        <>
          {/* Scorepart */}
          <div className="bg-black flex flex-row justify-between p-5">
            <div className="flex flex-row gap-2">
              <p className="bg-gray-700 p-3 rounded-lg text-lg font-semibold">
                {question} / {len}
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-yellow-400 text-white font-bold py-2 px-4 rounded"
              >
                Streak
              </motion.button>
            </div>

            <div >
              <div className="flex space-x-2 bg-gray-800 rounded-md">
                <p className=" text-white font-bold p-3 border-r-2 border-black flex items-center gap-2">
                  <FaMedal color="#3f07b0" /> 10th
                </p>
                <p className=" text-white font-bold p-3 border-r-2 border-black flex items-center gap-2">
                  <FaCoins color="#f59611" />
                 {points}
                </p>
              </div>
            </div>
            {/* <div>

            </div> */}
          </div>

          {/* quiz */}
          <motion.div className="mt-20">
            <motion.p
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="text-6xl text-white text-center"
            >
              {fetchQuestion?.question}
            </motion.p>
          </motion.div>
        </>
      )}
    </>
  );
}

export default Quiz;
