import { Request, Response } from "express";
import Resume from "../models/Resume";
import { analyzeResumeWithAI } from "../services/aiService"; // AI Service import kiya
import fs from "fs";

export const uploadResume = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // --- 🛡️ SECURITY: DAILY LIMIT CHECK (Kharcha Bachao Plan) 🛡️ ---
    
    // 1. Aaj ki date nikalo (Raat 12 baje se)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // 2. Database se pucho: "Is user ne aaj kitne upload kiye?"
    // @ts-ignore (req.user ki vajah se TS kabhi rota hai)
    const userId = req.user.id;
    
    const todayUploadCount = await Resume.countDocuments({
      user: userId,
      createdAt: { $gte: startOfDay } // Aaj ki date se bade wale
    });

    // 3. Limit Check (Manlo limit 3 hai)
    const DAILY_LIMIT = 3;
    if (todayUploadCount >= DAILY_LIMIT) {
      // File delete kar do jo upload hui thi (storage bachane ke liye)
      fs.unlinkSync(req.file.path);
      
      res.status(429).json({ 
        message: `⛔ Daily limit reached! You can only scan ${DAILY_LIMIT} resumes per day.` 
      });
      return;
    }
    // -------------------------------------------------------------

    // ✅ Limit ke andar hai, ab AI se kaam karwao
    console.log("🤖 AI is analyzing the resume...");
    const aiResult = await analyzeResumeWithAI(req.file.path);

    if (!aiResult) {
      res.status(500).json({ message: "AI Analysis Failed" });
      return;
    }

    // Database me save karo (AI Result ke sath)
    const newResume = new Resume({
      user: userId,
      fileName: req.file.filename,
      filePath: req.file.path,
      aiScore: aiResult.score,       // AI ka Score
      summary: aiResult.summary,     // AI ki Summary
      skills: aiResult.skills,       // AI ki Skills list
      suggestions: aiResult.suggestions // AI ki Salah
    });

    await newResume.save();

    res.status(201).json({
      message: "Resume uploaded & Analyzed successfully! 🚀",
      data: newResume,
      creditsLeft: DAILY_LIMIT - (todayUploadCount + 1) // User ko batao kitne bache hain
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getResumes = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};