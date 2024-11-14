/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AuthContext";

const ChatList = ({ setActiveConversation, activeConversation }) => {
  const [conversation, setConversation] = useState([]);
  const userId = localStorage.getItem("userId");
  const currentUser = localStorage.getItem("userType");
  const { chats } = useAllContext();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  };

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
  }, []);

  const handleChatClick = (chat) => {
    chat.isUnread = false;
    setActiveConversation(chat);
  };

  return (
    <div className="">
      {conversation?.length === 0 ? (
        <div className="flex flex-col gap-4 px-2 py-1">
          <h2 className="bg-red-400 py-4 px-8 cursor-pointer">
            No Conversation
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-2 py-1">
          {conversation?.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => handleChatClick(item)}
                className={`bg-green-500 py-2 cursor-pointer ax rounded-md font-serif group text-gray-800 transition-all ease-in-out duration-200 hover:bg-green-800 hover:text-slate-200 ${
                  activeConversation._id === item._id &&
                  "bg-yellow-300 scale-110 -translate-x-2"
                }`}
              >
                <div className="flex justify-between gap-10 px-2">
                  <h3 className="font-bold text-2xl flex items-center justify-start  ">
                    {currentUser === "employer"
                      ? item?.employeeName
                      : item?.employerName}
                  </h3>
                  <p className="flex items-center  justify-center ">
                    {formatDate(item?.lastUpdated)}
                  </p>
                </div>
                <div className="flex flex-col px-4">
                  <h4 className="font-bold text-lg text-gray-600 group-hover:text-slate-200 transition-all ease-in-out duration-200">
                    {item?.jobTitle}
                  </h4>
                  <p className=" ">
                    {item?.lastMessage
                      ? `${item?.lastMessage.slice(0, 20)}...`
                      : "No messages yet"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatList;
