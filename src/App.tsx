import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";
import Quiz from "./pages/Quiz";

function App() {
  const [countdown, setCountdown] = useState<number>(3);
  const [getStart, setGetStart] = useState<boolean>(false);

  return (
    <>
      {!getStart ? (
        <Home
          countdown={countdown}
          setCountdown={setCountdown}
          getStart={getStart}
          setGetStart={setGetStart}
        />
      ) : (
        <Quiz />
      )}
    </>
  );
}

export default App;
