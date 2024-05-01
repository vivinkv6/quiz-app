import  { useEffect, useState } from "react";
import QuestionTimer from "../components/QuestionTimer";
import QuizQuestion from "../components/QuizQuestion";
import { useQuizStore } from "../store/quizStore";
import { questions } from "../constant/questions";

function Quiz() {
  const [timer, setTimer] = useState<boolean>(true);
  const question=useQuizStore(state=>state.question);


  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 2000);
  }, [timer, setTimer]);

  return (
    <>
      {timer ? (
        <div
          className={`flex justify-center items-${
            timer ? "center" : "start"
          } w-[100%] h-[100dvh] bg-fuchsia-950`}
        >
          {question > questions.length ?
          <QuestionTimer type="end" />
           : 
           <QuestionTimer type="quiz" />
           }
          
        </div>
      ) : (
        <QuizQuestion setTimer={setTimer} />
      )}
    </>
  );
}

export default Quiz;
