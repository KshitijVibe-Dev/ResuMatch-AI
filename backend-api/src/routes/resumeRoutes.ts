import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware";
import { uploadResume } from "../controllers/resumeController";

const router = express.Router();

// 1. Multer Configuration (File kahan save hogi)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Uploads folder me daalo
    },
    filename: (req, file, cb) => {
        // Naya unique naam: timestamp-filename.pdf
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// 2. Route define karein (POST /api/resume/upload)
// protect -> check token
// upload.single -> handle file
// uploadResume -> save to DB
router.post("/upload", protect, upload.single("resume"), uploadResume);

export default router;