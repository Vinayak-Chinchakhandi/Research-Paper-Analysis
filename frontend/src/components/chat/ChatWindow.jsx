import useChat from "../../hooks/useChat";

import MessageBubble from "./MessageBubble";

function ChatWindow() {

  const {
    messages,
    isThinking,
  } = useChat();

  return (
    <div className="h-full overflow-y-auto px-3 md:px-6 py-4 space-y-6 bg-[#0B1120]">

      {messages.length === 0 && (

        <div className="text-center text-gray-500 mt-10">

          Ask questions about uploaded research papers.

        </div>
      )}

      {messages.map((msg) => (

        <MessageBubble
          key={msg.id}
          type={msg.role}
          message={msg.content}
          sources={msg.sources}
        />

      ))}

      {isThinking && (

        <div className="text-blue-400 text-sm animate-pulse">

          Searching semantic matches...
          <br />
          Ranking chunks...
          <br />
          Generating grounded response...

        </div>
      )}

    </div>
  );
}

export default ChatWindow;