import React from "react";
import { motion } from "framer-motion";
type MessageProp = {
  message: string;
  status: "pass" | "fail";
};
function Message({ message, status }: MessageProp) {
  return (
    <div className="flex justify-center w-[100%]">
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-center items-center h-[100px] w-[90%] rounded-md ${
        status == "pass" ? "bg-green-500" : "bg-red-600"
      } `}
    >
      <p className="text-2xl font-semibold text-white">{message}</p>
    </motion.div>
    </div>
  );
}

export default Message;
