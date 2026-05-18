import { FileText } from "lucide-react";
import useUpload from "../../hooks/useUpload";

function Sidebar() {

  const { uploadedFiles } = useUpload();

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

    </div>
  );
}

export default Sidebar;