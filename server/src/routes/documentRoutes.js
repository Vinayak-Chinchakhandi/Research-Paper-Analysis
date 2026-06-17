import express  from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {getProjectDocuments} from "../controllers/documentController.js";

const router = express.Router();

router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectDocuments
);

export default router;