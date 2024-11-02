/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AuthContext";

const ChatList = () => {
  const [conversation, setConversation] = useState([]);
  const userId = localStorage.getItem("userId");
  const { chats } = useAllContext();

  useEffect(() => {
    //fetch all conversation to be shown as a list.
    const fetchData = async () => {
      const data = await chats?.fetchConversation(userId);
      if (data) setConversation(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {conversation?.length === 0 ? (
        <div className="flex flex-col gap-4 px-2 py-1">
          <h2 className="bg-red-400 py-4 px-8 cursor-pointer">
            No Conversation
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-2 py-1">
          {conversation?.map((item, index) => {
            return (
              <h2
                key={item._id}
                className="bg-red-400 py-4 px-8 cursor-pointer"
              >
                Chat converasation item : {index + 1}
              </h2>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChatList;
