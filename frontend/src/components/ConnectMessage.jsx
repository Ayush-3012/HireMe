/* eslint-disable react/prop-types */
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useAllContext } from "../context/AuthContext";

const ConnectMessage = ({ onClose, employeeId, employeeName }) => {
  const [message, setMessage] = useState("");
  const employerId = localStorage.getItem("userId");
  const { chats } = useAllContext();

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.length) {
      await chats?.createNewConversation(employeeId, employerId, message);
      enqueueSnackbar({ message: "Message Sent", variant: "success" });
      setMessage("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-slate-100 font-bold">
            Connect with {employeeName}
          </h2>
          <button onClick={onClose}>
            <IoCloseCircleSharp className="text-red-400 text-3xl hover:text-red-600" />
          </button>
        </div>
        <textarea
          className="w-full h-52 p-2 text-lg bg-zinc-600 text-white rounded-md border outline-none focus:ring focus:ring-white resize-none"
          placeholder="Type your message here..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={(e) => handleSend(e)}
          className="mt-4 w-full bg-cyan-200 hover:text-slate-50 font-bold text-lg py-2 rounded-md hover:bg-cyan-500 hover:-translate-y-1 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ConnectMessage;