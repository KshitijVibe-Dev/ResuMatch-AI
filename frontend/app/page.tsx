"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRocket, FaCheckCircle, FaUserTie, FaFileAlt } from "react-icons/fa";

export default function Home() {
  return (
    // 1. BACKGROUND: Deep Blue Gradient (Asli Asman)
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-300 overflow-hidden relative flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-white/30">
      
      {/* --- ANIMATED CLOUDS (Background Blobs) --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Big White Glow Center */}
        <motion.div 
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[800px] h-[800px] bg-white/20 rounded-full blur-[120px]"
        />
        {/* Moving Deep Blue Blob */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-800/40 rounded-full blur-[100px]"
        />
      </div>


      {/* --- 2. MAIN GLASS CONTAINER (Heavy Frost) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl min-h-[85vh] bg-white/20 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[3rem] overflow-hidden flex flex-col"
      >
        
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 md:px-10 py-6 border-b border-white/20">
          <div className="flex items-center gap-2">
            <div className="bg-white text-blue-600 p-2 rounded-lg shadow-lg">
              <FaRocket />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide drop-shadow-md">ResuMatch AI</span>
          </div>
          <div className="hidden md:flex gap-8 text-white/90 font-medium text-sm">
            <Link href="#" className="hover:text-white transition drop-shadow-sm">Features</Link>
            <Link href="#" className="hover:text-white transition drop-shadow-sm">How it Works</Link>
            <Link href="#" className="hover:text-white transition drop-shadow-sm">Pricing</Link>
          </div>
          <Link href="/login">
            <button className="px-6 py-2.5 bg-white text-blue-600 rounded-full text-sm font-bold hover:bg-blue-50 transition shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transform duration-200">
              Join Waitlist
            </button>
          </Link>
        </nav>


        {/* Hero Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-12">
          
          {/* Left Side: Text */}
          <div className="flex-1 text-center md:text-left space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] drop-shadow-lg"
            >
              Resume Perfect, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 drop-shadow-none">Hired Faster.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-blue-50 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium"
            >
              Stop guessing. Our AI analyzes your resume against millions of job descriptions to give you the competitive edge you deserve.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/login">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl text-lg font-bold shadow-2xl hover:scale-105 transition transform border border-white/50">
                  Get Started Free
                </button>
              </Link>
              <Link href="/register">
                 <button className="px-8 py-4 bg-blue-900/30 text-white border border-white/40 rounded-2xl text-lg font-bold hover:bg-blue-900/50 transition backdrop-blur-md">
                  View Demo
                </button>
              </Link>
            </motion.div>

            <div className="pt-8 flex items-center justify-center md:justify-start gap-4 text-sm text-blue-100 font-medium">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map((i) => (
                   <div key={i} className={`w-10 h-10 rounded-full border-2 border-white/50 bg-gray-300 flex items-center justify-center overflow-hidden shadow-lg`}>
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                   </div>
                 ))}
               </div>
               <p className="drop-shadow-md">Trusted by 10,000+ Job Seekers</p>
            </div>
          </div>


          {/* Right Side: Floating Glass Visuals (More Solid) */}
          <div className="flex-1 relative w-full h-[400px] flex items-center justify-center">
             
             {/* Main Card */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-20 bg-white/70 backdrop-blur-3xl p-6 rounded-3xl border border-white/80 shadow-[0_30px_60px_-12px_rgba(50,50,93,0.25)] w-80"
             >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl shadow-inner">
                    <FaUserTie />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Rahul Sharma</h3>
                    <p className="text-sm text-slate-500 font-medium">Senior Software Engineer</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                    <div className="flex justify-between text-sm font-semibold text-slate-600">
                        <span>Skills Match</span>
                        <span className="text-blue-600">92%</span>
                    </div>
                    <div className="h-3 bg-blue-100 rounded-full w-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "92%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
                        />
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <div className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Strong Candidate
                    </div>
                    <span className="text-xs text-slate-400">Just now</span>
                </div>
             </motion.div>

             {/* Floating Badge 1: Hired */}
             <motion.div 
               animate={{ y: [0, 20, 0], x: [0, 15, 0], rotate: [6, 10, 6] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-0 right-5 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-green-400 ring-4 ring-white/30 backdrop-blur-sm"
             >
                <div className="bg-white rounded-full p-1 text-green-600 text-xs"><FaCheckCircle /></div>
                <span className="font-bold tracking-wide">Hired!</span>
             </motion.div>

             {/* Floating Badge 2: Resume Icon */}
             <motion.div npm run dev
               animate={{ y: [0, -20, 0], x: [0, -15, 0], rotate: [-6, -10, -6] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="absolute bottom-10 left-5 bg-white p-4 rounded-2xl shadow-2xl border border-white/60 -rotate-6 ring-4 ring-white/30"
             >
               <div className="flex items-center gap-3">
                 <div className="bg-orange-100 p-3 rounded-xl text-orange-500 text-xl"><FaFileAlt /></div>
                 <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">ATS Score</p>
                    <p className="text-xl font-extrabold text-slate-800">98/100</p>
                 </div>
               </div>
             </motion.div>

          </div>
        </div>

      </motion.div>
    </main>
  );
}