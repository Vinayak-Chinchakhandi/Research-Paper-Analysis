import { createContext, useState } from "react";

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [sessions, setSessions] = useState([]);

  const [activeSession, setActiveSession] = useState(null);

  const [messages, setMessages] = useState([]);

  const [isThinking, setIsThinking] = useState(false);


  return (
    <ProjectContext.Provider
      value={{
        uploadedFiles,
        setUploadedFiles,
        messages,
        setMessages,
        isThinking,
        setIsThinking,
        sessions,
        setSessions,
        activeSession,
        setActiveSession,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}