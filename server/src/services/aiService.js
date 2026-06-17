import axios from "axios";

import FormData from "form-data";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

export const askAI =
  async ({
    user_id,
    project_id,
    query,
  }) => {

    const response =
      await axios.post(
        `${AI_SERVICE_URL}/chat`,
        {
          user_id,
          project_id,
          query,
        },
        {
          headers: {
            "X-INTERNAL-API-KEY":
              INTERNAL_API_KEY,
          },
        }
      );

    return response.data;
  };


export const uploadToAI =
  async ({
    user_id,
    project_id,
    files,
  }) => {

    const formData =
      new FormData();

    formData.append(
      "user_id",
      user_id
    );

    formData.append(
      "project_id",
      project_id
    );

    files.forEach((file) => {

      formData.append(
        "files",
        file.buffer,
        file.originalname
      );
    });

    const response =
      await axios.post(
        `${AI_SERVICE_URL}/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),

            "X-INTERNAL-API-KEY":
              INTERNAL_API_KEY,
          },
        }
      );

    return response.data;
  };