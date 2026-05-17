import useChat from "../../hooks/useChat";
import MessageBubble from "./MessageBubble";

function ChatWindow() {

  const {
    messages,
    isThinking,
  } = useChat();

  return (
    <div className="h-full overflow-y-auto px-3 md:px-6 py-4 space-y-6 bg-[#0B1120]">

      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          type={msg.type}
          message={msg.message}
        />
      ))}

      {isThinking && (
        <div className="text-gray-400 text-sm">
          AI is thinking...
        </div>
      )}

    </div>
  );
}

export default ChatWindow;