import { useState } from "react";
import useChat from "../../hooks/useChat";

function ChatInput() {

  const [input, setInput] = useState("");

  const { sendMessage } = useChat();

  const handleSend = () => {

    sendMessage(input);

    setInput("");
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask research questions..."
        className="
          flex-1
          bg-gray-800
          border border-gray-700
          rounded-xl
          px-3 py-3 md:px-4 md:py-4
          text-sm md:text-base
          outline-none
        "
      />

      <button
        onClick={handleSend}
        className="
          bg-blue-600
          hover:bg-blue-700
          transition
          px-4 py-3 md:px-6 md:py-4
          rounded-xl
        "
      >
        Send
      </button>

    </div>
  );
}

export default ChatInput;