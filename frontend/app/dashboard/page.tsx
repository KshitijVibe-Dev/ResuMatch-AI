"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion"; // ✅ Variants import kiya
import { 
  FaCloudUploadAlt, FaSignOutAlt, FaUser, FaFileAlt, 
  FaChartBar, FaLayerGroup, FaHistory, FaCheck, FaMagic, 
  FaQuestionCircle, FaSearch, FaLinkedin, FaTwitter, FaGithub, FaArrowRight 
} from "react-icons/fa";

// Resume Type
interface Resume {
  _id: string;
  fileName: string;
  aiScore: number;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Auth & Data Fetching
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");

    if (!token || !userInfo) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userInfo));

    fetch("http://localhost:5000/api/resume", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if(Array.isArray(data)) setResumes(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });

  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    router.push("/login");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert(`File Captured: ${e.dataTransfer.files[0].name}`);
    }
  };

  if (loading) return null;

  // --- ✅ ANIMATION VARIANTS (Fixed Types) ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 } // ✅ Fixed Error here
    }
  };

  return (
    // BACKGROUND: Light Blue Theme
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-300 overflow-x-hidden font-sans selection:bg-white/30 text-white pb-20">
      
      {/* === BACKGROUND CLOUDS (Moving) === */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <motion.div
            initial={{ x: "-10%", opacity: 0.3 }}
            animate={{ x: "110%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[-10%] w-[600px] h-[200px] bg-white/20 rounded-[100%] blur-[60px]"
        />
         <motion.div
            initial={{ x: "110%", opacity: 0.4 }}
            animate={{ x: "-10%" }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] right-[-10%] w-[500px] h-[300px] bg-white/10 rounded-[100%] blur-[80px]"
        />
      </div>

      {/* === NAVBAR === */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className="relative z-20 flex justify-between items-center max-w-7xl mx-auto px-6 py-6 border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0"
      >
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
                <div className="bg-white p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                    <FaLayerGroup className="text-blue-600 text-xl" />
                </div>
                <span className="text-xl font-bold tracking-wide">ResuMatch AI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-blue-50">
                {["Features", "How it Works", "Pricing"].map((item, i) => (
                    <a key={i} href="#" className="hover:text-white hover:scale-105 transition-all">{item}</a>
                ))}
            </div>
        </div>

        <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
                <p className="text-sm font-bold">{user?.name}</p>
                <p className="text-xs text-blue-100 opacity-80">Free Plan</p>
             </div>
             <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }} 
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout} 
                className="opacity-80 hover:opacity-100 transition text-white"
             >
                <FaSignOutAlt className="text-xl" />
             </motion.button>
        </div>
      </motion.nav>

      {/* === TOP CATEGORIES BAR (Slide In) === */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-md"
      >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4 overflow-x-auto no-scrollbar text-sm font-medium text-blue-50">
              <span className="opacity-70 flex items-center gap-2"><FaSearch /> Popular:</span>
              {["Software Engineer", "Product Manager", "Data Analyst", "Marketing Lead", "HR Specialist", "Sales Manager"].map((cat, i) => (
                  <motion.span 
                    key={i} 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                    className="bg-white/10 px-3 py-1 rounded-md cursor-pointer transition whitespace-nowrap border border-white/10"
                  >
                      {cat}
                  </motion.span>
              ))}
          </div>
      </motion.div>

      {/* === MAIN CONTENT (Staggered Animation) === */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 mt-8"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- LEFT SIDE (7 Columns) --- */}
            <div className="lg:col-span-7 space-y-10">
                
                {/* Hero Text */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-5xl font-extrabold leading-tight mb-4 drop-shadow-sm">
                        Optimize your <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">Resume in Seconds.</span>
                    </h1>
                    <p className="text-lg text-blue-50 max-w-xl leading-relaxed opacity-90">
                        Our AI analyzes your resume against millions of job descriptions to give you actionable feedback.
                    </p>
                </motion.div>

                {/* Stats Cards (Pop up on hover) */}
                <motion.div variants={itemVariants} className="flex gap-6">
                    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl w-40 flex flex-col justify-between shadow-lg cursor-default">
                        <FaFileAlt className="text-2xl opacity-80" />
                        <div>
                            <p className="text-3xl font-bold">{resumes.length}</p>
                            <p className="text-xs text-blue-100 uppercase tracking-wider mt-1">Total Scans</p>
                        </div>
                    </motion.div>
                    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl w-40 flex flex-col justify-between shadow-lg cursor-default">
                        <FaChartBar className="text-2xl opacity-80" />
                        <div>
                            <p className="text-3xl font-bold">
                                {resumes.length > 0 ? "72" : "0"}%
                            </p>
                            <p className="text-xs text-blue-100 uppercase tracking-wider mt-1">Avg Score</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* "How it Works" Section */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg transition-all">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaMagic /> How ResuMatch Works
                    </h3>
                    
                    <div className="grid gap-6">
                        {[
                            { id: 1, title: "Upload PDF", desc: "Drag and drop your resume." },
                            { id: 2, title: "AI Analysis", desc: "Engine scans for keywords & impact." },
                            { id: 3, title: "Get Hired", desc: "Receive score & improvement guide." }
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="bg-white/20 px-3 py-1 rounded text-lg font-bold">{step.id}</div>
                                <div>
                                    <h4 className="font-bold">{step.title}</h4>
                                    <p className="text-sm text-blue-50 opacity-80">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* --- RIGHT SIDE (5 Columns) --- */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* 1. UPLOAD BOX (Floating Animation) */}
                <motion.div 
                    variants={itemVariants}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} // FLOATING EFFECT
                    className="bg-white/20 backdrop-blur-xl border border-white/40 p-1 rounded-2xl shadow-2xl"
                >
                    <div className="bg-white/5 rounded-xl p-8 h-[350px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        
                        {/* Rotating Dashed Border on Hover */}
                        <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-xl m-4 group-hover:border-white/60 group-hover:scale-95 transition-all duration-300"></div>

                        <input type="file" className="hidden" id="resume-upload" accept=".pdf" onChange={(e) => alert(e.target.files?.[0]?.name)} />
                        <label 
                            htmlFor="resume-upload"
                            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                            className="absolute inset-0 z-20 cursor-pointer"
                        ></label>

                        <div className="z-10 pointer-events-none">
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                className="bg-white text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-transform duration-300"
                            >
                                <FaCloudUploadAlt className="text-3xl" />
                            </motion.div>
                            <h3 className="text-xl font-bold mb-1">Upload Resume</h3>
                            <p className="text-sm text-blue-100 opacity-80 px-4">
                                Drag & drop PDF or click to browse
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 2. RECENT ACTIVITY (List Items Animation) */}
                <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg flex-1 min-h-[250px]">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                        <FaHistory className="opacity-70" /> Recent Activity
                    </h3>

                    {resumes.length === 0 ? (
                        <div className="py-8 text-center text-white/60 text-sm">
                            <p>No scans yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {resumes.map((res, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }} // Staggered List
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    className="bg-white/5 p-3 rounded-lg flex items-center justify-between border border-white/5 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="bg-blue-500/20 p-2 rounded-lg text-white">
                                            <FaFileAlt className="text-sm" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white font-bold text-xs truncate w-24 sm:w-32">{res.fileName}</p>
                                            <p className="text-blue-200 text-[10px]">{new Date(res.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded text-xs font-bold border border-green-500/30">
                                        {res.aiScore}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

            </div>
        </div>

        {/* --- BOTTOM SECTION: FAQ & FOOTER (Fade Up) --- */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 border-t border-white/10 pt-10 pb-10"
        >
            
            {/* FAQ Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                    { icon: FaQuestionCircle, title: "Is it free?", desc: "Yes, up to 3 scans/day." },
                    { icon: FaCheck, title: "ATS Compatible?", desc: "100% compliant with standard ATS." },
                    { icon: FaMagic, title: "AI Accuracy", desc: "Powered by Llama-3 70B Engine." }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl transition cursor-default"
                    >
                        <item.icon className="text-2xl mb-4 opacity-70" />
                        <h4 className="font-bold mb-2">{item.title}</h4>
                        <p className="text-sm text-blue-100 opacity-70">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <footer className="flex flex-col md:flex-row justify-between items-center text-blue-100 opacity-60 text-sm">
                <p>&copy; 2026 ResuMatch AI. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    {[FaLinkedin, FaTwitter, FaGithub].map((Icon, i) => (
                        <a key={i} href="#" className="hover:text-white hover:scale-125 transition-transform"><Icon className="text-lg" /></a>
                    ))}
                </div>
            </footer>
        </motion.div>

      </motion.div>
    </div>
  );
}