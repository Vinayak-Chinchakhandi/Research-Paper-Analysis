import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import UploadDropzone from "../components/upload/UploadDropzone";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import { fetchProjectById } from "../services/projectService";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProjectView() {
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const { projectId } = useParams();

  useEffect(() => {

    loadProject();

  }, []);

  const loadProject =
    async () => {

      try {

        const data =
          await fetchProjectById(
            projectId
          );

        setProject(data);

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div className="flex h-screen bg-[#0B1120] text-white overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Workspace */}
      <div className="flex flex-col flex-1 w-full">

        {/* Navbar */}
        <Navbar />

        <div className="
  flex
  items-start
  justify-between
  px-4
  py-4
  border-b
  border-gray-800
  bg-[#111827]
">

          {/* Left Section */}
          <div>

            <h1 className="
      text-2xl
      font-bold
    ">
              {project?.title || "Loading..."}
            </h1>

            <p className="
      text-sm
      text-gray-400
      mt-1
    ">
              {project?.description}
            </p>

          </div>

          {/* Right Section */}
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="
      text-sm
      text-gray-400
      hover:text-white
      transition-colors
    "
          >
            ← Back to Dashboard
          </button>

        </div>

        {/* Upload Area */}
        <div className="p-3 md:p-4 border-b border-gray-800">
          <UploadDropzone />
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-hidden">
          <ChatWindow />
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-800 p-3 md:p-4 bg-[#111827]">
          <ChatInput />
        </div>

      </div>
    </div>
  );
}

export default ProjectView;