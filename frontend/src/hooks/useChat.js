import { useContext } from "react";

import { ProjectContext } from "../context/ProjectContext";

import { askQuestion } from "../services/ragService";

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

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setIsThinking(true);

    try {

      const response = await askQuestion(text);

      const aiMessage = {
        id: crypto.randomUUID(),
        type: "ai",
        message: response.answer,
        sources: response.sources || [],
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.error(error);

      const errorMessage = {
        id: crypto.randomUUID(),
        type: "ai",
        message:
          "Error generating AI response.",
        sources: [],
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    } finally {

      setIsThinking(false);

    }
  };

  return {
    messages,
    sendMessage,
    isThinking,
  };
}