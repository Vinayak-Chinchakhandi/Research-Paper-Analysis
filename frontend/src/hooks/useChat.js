import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";

import { askQuestion } from "../services/ragService";

export default function useChat() {

  const { projectId } = useParams();

  const {
    messages,
    setMessages,
    isThinking,
    setIsThinking,
    activeSession,
  } = useContext(ProjectContext);

  const sendMessage = async (text) => {

    if (!text.trim()) return;

    if (!activeSession) {
      alert("Create a chat first");
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      sources: [],
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setIsThinking(true);

    try {

      const response =
        await askQuestion(
          activeSession.id,
          projectId,
          text
        );

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
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
        role: "assistant",
        content: "Error generating AI response.",
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