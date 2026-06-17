import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import testDB from "./config/testDb.js";
import initDB from "./db/initDb.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/documents", documentRoutes);

app.use("/api/chat", chatRoutes);

testDB();

initDB();

app.get("/", (req, res) => {
  res.json({
    message: "ResearchGPT Node Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});