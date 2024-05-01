import { motion } from "framer-motion";
import { useQuizStore } from "../store/quizStore";
import wrongIcon from '../assets/delete.png';
import correctIcon from '../assets/yes.png';
//icon
import { FaCoins, FaMedal } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function Result() {
  const correct=useQuizStore(state=>state.correct);
  const wrong=useQuizStore(state=>state.wrong);
  const point=useQuizStore(state=>state.point);
  return (
    <div className="flex justify-center items-center w-[100%] h-[100dvh]">
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ opacity: 0, y: 500 }}
        transition={{ duration: 2 }}
        className="bg-gray-900 w-[40%] h-[500px] rounded-xl"
      >
        <p className="text-5xl text-white text-center font-semibold p-3">
          Perfomance Stats
        </p>
        <div className="mt-5 flex justify-between p-5">
          <div className="flex justify-start items-center">
            <img src={correctIcon} className="h-20 w-20" alt="correct icon" />
            <div className="flex flex-col justify-center p-5">
              <p className="text-5xl text-white font-semibold">{correct}</p>
              <p className="text-3xl text-white font-bold">Correct</p>
            </div>
          </div>
          <div>
          <div className="flex justify-start items-center">
          <div className="flex flex-col justify-center p-5">
              <p className="text-5xl text-white font-semibold">{wrong}</p>
              <p className="text-3xl text-white font-bold">Wrong</p>
            </div>
            <img src={wrongIcon} className="h-20 w-20" alt="wrong icon" />
            
          </div>
          </div>

        </div>

        {/* score board */}
        <div className="flex justify-around h-[50px] w-[100%] text-white">
          {/* rank */}
          <div className="bg-black rounded-md w-[200px] h-[50px] flex justify-between items-center p-3">
           
              {/* <p className="font-bold text-lg">Rank</p> */}
              <p className="text-lg">_ _</p>
             
              <FaMedal color="#3f07b0" />
          </div>
          {/* score */}
          <div className="bg-black rounded-md w-[200px] h-[50px] flex justify-between items-center p-3">
              <p className="text-lg">{point}</p>
              <FaCoins color="#f59611" />
          </div>
        </div>
        {/* button */}
        <div className="flex flex-col justify-center items-center gap-5 mt-4  font-bold text-2xl">
        <NavLink to='/' className="bg-violet-500 text-white text-center w-[80%] rounded-md p-3 no-underline">Play Again</NavLink>
        <button className="bg-white text-black w-[80%] rounded-md p-3">Find a New Quiz</button>
        </div>
      </motion.div>
    </div>
  );
}

export default Result;
