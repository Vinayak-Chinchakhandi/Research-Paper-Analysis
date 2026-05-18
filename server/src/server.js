import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import testDB from "./config/testDb.js";
import initDB from "./db/initDb.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

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