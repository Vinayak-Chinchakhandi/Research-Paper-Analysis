import API from "./api";

/* Upload PDFs */
export const uploadPDFs = async (files) => {

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* Ask AI Question */
export const askQuestion = async (question) => {

  const response = await API.get("/chat", {
    params: {
      query: question,
    },
  });

  return response.data;
};