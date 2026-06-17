import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {chatWithAI} from "../controllers/aiController.js";

import upload from "../middleware/uploadMiddleware.js";

import {uploadDocuments} from "../controllers/aiController.js";

const router =
  express.Router();

router.post(
  "/chat",
  authMiddleware,
  chatWithAI
);

router.post(
  "/upload",
  authMiddleware,
  upload.array("files"),
  uploadDocuments
);

export default router;