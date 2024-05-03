import React, { useState, useEffect } from "react";
import { questions } from "../constant/questions";
import { motion } from "framer-motion";
import { useQuizStore } from "../store/quizStore";
import { Question } from "../types/types";
import Message from "./Message";
import { FaCoins, FaMedal } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

type TimerProp = {
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
};

function QuizQuestion({ setTimer }: TimerProp) {
  const navigation = useNavigate();
  const [fetchQuestion, setFetchQuestion] = useState<Question | undefined>();
  const [len, setLen] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);
  const [wrongAnswer, setWrongAnswer] = useState<boolean>(false);

  const question = useQuizStore((state) => state.question);
  const point = useQuizStore((state) => state.point);
  const addPoint = useQuizStore((state) => state.addpoint);
  const subPoint = useQuizStore((state) => state.subpoint);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);
  const addCorrect = useQuizStore((state) => state.addCorrect);
  const addWrong = useQuizStore((state) => state.addWrong);
  const [showOptions, setShowOptions] = useState<boolean>(true);

  const checkAnswer = (option: string, answer: string): void => {
    setShowOptions(false); // Hide options when an answer is checked
    if (option === answer) {
      addCorrect();
      addPoint(300);
      setCorrectAnswer(true);
      setWrongAnswer(false);
    } else {
      addWrong();
      subPoint(300);
      setCorrectAnswer(false);
      setWrongAnswer(true);
    }

    setTimeout(() => {
      nextQuestion();
      setTimer(true);
      setShowOptions(true); // Show options again for the next question
    }, 3000);
  };

  useEffect(() => {
    const ques = questions.find((quiz) => quiz.id === question);
    setLen(questions.length);
    setFetchQuestion(ques);
  }, [question]);

  useEffect(() => {
    setTimeout(() => {
      if (question > questions.length) {
        navigation("/result");
      }
    }, 2000);
  }, []);

  return (
    <>
      {question <= questions.length && (
        <>
         {showOptions &&  <Timer setTimer={setTimer} />}
          <div className="bg-black flex flex-row justify-between p-2 md:p-5">
            <div className="flex flex-row gap-2">
              <p className="bg-gray-700 p-2 md:p-3 rounded-lg text-sm md:text-lg text-white font-semibold">
                {question} / {len}
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-yellow-400 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded text-sm md:text-base"
              >
                Streak
              </motion.button>
            </div>
            <div className="flex space-x-2 bg-gray-800 rounded-md">
              <p className="text-white font-bold p-2 md:p-3 border-r-2 border-black flex items-center gap-1 md:gap-2 text-sm md:text-base">
                <FaMedal color="#3f07b0" /> 10th
              </p>
              <p className="text-white font-bold p-2 md:p-3 border-r-2 border-black flex items-center gap-1 md:gap-2 text-sm md:text-base">
                <FaCoins color="#f59611" />
                {point}
              </p>
            </div>
          </div>

          <motion.div className="mt-5 md:mt-10">
            <motion.p
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="text-4xl md:text-6xl text-white text-center"
            >
              {fetchQuestion?.question}
            </motion.p>
            {showOptions ? (
              <div className="flex flex-wrap justify-center gap-3 mt-5 md:mt-10 p-2 md:p-5">
                {[
                  fetchQuestion?.option1,
                  fetchQuestion?.option2,
                  fetchQuestion?.option3,
                  fetchQuestion?.option4,
                ].map((option, index) => (
                  <motion.div
                    key={index}
                    onClick={() =>
                      checkAnswer(option || "", fetchQuestion?.answer || "")
                    }
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: 2 + index, duration: 1 }}
                    className={`w-[48%] md:w-[23%] h-[150px] md:h-[300px] ${
                      {
                        0: "bg-blue-500",
                        1: "bg-emerald-500",
                        2: "bg-yellow-500",
                        3: "bg-red-500",
                      }[index]
                    } rounded-md relative flex justify-center items-center`}
                  >
                    <p className="border-gray-800 border-2 inline px-2 py-1 rounded-md text-center absolute right-1 top-1 text-sm md:text-base">
                      {index + 1}
                    </p>
                    <p className="md:text-5xl sm:text-2xl font-semibold text-white">
                      {option}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center mt-5 md:mt-10 w-full h-auto p-2 md:p-5">
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-[80%] md:w-[50%] h-[150px] md:h-[300px] bg-green-500 rounded-md flex justify-center items-center"
                >
                  <p className="md:text-5xl sm:text-2xl font-semibold text-white">
                    {fetchQuestion?.answer}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {correctAnswer && <Message status="pass" message="CORRECT ANSWER" />}
          {wrongAnswer && <Message status="fail" message="WRONG ANSWER" />}
        </>
      )}
    </>
  );
}

export default QuizQuestion;
