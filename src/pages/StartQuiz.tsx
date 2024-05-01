import React, { useEffect } from "react";
import CountDown from "../components/CountDown";
import { useQuizStore } from "../store/quizStore";

type CountDownProps = {
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  getStart: boolean;
  setGetStart: React.Dispatch<React.SetStateAction<boolean>>;
};
function StartQuiz({
  countdown,
  setCountdown,
  getStart,
  setGetStart,
}: CountDownProps) {
  const reset = useQuizStore((state) => state.reset);

  useEffect(() => {
    console.log("reset");
    setCountdown(3);
    setGetStart(false);
    reset();
  }, [reset, setCountdown, setGetStart]);

  return (
    <div>
      <CountDown
        countdown={countdown}
        setCountdown={setCountdown}
        getStart={getStart}
        setGetStart={setGetStart}
      />
    </div>
  );
}

export default StartQuiz;
