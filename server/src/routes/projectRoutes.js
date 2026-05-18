import express from "express";

import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.post(
  "/",
  createProject
);

router.get(
  "/",
  getProjects
);

export default router;