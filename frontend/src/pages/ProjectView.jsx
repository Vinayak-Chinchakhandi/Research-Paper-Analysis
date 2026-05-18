import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import UploadDropzone from "../components/upload/UploadDropzone";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProjectView() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useContext(AuthContext);

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#0B1120] text-white overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Workspace */}
      <div className="flex flex-col flex-1 w-full">

        {/* User Header */}
        <div className="
          flex
          items-center
          justify-between
          px-4 py-3
          border-b
          border-gray-800
          bg-[#111827]
        ">

          <div>

            <h2 className="
              text-lg
              font-semibold
            ">
              Welcome, {user?.name}
            </h2>

            <p className="
              text-sm
              text-gray-400
            ">
              {user?.email}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="
              bg-red-600
              hover:bg-red-700
              px-4 py-2
              rounded-xl
              transition
            "
          >
            Logout
          </button>

        </div>

        {/* Navbar */}
        <Navbar />

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