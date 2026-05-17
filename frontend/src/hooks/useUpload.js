import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export default function useUpload() {

  const {
    uploadedFiles,
    setUploadedFiles,
  } = useContext(ProjectContext);

  const addFiles = (files) => {

    const formattedFiles = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
    }));

    setUploadedFiles((prev) => [
      ...prev,
      ...formattedFiles,
    ]);
  };

  return {
    uploadedFiles,
    addFiles,
  };
}