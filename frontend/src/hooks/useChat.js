import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export default function useChat() {

  const {
    messages,
    setMessages,
    isThinking,
    setIsThinking,
  } = useContext(ProjectContext);

  const sendMessage = async (text) => {

    if (!text.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      type: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsThinking(true);

    // Fake AI Delay
    setTimeout(() => {

      const aiMessage = {
        id: crypto.randomUUID(),
        type: "ai",
        message:
          "AI-generated response will appear here after backend integration.",
      };

      setMessages((prev) => [...prev, aiMessage]);

      setIsThinking(false);

    }, 2000);
  };

  return {
    messages,
    sendMessage,
    isThinking,
  };
}