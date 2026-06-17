import { FileText } from "lucide-react";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { useParams } from "react-router-dom";
import { createSession } from "../../services/chatService";
import { fetchMessages } from "../../services/chatService";

function Sidebar() {

  const {
    uploadedFiles,
    sessions,
    setSessions,
    activeSession,
    setActiveSession,
    setMessages,
  } = useContext(ProjectContext);

  const { projectId } = useParams();

  const handleNewChat =
    async () => {

      try {

        const title =
          `Chat ${sessions.length + 1}`;

        const session =
          await createSession(
            projectId,
            title
          );

        setSessions((prev) => [
          session,
          ...prev,
        ]);

        setActiveSession(
          session
        );

        setMessages([]);

      } catch (error) {

        console.error(error);
      }
    };

  const handleSessionSelect =
    async (session) => {

      try {

        setActiveSession(session);

        const data =
          await fetchMessages(
            session.id
          );

        setMessages(

          data.map((msg) => ({

            ...msg,

            sources:

              typeof msg.sources === "string"
                ? JSON.parse(msg.sources)
                : (msg.sources || [])

          }))

        );

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div className="h-screen w-64 lg:w-72 bg-[#111827] border-r border-gray-800 p-4 overflow-y-auto">

      <h1 className="text-2xl font-bold text-blue-500 mb-8">
        ResearchGPT
      </h1>

      <div>
        <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-4">
          Uploaded Papers
        </h2>

        <div className="space-y-3">

          {uploadedFiles.length === 0 ? (
            <div className="text-sm text-gray-500">
              No papers uploaded yet.
            </div>
          ) : (
            uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl"
              >
                <FileText size={18} />

                <span className="text-sm truncate">
                  {file.name}
                </span>
              </div>
            ))
          )}

        </div>
      </div>
      {/* Research Chats */}

      <div className="mt-8">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-sm uppercase tracking-wide text-gray-400">
            Research Chats
          </h2>

          <button
            onClick={handleNewChat}
            className="
              text-xs
              text-blue-400
              hover:text-blue-300
            "
          >
            + New Chat
          </button>

        </div>

        <div className="space-y-2">

          {sessions.length === 0 ? (

            <div className="text-sm text-gray-500">
              No chats yet.
            </div>

          ) : (

            sessions.map((session) => (

              <button
                key={session.id}
                onClick={() =>
                  handleSessionSelect(session)
                }
                className={`
            w-full
            text-left
            p-3
            rounded-xl
            text-sm
            transition

            ${activeSession?.id === session.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                  }
          `}
              >
                {session.title}
              </button>

            ))

          )}

        </div>

      </div>
    </div>
  );
}

export default Sidebar;