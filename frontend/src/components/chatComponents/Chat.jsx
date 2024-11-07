import { useState } from "react";
import ChatConversation from "./ChatConversation";
import ChatList from "./ChatList";

const Chat = () => {
  const [activeConversation, setActiveConversation] = useState(null);

  return (
    <>
      <div className="flex bg-blue-700 gap-4 justify-between px-10 py-4 mx-2 my-2 rounded-md">
        <ChatList setActiveConversation={setActiveConversation} />
        <ChatConversation activeConversation={activeConversation} />
      </div>
    </>
  );
};

export default Chat;
