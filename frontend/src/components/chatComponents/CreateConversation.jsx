/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useAllContext } from "../../context/HireMeContext";

const CreateConversation = ({
  onClose,
  employeeId,
  employeeName,
  employerName,
  jobTitle,
  jobId,
  onConversationCreated,
}) => {
  const [message, setMessage] = useState("");
  const employerId = localStorage.getItem("userId");
  const { chats } = useAllContext();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.length) {
      enqueueSnackbar(`Empty input field to connect with ${employeeName}`, {
        variant: "error",
      });
    }
    if (message.length) {
      const newConversation = {
        employeeId,
        employerId,
        employeeName,
        employerName,
        jobTitle,
        jobId,
        firstMessage: message,
      };
      const res = await chats?.createNewConversation(newConversation);
      if (res.status === 200) {
        onConversationCreated();
        enqueueSnackbar({ message: "Message Sent", variant: "success" });
        setMessage("");
        onClose();
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duartion: 0.5, type: "spring", bounce: 0.6 }}
    >
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-yellow-400 font-bold">
            Connect with {employeeName}
          </h2>
          <button onClick={onClose}>
            <IoCloseCircleSharp className="text-red-400 text-3xl hover:text-red-600" />
          </button>
        </div>
        <textarea
          className="w-full h-52 p-2 text-lg bg-zinc-600 text-yellow-300 rounded-md outline-none focus:ring focus:ring-yellow-400 resize-none"
          placeholder="Type your message here..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={(e) => handleSend(e)}
          className="mt-4 w-full bg-slate-500  hover:text-slate-100 font-bold text-lg py-2 rounded-md hover:bg-yellow-500 hover:-translate-y-1 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default CreateConversation;
