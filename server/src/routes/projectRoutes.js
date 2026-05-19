import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {createProject, getProjects, getProjectById } from "../controllers/projectController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createProject
);

router.get(
  "/",
  authMiddleware,
  getProjects
);

router.get(
  "/:id",
  authMiddleware,
  getProjectById
);

export default router;