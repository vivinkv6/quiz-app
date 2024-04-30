import React from "react";
import { motion } from "framer-motion";

function Result() {
  return (
    <div className="flex justify-center items-center w-[100%] h-[100dvh]">
    <motion.div
     animate={{y:0,opacity:1}} initial={{opacity:0,y:500}} transition={{duration:2}}
      className="bg-gray-900 w-[50%] h-[500px] rounded-xl"
    >

        <p className="text-5xl text-white text-center font-semibold" >Perfomance Stats</p>

    </motion.div>
    </div>
  );
}

export default Result;
