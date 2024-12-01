import { useEffect, useState } from "react";
import ChatConversation from "./ChatConversation";
import ChatList from "./ChatList";
import { useAllContext } from "../../context/AuthContext";

const Chat = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const userId = localStorage.getItem("userId");
  const [conversation, setConversation] = useState([]);
  const { chats } = useAllContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await chats?.fetchConversation(userId);
      if (data) {
        const sortedConversations = data.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        setConversation(sortedConversations);
        setActiveConversation(sortedConversations[0]);
      }
    };
    fetchData();
  }, [chats, userId]);

  return (
    <>
      <div className="flex bg-gray-800 gap-4 justify-between px-5 py-2 rounded-md max-lg:gap-0 max-lg:px-3 max-md:px-1 max-sm:flex-col">
        <ChatList
          conversation={conversation}
          setActiveConversation={setActiveConversation}
          activeConversation={activeConversation}
        />
        <ChatConversation activeConversation={activeConversation} />
      </div>
    </>
  );
};

export default Chat;
