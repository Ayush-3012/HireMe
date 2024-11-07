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
          className="py-2 px-1 w-full focus:outline"
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          className={`bg-white p-1 text-gray-500 rounded-sm hover:bg-blue-300 px-4 text-3xl`}
        >
          <IoSend />
        </button>
      </div>
    </>
  );
};

export default MessageInput;
