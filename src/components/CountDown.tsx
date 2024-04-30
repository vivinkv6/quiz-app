import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type CountDownProps={
  countdown:number,
  setCountdown:React.Dispatch<React.SetStateAction<number>>,
  getStart:boolean,
  setGetStart:React.Dispatch<React.SetStateAction<boolean>>
}

const CountDown = ({countdown,setCountdown,getStart,setGetStart}:CountDownProps) => {

  
  useEffect(() => {
   
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        setGetStart(true);
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  useEffect(() => {  
    if (getStart) {
      const timer = setTimeout(() => {
        setGetStart(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [getStart]);

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="text-white text-9xl font-bold bg-black w-[100%] h-[150px] text-center"
        animate={{ scale:[1,1.5] ,opacity: countdown > 0 ? 1 : 0 }}
        transition={{ duration: 2,repeat: countdown == 0 ? 0 : Infinity  }}
      >
       <motion.h4         animate={{ scale:[0.5,1] ,opacity: countdown > 0 ? 1 : 0 }}
        transition={{ duration: 2,repeat: countdown == 0 ? 0 : Infinity  }}>{countdown > 0 ? countdown : 'GO !'}</motion.h4> 
      </motion.div>
    </div>
  );
};

export default CountDown;