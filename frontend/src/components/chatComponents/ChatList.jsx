/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
const ChatList = ({
  conversation,
  setActiveConversation,
  activeConversation,
}) => {
  const currentUser = localStorage.getItem("userType");

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleChatClick = (chat) => {
    chat.isUnread = false;
    setActiveConversation(chat);
  };

  return (
    <motion.div
      className="font-serif"
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      {conversation?.length === 0 ? (
        <div className="flex rounded-lg justify-center items-center text-4xl px-4 py-10 text-yellow-400 bg-gray-600">
          No Conversation
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-2 py-1 max-lg:gap-3 max-sm:py-3 max-sm:px-1 max-sm:flex-row max-sm:gap-1.5 max-sm:overflow-x-auto">
          {conversation?.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => handleChatClick(item)}
                className={`bg-slate-600 py-2 cursor-pointer rounded-md font-serif group text-slate-100 transition-all ease-in-out duration-200 hover:bg-slate-500 max-lg:py-1 max-md:py-0 max-sm:rounded-sm min-w-32 ${
                  activeConversation._id === item._id &&
                  " text-yellow-400 scale-105 -translate-x-2 max-sm:scale-1 max-sm:-translate-x-0 max-sm:-translate-y-2"
                }`}
              >
                <div className="flex justify-between gap-10 px-2 max-lg:px-1 max-lg:gap-5 max-md:gap-3 max-sm:flex-col max-sm:gap-0">
                  <h3 className="font-bold text-2xl flex items-center justify-start max-lg:text-xl max-md:text-lg max-sm:text-sm">
                    {currentUser === "employer"
                      ? item?.employeeName
                      : item?.employerName}
                  </h3>
                  <p className="flex items-center justify-center max-lg:text-sm max-sm:text-xs max-sm:justify-start">
                    {formatDate(item?.lastUpdated)}
                  </p>
                </div>
                <div className="flex flex-col px-4 max-lg:px-3 max-md:px-2 max-sm:text-xs">
                  <h4 className="font-bold text-xl max-lg:text-lg max-md:text-sm max-sm:text-xs max-sm:font-light">
                    {item?.jobTitle}
                  </h4>
                  <p className="max-sm:hidden">
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
    </motion.div>
  );
};

export default ChatList;
