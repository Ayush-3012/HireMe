
import ChatConversation from "./ChatConversation";
import ChatList from "./ChatList";

const Chat = () => {
  return (
    <>
      <div className="flex bg-blue-300 gap-4 px-10 py-4">
        <ChatList />
        <ChatConversation />
      </div>
    </>
  );
};

export default Chat;
