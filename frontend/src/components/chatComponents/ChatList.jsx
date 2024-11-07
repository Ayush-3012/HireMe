/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AuthContext";

const ChatList = ({ setActiveConversation }) => {
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
        setConversation(data);
        setActiveConversation(data[0]);
      }
    };
    fetchData();
  }, []);

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
                onClick={() => setActiveConversation(item)}
                className="bg-green-500 py-2 cursor-pointer ax rounded-md font-serif"
              >
                <div className="flex justify-between gap-10 px-2">
                  <h3 className="font-bold text-2xl flex items-center justify-start text-gray-800 ">
                    {currentUser === "employer"
                      ? item?.employeeName
                      : item?.employerName}
                  </h3>
                  <p className="flex items-center text-gray-800 justify-center ">
                    {formatDate(item?.lastUpdated)}
                  </p>
                </div>
                <div className="flex flex-col px-4">
                  <h4 className="font-bold text-lg text-gray-600 ">
                    {item?.jobTitle}
                  </h4>
                  <p className="text-gray-800 ">
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
