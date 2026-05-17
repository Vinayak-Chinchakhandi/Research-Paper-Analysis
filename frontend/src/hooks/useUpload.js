import { useContext, useState } from "react";

import { ProjectContext } from "../context/ProjectContext";

import { uploadPDFs } from "../services/ragService";

export default function useUpload() {

  const {
    uploadedFiles,
    setUploadedFiles,
  } = useContext(ProjectContext);

  const [isUploading, setIsUploading] = useState(false);

  const [uploadStatus, setUploadStatus] = useState("");

  const addFiles = async (files) => {

    try {

      setIsUploading(true);

      setUploadStatus("Uploading PDFs...");

      const response = await uploadPDFs(files);

      setUploadStatus("Generating embeddings...");

      const formattedFiles = response.papers.map((paper) => ({
        id: crypto.randomUUID(),
        name: paper.original_name,
        storedName: paper.stored_name,
        chunks: paper.num_chunks,
        preview: paper.preview,
      }));

      setUploadedFiles((prev) => [
        ...prev,
        ...formattedFiles,
      ]);

      setUploadStatus("Research workspace ready.");

    } catch (error) {

      console.error(error);

      setUploadStatus("Upload failed.");

    } finally {

      setTimeout(() => {
        setIsUploading(false);
      }, 1200);
    }
  };

  return {
    uploadedFiles,
    addFiles,
    isUploading,
    uploadStatus,
  };
}