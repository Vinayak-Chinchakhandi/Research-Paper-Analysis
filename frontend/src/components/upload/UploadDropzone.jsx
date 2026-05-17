import { useDropzone } from "react-dropzone";
import useUpload from "../../hooks/useUpload";

function UploadDropzone() {

  const { addFiles } = useUpload();

  const onDrop = (acceptedFiles) => {
    addFiles(acceptedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-2xl
        p-6 md:p-8
        text-center
        cursor-pointer
        transition-all duration-300
        bg-[#111827]

        ${
          isDragActive
            ? "border-blue-500 bg-[#1E293B]"
            : "border-gray-700"
        }
      `}
    >

      <input {...getInputProps()} />

      <h2 className="text-lg md:text-xl font-semibold mb-2">
        Upload Research Papers
      </h2>

      <p className="text-sm md:text-base text-gray-400">

        {isDragActive
          ? "Drop PDFs here..."
          : "Drag & drop PDFs here or click to browse"}

      </p>

    </div>
  );
}

export default UploadDropzone;