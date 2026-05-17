import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import UploadDropzone from "../components/upload/UploadDropzone";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

function ProjectView() {
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