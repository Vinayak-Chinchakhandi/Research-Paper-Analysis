function MessageBubble({ type, message }) {

  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`
          max-w-[85%] md:max-w-2xl
          px-4 py-3
          rounded-2xl
          text-sm md:text-base
          shadow-lg
          ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-100"
          }
        `}
      >
        {message}
      </div>

    </div>
  );
}

export default MessageBubble;