/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useAllContext } from "../../context/AuthContext";

const MessageInput = ({ conversationId, senderId, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const { chats } = useAllContext();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        conversationId,
        senderId,
        message: newMessage,
        timestamp: new Date(),
      },
    ]);

    try {
      await chats?.postMessage({
        conversationId,
        senderId,
        message: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-between">
        <input
          type="text"
          required
          placeholder="Enter your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          className="py-2 px-1 bg-slate-800 rounded-md shadow-[1px_1px_5px] shadow-yellow-400 text-yellow-300  w-full focus:outline"
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          className={`bg-slate-800 p-1 text-yellow-400 rounded-md hover:shadow-yellow-400 hover:shadow-[1px_1px_5px] hover:bg-slate-700 duration-200 transition-all ease-in-out px-4 text-3xl`}
        >
          <IoSend />
        </button>
      </div>
    </>
  );
};

export default MessageInput;
