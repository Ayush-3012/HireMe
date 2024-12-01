/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { HiDotsVertical } from "react-icons/hi";
import { useAllContext } from "../../context/AuthContext";
import { enqueueSnackbar } from "notistack";

const ChatConversation = ({ activeConversation }) => {
  const [messages, setMessages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
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
  }, [activeConversation, chats]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    hours = hours ? hours : 12;

    return `${hours}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${
      hours >= 12 ? "PM" : "AM"
    }`;
  };

  const handleDeleteConversation = async () => {
    const res = await chats?.deleteConversation(activeConversation?._id);
    enqueueSnackbar(res.data.message, { variant: "success" });
    setMenuOpen(false);
  };

  // const handleBlockUser = () => {
  //   // Logic to block the user
  //   console.log("Block User", activeConversation);
  //   setMenuOpen(false);
  // };

  return (
    <>
      {!activeConversation ? (
        <div className="flex flex-1 rounded-lg justify-center items-center text-xl py-2 font-serif text-yellow-400 bg-gray-600">
          No Active Conversation
        </div>
      ) : (
        <div className="flex flex-1 flex-col rounded-lg px-4 gap-1 font-serif bg-gray-600 max-lg:px-2 max-md:px-1">
          <div className="border-b-2 border-slate-900 text-yellow-400 flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-2xl max-lg:text-xl max-md:text-lg">
                {currentUser === "employer"
                  ? activeConversation?.employeeName
                  : activeConversation?.employerName}
              </h2>
              <h3 className="text-xl mx-4 max-lg:mx-3 max-md:mx-2 max-lg:text-lg max-md:text-sm">
                {activeConversation?.jobTitle}
              </h3>
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-yellow-400 text-2xl"
              >
                <HiDotsVertical />
              </button>
              {menuOpen && (
                <div className="absolute right-0 bg-slate-700 text-yellow-400 rounded-md shadow-lg w-32 text-sm z-50">
                  <div
                    onClick={handleDeleteConversation}
                    className="px-4 py-2 hover:bg-slate-500 hover:rounded-t-md cursor-pointer"
                  >
                    Delete Conversation
                  </div>
                  {/* <div
                    onClick={handleBlockUser}
                    className="px-4 py-2 hover:bg-slate-500 hover:rounded-b-md cursor-pointer"
                  >
                    Block User
                  </div> */}
                </div>
              )}
            </div>
          </div>
          <div className="bg-slate-900 px-2 py-1 rounded-md h-[450px] overflow-y-auto">
            {messages?.length > 0 ? (
              messages?.map((item, index) => (
                <div
                  key={index}
                  className={`mb-1 flex ${
                    item.senderId === senderId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-0.5 max-md:px-2 max-sm:px-1 flex flex-col rounded-md max-sm:rounded-sm ${
                      item.senderId === senderId
                        ? "bg-slate-600 text-yellow-400"
                        : "bg-slate-700 text-yellow-300"
                    }`}
                  >
                    <p className="self-start flex text-lg max-lg:text-sm max-md:text-xs flex-wrap">
                      {item.message}
                    </p>
                    <span className="text-xs text-slate-200 self-end">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages yet</p>
            )}
          </div>
          <span className="border border-slate-900"></span>
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
