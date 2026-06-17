import { useContext, useState } from "react";

import { ProjectContext } from "../context/ProjectContext";

import { uploadPDFs } from "../services/ragService";

import { useParams } from "react-router-dom";

export default function useUpload() {

  const { projectId } = useParams();

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

      const response =
        await uploadPDFs(
          projectId,
          files
        );
        
      setUploadStatus("Generating embeddings...");

      const formattedFiles =
        response.documents.map(
          (doc) => ({
            id: doc.document_id,
            name: doc.original_name,
            storedName: doc.stored_name,
            filePath: doc.file_path,
            chunks: doc.chunk_count,
          })
        );

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