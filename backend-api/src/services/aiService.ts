import fs from "fs";
import Groq from "groq-sdk";
import dotenv from "dotenv";
// 👇 FIX: Ab hum clean tarike se require karenge
const pdf = require("pdf-parse");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const analyzeResumeWithAI = async (filePath: string) => {
  try {
    // 1. File Read
    const dataBuffer = fs.readFileSync(filePath);

    // 2. Parse PDF
    // Ab kyunki library fresh install hai, ye function ki tarah chalega
    const data = await pdf(dataBuffer);
    const resumeText = data.text;

    console.log("✅ PDF Read Success! Text Length:", resumeText.length);

    // 3. AI Prompt
    const prompt = `
      You are an expert HR Manager. Analyze the following resume text.
      
      Resume Text:
      "${resumeText.slice(0, 5000)}" 

      Provide the response in strict JSON format with the following structure:
      {
        "score": (number out of 100),
        "summary": "Short professional summary",
        "skills": ["Skill 1", "Skill 2", ...],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "suggestions": ["Tip 1", "Tip 2"]
      }
      Do not add any extra text, just the JSON.cd backend-api
    `;

    // 4. Call Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      response_format: { type: "json_object" }
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || "{}";
    return JSON.parse(aiResponse);

  } catch (error) {
    console.error("❌ AI Service Error:", error);
    return null;
  }
};