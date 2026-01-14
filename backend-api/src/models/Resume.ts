import mongoose, { Document, Schema } from "mongoose";

// TypeScript ke liye Type define kiya
export interface IResume extends Document {
  user: mongoose.Schema.Types.ObjectId;
  fileName: string;
  filePath: string;
  aiScore?: number;        // New: AI ka Score
  summary?: string;        // New: Profile Summary
  skills?: string[];       // New: Skills List
  suggestions?: string[];  // New: Sudhaar ke sujhaav
  createdAt: Date;
}

const ResumeSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    // --- 🤖 New AI Fields ---
    aiScore: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      default: ""
    },
    skills: {
      type: [String], // Array of Strings
      default: []
    },
    suggestions: {
      type: [String],
      default: []
    },
    // ------------------------
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResume>("Resume", ResumeSchema);