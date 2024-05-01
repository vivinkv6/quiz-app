import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";
import Quiz from "./pages/Quiz";
import {Routes,Route} from 'react-router-dom';
import Result from "./pages/Result";
import StartQuiz from "./pages/StartQuiz";


function App() {
  const [countdown, setCountdown] = useState<number>(3);
  const [getStart, setGetStart] = useState<boolean>(false);

  

  return (
    <>
      {/* {!getStart ? (
        <Home
          countdown={countdown}
          setCountdown={setCountdown}
          getStart={getStart}
          setGetStart={setGetStart}
        />
      ) : (
        <Quiz />
      )} */}
      <Routes>
      <Route path="/" element={<Home setCountDown={setCountdown} setGetStart={setGetStart}/>} />
        <Route path="start" element={<StartQuiz countdown={countdown}
          setCountdown={setCountdown}
          getStart={getStart}
          setGetStart={setGetStart} />}/>
          <Route path="quiz" element={<Quiz/>} />
          <Route path="result" element={<Result/>}/>
      </Routes>
    </>
  );
}

export default App;
