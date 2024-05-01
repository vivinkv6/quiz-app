import { motion } from "framer-motion";
import { useQuizStore } from "../store/quizStore";
import wrongIcon from "../assets/delete.png";
import correctIcon from "../assets/yes.png";
import { FaCoins, FaMedal } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Result() {
  const correct = useQuizStore((state) => state.correct);
  const wrong = useQuizStore((state) => state.wrong);
  const point = useQuizStore((state) => state.point);
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ opacity: 0, y: 500 }}
        transition={{ duration: 2 }}
        className="bg-gray-900 w-full md:w-2/3 lg:w-1/2 xl:w-2/5 h-auto py-10 rounded-xl"
      >
        <p className="text-3xl md:text-4xl lg:text-5xl text-white text-center font-semibold px-3">
          Performance Stats
        </p>
        <div className="mt-5 flex flex-col md:flex-row justify-around p-5">
          <div className="flex justify-center md:justify-start items-center">
            <img
              src={correctIcon}
              className="h-16 w-16 md:h-20 md:w-20"
              alt="correct icon"
            />
            <div className="flex flex-col justify-center p-5">
              <p className="text-3xl md:text-5xl text-white font-semibold">
                {correct}
              </p>
              <p className="text-xl md:text-3xl text-white font-bold">
                Correct
              </p>
            </div>
          </div>
          <div className="flex sm:flex-row-reverse md:flex-row justify-center md:justify-start items-center mt-4 md:mt-0">
            <img
              src={wrongIcon}
              className="h-16 w-16 md:h-20 md:w-20"
              alt="wrong icon"
            />
            <div className="flex flex-col justify-center p-5">
              <p className="text-3xl md:text-5xl text-white font-semibold">
                {wrong}
              </p>
              <p className="text-xl md:text-3xl text-white font-bold">Wrong</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 h-12 w-full text-white">
          <div className="bg-black rounded-md w-40 md:w-56 h-full flex justify-between items-center p-3">
            <p className="text-sm md:text-lg">_ _</p>
            <FaMedal size="1.5em" color="#3f07b0" />
          </div>
          <div className="bg-black rounded-md w-40 md:w-56 h-full flex justify-between items-center p-3">
            <p className="text-sm md:text-lg">{point}</p>
            <FaCoins size="1.5em" color="#f59611" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 mt-4 font-bold text-xl md:text-2xl">
          <NavLink
            to="/start"
            className="bg-violet-500 text-white text-center w-3/4 rounded-md p-3 no-underline"
          >
            Play Again
          </NavLink>
          <button className="bg-white text-black w-3/4 rounded-md p-3">
            <NavLink
              to="/"
              className="text-center w-3/4 rounded-md p-3 no-underline"
            >
              Go To Home Page
            </NavLink>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Result;
