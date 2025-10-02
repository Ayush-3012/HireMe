/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoSend, IoHappy } from "react-icons/io5";
import { useAllContext } from "../../context/HireMeContext";

const MessageInput = ({ conversationId, senderId, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const { chats, socket } = useAllContext();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    if (!socket?.current) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        conversationId,
        senderId,
        message: newMessage,
        timestamp: new Date(),
      },
    ]);

    socket.current.emit("message", {
      conversationId,
      senderId,
      message: newMessage,
      timestamp: new Date(),
    });

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
      <div className="flex gap-2 my-1 max-md:gap-1 items-center justify-between relative">
        <button
          type="button"
          onClick={() => setNewMessage("😀")}
          className="text-yellow-400 bg-slate-800 p-2 rounded-full hover:shadow-[0px_0px_10px] hover:shadow-white duration-200 transition-all ease-in-out text-3xl max-lg:text-2xl max-md:text-xl"
        >
          <IoHappy />
        </button>

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
          className="p-2 bg-slate-800 rounded-sm text-yellow-400 font-semibold focus:ring ring-white w-full focus:outline-none"
        />

        <button
          type="submit"
          onClick={handleSendMessage}
          className={`bg-slate-800 p-1 text-yellow-400 rounded-sm hover:-translate-y-1 hover:bg-slate-950 duration-200 transition-all ease-in-out px-4 text-3xl max-lg:text-2xl max-md:text-xl`}
        >
          <IoSend />
        </button>
      </div>
    </>
  );
};

export default MessageInput;
