import { askAI } from "../services/aiService.js";

import { uploadToAI } from "../services/aiService.js";

import { saveDocuments } from "./documentController.js";

import { saveMessageToDB } from "../services/chatService.js";

export const chatWithAI =
  async (req, res) => {

    try {

      const user_id =
        req.user.id;

      const {
        session_id,
        project_id,
        query,
      } = req.body;

      await saveMessageToDB(
        session_id,
        "user",
        query
      );

      const data =
        await askAI({
          user_id,
          project_id,
          query,
        });

      await saveMessageToDB(
        session_id,
        "assistant",
        data.answer,
        data.sources
      );

      res.json(data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "AI request failed",
      });
    }
  };


export const uploadDocuments =
  async (req, res) => {

    try {

      const user_id =
        req.user.id;

      const {
        project_id,
      } = req.body;

      const files =
        req.files;

      const data =
        await uploadToAI({
          user_id,
          project_id,
          files,
        });

      await saveDocuments(
        project_id,
        data.documents
      );

      res.json(data);

    } catch (error) {

      console.error(
        "FASTAPI ERROR:",
        error.response?.data
      );

      res.status(500).json({
        message: "Upload failed",
      });
    }
  };