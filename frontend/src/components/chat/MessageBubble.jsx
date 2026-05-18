import ReactMarkdown from "react-markdown";

import SourceCard from "./SourceCard";

function MessageBubble({
  type,
  message,
  sources = [],
}) {

  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`
          max-w-[90%] md:max-w-3xl
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

        {isUser ? (

          <div>{message}</div>

        ) : (

          <div className="prose prose-invert max-w-none">

            <ReactMarkdown>
              {message}
            </ReactMarkdown>

          </div>
        )}

        {!isUser && sources.length > 0 && (

          <div className="mt-4">

            <h3 className="text-sm font-semibold mb-2 text-blue-400">
              Sources
            </h3>

            <div className="flex flex-wrap gap-2">

              {sources.map((source, index) => (

                <SourceCard
                  key={index}
                  source={source}
                />

              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default MessageBubble;