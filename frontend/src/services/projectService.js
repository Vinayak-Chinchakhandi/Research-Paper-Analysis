const API_URL =
  "http://localhost:5000/api/projects";

/* CREATE PROJECT */
export const createProject =
  async (projectData) => {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify(
          projectData
        ),
      }
    );

    return response.json();
};

/* GET PROJECTS */
export const fetchProjects =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      API_URL,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return response.json();
};

export const fetchProjectById =
  async (projectId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await fetch(
        `${API_URL}/${projectId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.json();
};