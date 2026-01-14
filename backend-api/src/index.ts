import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import resumeRoutes from "./routes/resumeRoutes"; // ✅ New Import

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes); // ✅ New Route

app.get("/", (req, res) => {
  res.send("🚀 ResuMatch AI Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});