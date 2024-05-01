import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "../store/quizStore";

type TimerProp = {
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timer = ({ setTimer}: TimerProp) => {
    const [progress, setProgress] = useState(1);
  
    const question = useQuizStore((state) => state.question);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const subPoint = useQuizStore((state) => state.subpoint);
  
    const TIMER_INTERVAL = 100;
    const TOTAL_DURATION = 30000; // 30 seconds
    const DECREMENT = 1 / (TOTAL_DURATION / TIMER_INTERVAL);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress - DECREMENT);
      }, TIMER_INTERVAL);
  
      return () => clearInterval(timer);
    }, []);
  
    useEffect(() => {
      if (progress <= 0) {
       
        console.log("next question");
        setProgress(1);
        nextQuestion();
        setTimer(true);
        console.log(question);
      }
    }, [progress, nextQuestion, setTimer, subPoint, question]);
  
    const getColor = (progress:number) => {
      if (progress >= 0.5) return "green";
      if (progress >= 0.2) return "yellow";
      return "red";
    };
  
    return (
      <>
        <div className="w-[100%] h-[5px] bg-gray-500">
          <motion.div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              backgroundColor: getColor(progress),
            }}
            initial={{ width: "100%" }}
            animate={{ width: `${progress * 100}%` }}
          />
        </div>
      </>
    );
  };
  
  export default Timer;
