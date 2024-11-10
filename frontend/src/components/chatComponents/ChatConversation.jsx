/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { useAllContext } from "../../context/AuthContext";

const ChatConversation = ({ activeConversation }) => {
  const [messages, setMessages] = useState([]);
  const { chats } = useAllContext();
  const currentUser = localStorage.getItem("userType");
  const senderId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const conversationId = activeConversation?._id;

      if (conversationId) {
        const fetchMessages = await chats?.fetchMessage(conversationId);

        if (fetchMessages) {
          setMessages(fetchMessages);
        }
      }
    };
    fetchData();
  }, [activeConversation]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    hours = hours ? hours : 12;

    return `${hours}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${
      hours >= 12 ? "PM" : "AM"
    }`;
  };

  return (
    <>
      {!activeConversation ? (
        <div className="flex flex-1 flex-col rounded-xl justify-center items-center text-3xl px-4 py-2 gap-2 font-serif bg-slate-200">
          No Active Conversation
        </div>
      ) : (
        <div className="flex flex-1 flex-col rounded-xl px-4 py-2 gap-2 font-serif bg-slate-200">
          <div className="border-b-2 border-slate-500 flex flex-col px-2 ">
            <h2 className="text-2xl">
              {currentUser === "employer"
                ? activeConversation?.employeeName
                : activeConversation?.employerName}
            </h2>
            <h3 className="text-xl">{activeConversation?.jobTitle}</h3>
          </div>
          <div className="bg-slate-300 px-4 py-2 rounded-md h-[450px] overflow-y-auto ">
            {messages?.length > 0 ? (
              messages?.map((item, index) => (
                <div
                  key={index}
                  className={`mb-1 flex ${
                    item.senderId === senderId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 flex flex-col rounded-lg ${
                      item.senderId === senderId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    <p className="self-start text-lg">{item.message}</p>
                    <span className="text-xs text-white self-end">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages yet</p>
            )}
          </div>
          <span className="border border-slate-500"></span>
          <MessageInput
            conversationId={activeConversation?._id}
            senderId={senderId}
            setMessages={setMessages}
          />
        </div>
      )}
    </>
  );
};

export default ChatConversation;
