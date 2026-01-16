"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowRight, FaSignInAlt, FaCheckCircle, FaStar } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  
  // 1. Form Data State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Input Change Handle Karna
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Form Submit Karna (Backend se connect)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Backend Login API Call
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Success: Token Save karein
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Login Successful! 🔓 Redirecting...");
      
      // Dashboard par bhejo
      router.push("/dashboard"); 

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const inputContainerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
  };

  return (
    // ✅ BACKGROUND: EXACT SAME AS REGISTER PAGE (Consistency)
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-300 overflow-hidden relative flex items-center justify-center p-4 font-sans selection:bg-white/30">
      
      {/* === LAYER 1: GLOW (Background Shine) === */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-white/20 rounded-full blur-[100px] mix-blend-overlay" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[80px] mix-blend-overlay" />
      </div>

       {/* === LAYER 2: VISIBLE CLOUDS (High Contrast) === */}
       <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          
          {/* Cloud 1 (Top Left) */}
          <motion.div
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "120%" }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[-10%] w-[500px] h-[180px] bg-white/40 rounded-[100%] blur-[50px]"
          />
          
          {/* Cloud 2 (Bottom Right) */}
          <motion.div
            initial={{ x: "100%", opacity: 0.6 }}
            animate={{ x: "-120%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] right-[-20%] w-[600px] h-[220px] bg-white/35 rounded-[100%] blur-[60px]"
          />

          {/* Cloud 3 (Center Moving) */}
          <motion.div
             animate={{ x: [-50, 50, -50], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[40%] left-[20%] w-[700px] h-[300px] bg-white/30 rounded-full blur-[70px]"
          />
       </div>


      {/* === FLOATING DECORATIVE ELEMENTS === */}
      
      {/* 1. Verified Badge (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }} 
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1, delay: 0.5 } }}
        className="hidden md:flex absolute top-[20%] right-[15%] z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl items-center gap-3 border border-white/60"
      >
        <div className="bg-blue-100 p-2 rounded-full text-blue-600 text-xl"><FaCheckCircle /></div>
        <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Account</p>
            <p className="text-sm font-extrabold text-blue-700">Verified</p>
        </div>
      </motion.div>

      {/* 2. Premium Badge (Bottom Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1, delay: 0.8 } }}
        className="hidden md:flex absolute bottom-[20%] left-[15%] z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl items-center gap-3 border border-white/60"
      >
        <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 text-xl"><FaStar /></div>
        <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Access</p>
            <p className="text-sm font-extrabold text-gray-800">Premium</p>
        </div>
      </motion.div>

      {/* --- MAIN GLASS CARD (Static Center) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[450px] bg-white/30 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] rounded-[3rem] p-8 sm:p-12 flex flex-col"
      >
        
        {/* --- BRAND HEADER --- */}
        <div className="flex flex-col items-center justify-center mb-10">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow-lg text-3xl mb-4">
                <FaSignInAlt />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md text-center">
                Welcome Back
            </h2>
            <p className="text-blue-50 text-sm font-semibold tracking-wide mt-2">
                Continue your career journey
            </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-red-500/20 border border-red-200/50 text-white p-3 rounded-xl mb-6 text-sm text-center font-semibold backdrop-blur-md"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Form Start */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <motion.div 
            custom={1} variants={inputContainerVariants} initial="hidden" animate="visible"
            className="relative group focus-within:scale-[1.02] transition-transform duration-200"
          >
            <FaEnvelope className="absolute left-5 top-4 text-blue-100 group-focus-within:text-white transition-colors z-10" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/40 text-white placeholder-blue-50 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:bg-white/30 focus:border-white/80 focus:ring-2 focus:ring-white/30 transition-all shadow-inner font-bold placeholder:font-normal"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div 
            custom={2} variants={inputContainerVariants} initial="hidden" animate="visible"
            className="relative group focus-within:scale-[1.02] transition-transform duration-200"
          >
            <FaLock className="absolute left-5 top-4 text-blue-100 group-focus-within:text-white transition-colors z-10" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/40 text-white placeholder-blue-50 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:bg-white/30 focus:border-white/80 focus:ring-2 focus:ring-white/30 transition-all shadow-inner font-bold placeholder:font-normal"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            variants={inputContainerVariants} custom={3} initial="hidden" animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-blue-600 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed tracking-wide text-lg mt-4"
          >
            {loading ? "Logging In..." : "Login to Dashboard"}
            {!loading && <FaArrowRight />}
          </motion.button>

        </form>

        {/* Footer Link */}
        <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-center text-blue-100 text-sm mt-8 font-medium"
        >
            Don't have an account?{" "}
            <Link href="/register" className="text-white font-bold hover:text-white transition-colors underline decoration-2 underline-offset-4 tracking-wide">
                Sign Up
            </Link>
        </motion.p>

      </motion.div>
    </div>
  );
}