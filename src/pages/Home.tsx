import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

type TimerProp={
    setGetStart:React.Dispatch<React.SetStateAction<boolean>>
    setCountDown:React.Dispatch<React.SetStateAction<number>>
}
function Home({setGetStart,setCountDown}:TimerProp) {
    useEffect(()=>{
        setGetStart(false);
        setCountDown(3);
    },[setCountDown,setGetStart])
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-[100dvh] w-[100%]">
      <motion.img
        animate={{
          opacity: 1,
        }}
        initial={{
          opacity: 0,
        }}
        transition={{
          delay: 1,
          duration: 2,
        }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8hBCPGy4J5ZCI8Ke5fgMvE4YjCcRLQaBg5k-LcP5Kw&s"
        className="h-40 w-40 rounded-full m-2"
        alt=""
      />
      <motion.button
        animate={{
          y: 0,
          opacity: 1,
        }}
        initial={{
          y: 100,
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="bg-purple-800 px-5 py-3 rounded-lg shadow-2xl text-5xl text-white font-bold"
      >
        <NavLink to="/start" className="no-underline">
          Start Quiz
        </NavLink>
      </motion.button>
    </div>
  );
}

export default Home;
