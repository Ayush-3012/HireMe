import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";

const ChatConversation = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //fetch current activeConversation and messages to disply in chat space
  }, []);

  return (
    <>
      <div className="flex flex-col w-[80%] border justify-between items-center py-2 gap-2">
        <div className="bg-white w-full">
          <h2 className="text-2xl py-2 px-4">
            Acitve Conversation name, account details
          </h2>
        </div>
        <div className="bg-slate-300 h-full w-[95%] px-4">
          Chat Space, to display all old messages
        </div>
        <hr />
        <MessageInput />
      </div>
    </>
  );
};

export default ChatConversation;
