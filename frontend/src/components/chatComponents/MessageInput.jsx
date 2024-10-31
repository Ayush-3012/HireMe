import { useState } from "react";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("message sent: ", newMessage);
  };

  return (
    <>
      <div className="flex gap-1 justify-between w-[95%]">
        <input
          type="text"
          required
          placeholder="Enter your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="py-1 px-1 w-full focus:outline"
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          className="bg-white p-1 hover:bg-blue-200"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default MessageInput;
