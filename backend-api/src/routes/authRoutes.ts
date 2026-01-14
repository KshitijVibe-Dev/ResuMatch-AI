import express from "express";
import { registerUser, loginUser } from "../controllers/authController"; // ✅ loginUser added here

const router = express.Router();

// Register Route (POST /api/auth/register)
router.post("/register", registerUser);

// Login Route (POST /api/auth/login)
router.post("/login", loginUser); // ✅ New Login Route

export default router;