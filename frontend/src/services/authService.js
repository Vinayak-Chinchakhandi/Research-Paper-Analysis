import axios from "axios";

const API_URL =
  "http://localhost:5000/api/auth";

/* REGISTER */
export const registerUser = async (
  userData
) => {

  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
};

/* LOGIN */
export const loginUser = async (
  userData
) => {

  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
};