import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ Added JWT import
import User from "../models/User";

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1. Check karein user pehle se hai ya nahi
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // 2. Password encrypt karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Naya user banayein
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        message: "User Registered Successfully! 🎉"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Check karein user exist karta hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials (User not found)" });
      return;
    }

    // 2. Password match karein
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials (Wrong Password)" });
      return;
    }

    // 3. Token generate karein (Digital ID Card)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d", // Token 1 din ke liye valid rahega
    });

    // 4. Success Response bhejain
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
      message: "Login Successful! 🔓"
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
};