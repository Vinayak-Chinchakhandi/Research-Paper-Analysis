import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createSession,
  getProjectSessions,
  saveMessage,
  getSessionMessages,
} from "../controllers/chatController.js";

const router =
  express.Router();

router.post(
  "/session",
  authMiddleware,
  createSession
);

router.get(
  "/session/:projectId",
  authMiddleware,
  getProjectSessions
);

router.post(
  "/message",
  authMiddleware,
  saveMessage
);

router.get(
  "/message/:sessionId",
  authMiddleware,
  getSessionMessages
);

export default router;