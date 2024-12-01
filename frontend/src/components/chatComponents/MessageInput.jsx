/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoSend, IoHappy } from "react-icons/io5";
// import EmojiPicker from "emoji-picker-react";
import { useAllContext } from "../../context/AuthContext";

const MessageInput = ({ conversationId, senderId, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for Emoji Picker
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

  // const handleEmojiClick = (emojiObject) => {
  //   setNewMessage((prev) => prev + emojiObject.emoji); // Append selected emoji to the message
  //   setShowEmojiPicker(false); // Close the emoji picker
  // };

  return (
    <>
      <div className="flex gap-2 my-1 max-md:gap-1 items-center justify-between relative">
        <button
          type="button"
          // onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-yellow-400 bg-slate-800 p-1 rounded-sm hover:shadow-[1px_1px_10px] hover:bg-slate-700 duration-200 transition-all ease-in-out text-3xl max-lg:text-2xl max-md:text-xl"
        >
          <IoHappy />
        </button>

        {/* {showEmojiPicker && (
          <div className="absolute  bottom-12 rounded-md z-10">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="dark"
            />
          </div>
        )} */}

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
          className="px-1 py-2 bg-slate-800 rounded-md focus:shadow-[1px_1px_5px] text-yellow-300 w-full focus:outline-none"
        />

        <button
          type="submit"
          onClick={handleSendMessage}
          className={`bg-slate-800 p-1 text-yellow-400 rounded-sm hover:shadow-[1px_1px_10px] hover:bg-slate-700 duration-200 transition-all ease-in-out px-4 text-3xl max-lg:text-2xl max-md:text-xl`}
        >
          <IoSend />
        </button>
      </div>
    </>
  );
};

export default MessageInput;
