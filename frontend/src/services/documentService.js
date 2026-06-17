import API from "./api";

export const fetchProjectDocuments =
  async (projectId) => {

    const response =
      await API.get(
        `/documents/project/${projectId}`
      );

    return response.data;
  };