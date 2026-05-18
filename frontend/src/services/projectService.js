const API_URL =
  "http://localhost:5000/api/projects";

/* CREATE PROJECT */
export const createProject =
  async (projectData) => {

    const response = await fetch(
      API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
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
  async (userId) => {

    const response = await fetch(
      `${API_URL}?user_id=${userId}`
    );

    return response.json();
};