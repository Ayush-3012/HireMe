import { useEffect, useState } from "react";

const ChatList = () => {
  const [conversation, setConversation] = useState([]);
  const allChats = Array(1, 2, 3, 4, 5, 6, 7, 8);

  useEffect(() => {
    //fetch all conversation to be shown as a list.
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 px-2 py-1">
        {allChats?.map((item) => {
          return (
            <h2 key={item} className="bg-red-400 py-4 px-8 cursor-pointer">
              Chat converasation item : {item}
            </h2>
          );
        })}
      </div>
    </>
  );
};

export default ChatList;
