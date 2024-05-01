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
  timer: boolean;
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
};

function QuizQuestion({ timer, setTimer }: TimerProp) {
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

  const checkAnswer = (option: string, answer: string): void => {
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
    }, 1000);
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
    }, 3000);
  }, []);

  return (
    <>
      {question <= questions.length && (
        <>
          <Timer setTimer={setTimer} />
          <div className="bg-black flex flex-row justify-between p-5">
            <div className="flex flex-row gap-2">
              <p className="bg-gray-700 p-3 rounded-lg text-lg text-white font-semibold">
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
            <div className="flex space-x-2 bg-gray-800 rounded-md">
              <p className="text-white font-bold p-3 border-r-2 border-black flex items-center gap-2">
                <FaMedal color="#3f07b0" /> 10th
              </p>
              <p className="text-white font-bold p-3 border-r-2 border-black flex items-center gap-2">
                <FaCoins color="#f59611" />
                {point}
              </p>
            </div>
          </div>

          <motion.div className="mt-10">
            <motion.p
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="text-6xl text-white text-center"
            >
              {fetchQuestion?.question}
            </motion.p>
            <div className="flex gap-5 mt-10 w-[100%] h-auto p-5">
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
                  className={`w-[25%] h-[300px] bg-${
                    ["blue", "emerald", "yellow", "red"][index]
                  }-500 rounded-md relative flex justify-center items-center`}
                >
                  <p className="border-gray-800 border-2 inline px-3 py-1 rounded-md text-center absolute right-2 top-2">
                    {index + 1}
                  </p>
                  <p className="text-3xl font-semibold text-white">{option}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {correctAnswer && <Message status="pass" message="CORRECT ANSWER" />}
          {wrongAnswer && <Message status="fail" message="WRONG ANSWER" />}
        </>
      )}
    </>
  );
}

export default QuizQuestion;
