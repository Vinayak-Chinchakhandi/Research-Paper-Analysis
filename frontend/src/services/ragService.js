import API from "./api";

/* Upload PDFs */
export const uploadPDFs =
  async (
    project_id,
    files
  ) => {

    const formData =
      new FormData();

    formData.append(
      "project_id",
      project_id
    );

    files.forEach((file) => {

      formData.append(
        "files",
        file
      );
    });

    const response =
      await API.post(
        "/ai/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

/* Ask AI Question */
export const askQuestion =
  async (
    session_id,
    project_id,
    query
  ) => {

    const response =
      await API.post(
        "/ai/chat",
        {
          session_id,
          project_id,
          query,
        }
      );

    return response.data;
  };