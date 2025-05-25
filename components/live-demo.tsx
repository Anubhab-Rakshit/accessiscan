"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Loader2,
  X,
  Zap,
  Globe,
  Search,
  ArrowRight,
  Target,
  Brain,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function LiveDemo() {
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [url, setUrl] = useState("https://example.com")
  const [isValidUrl, setIsValidUrl] = useState(true)
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [8, -8]))
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]))

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    try {
      new URL(e.target.value)
      setIsValidUrl(true)
    } catch {
      setIsValidUrl(false)
    }
  }

  const handleScan = () => {
    if (!isValidUrl) return

    setIsScanning(true)
    setShowResults(false)

    setTimeout(() => {
      setIsScanning(false)
      setShowResults(true)
    }, 3000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <section id="demo" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Rich dark background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Animated circuit pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Ccircle cx='51' cy='9' r='2'/%3E%3Ccircle cx='9' cy='51' r='2'/%3E%3Ccircle cx='51' cy='51' r='2'/%3E%3Cpath d='M9 9h42v2H9zM9 51h42v2H9zM9 9v42h2V9zM51 9v42h2V9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating tech elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
          </motion.div>
        ))}
      </div>

      <div className="container-xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-full mb-8 shadow-2xl border border-white/20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Brain className="w-6 h-6" />
            </motion.div>
            <span className="font-bold text-lg">Interactive Demo</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Target className="w-6 h-6" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-7xl font-bold mb-8 text-white"
            animate={{
              textShadow: isInView
                ? ["0 0 0px rgba(255,255,255,0.5)", "0 0 50px rgba(59,130,246,0.8)", "0 0 0px rgba(255,255,255,0.5)"]
                : ["0 0 0px rgba(255,255,255,0.5)"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              See It In Action
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-2xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            Experience the power of AI-driven accessibility analysis. Try our live demo and see instant results.
          </motion.p>
        </motion.div>

        {/* Enhanced Demo Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 20 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-gray-800/90 via-slate-800/90 to-gray-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden"
        >
          {/* Enhanced URL Input Section */}
          <div className="p-12 border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-gray-800/50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
                className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <label className="text-2xl font-bold text-white">Website URL</label>
            </motion.div>

            <div className="flex gap-8">
              <div className="relative flex-1 group">
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl opacity-0 blur-lg transition-opacity duration-500"
                  animate={{
                    opacity: isValidUrl ? [0, 0.4, 0] : [0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.input
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  className={cn(
                    "relative w-full px-8 py-6 text-xl bg-gray-900/80 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 outline-none font-medium text-white placeholder-white/50",
                    isValidUrl
                      ? "border-cyan-500/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20"
                      : "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20",
                  )}
                  placeholder="Enter website URL to analyze..."
                  whileFocus={{ scale: 1.02 }}
                />

                {url && (
                  <motion.div
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isValidUrl ? (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(34, 197, 94, 0.4)",
                            "0 0 0 10px rgba(34, 197, 94, 0)",
                            "0 0 0 0 rgba(34, 197, 94, 0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                        className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <X className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Ultra Enhanced Scan Button */}
              <motion.button
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onClick={handleScan}
                disabled={isScanning || !isValidUrl}
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Multi-layer glow effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl opacity-0 blur-2xl"
                  animate={{
                    opacity: isHovered ? 0.8 : 0,
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 blur-lg"
                  animate={{
                    opacity: isHovered ? 0.6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Main button with enhanced styling */}
                <motion.div
                  className={cn(
                    "relative px-12 py-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 border border-white/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                  animate={{
                    scale: isPressed ? 0.95 : 1,
                    rotateX: isHovered ? 8 : 0,
                    rotateY: isHovered ? 8 : 0,
                    boxShadow: isHovered
                      ? [
                          "0 20px 40px rgba(59, 130, 246, 0.3)",
                          "0 25px 50px rgba(59, 130, 246, 0.4)",
                          "0 20px 40px rgba(59, 130, 246, 0.3)",
                        ]
                      : ["0 10px 20px rgba(0, 0, 0, 0.3)"],
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%"],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isPressed ? { scale: 3, opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Button content */}
                  <div className="relative z-10 flex items-center gap-4 text-xl">
                    {isScanning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Loader2 className="w-7 h-7" />
                        </motion.div>
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          Scanning...
                        </motion.span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          animate={{
                            scale: isHovered ? [1, 1.3, 1] : [1],
                            rotate: isHovered ? [0, 360] : [0],
                          }}
                          transition={{
                            scale: { duration: 0.6, repeat: Number.POSITIVE_INFINITY },
                            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                          }}
                        >
                          <Search className="w-7 h-7" />
                        </motion.div>
                        <span>Start Scan</span>
                        <motion.div animate={{ x: isHovered ? 8 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                          <ArrowRight className="w-7 h-7" />
                        </motion.div>
                      </>
                    )}
                  </div>

                  {/* Enhanced floating particles */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                            opacity: 0,
                          }}
                          animate={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.button>
            </div>

            {!isValidUrl && url && (
              <motion.p
                className="mt-6 text-red-400 font-semibold flex items-center gap-3 text-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertTriangle className="w-5 h-5" />
                Please enter a valid URL including http:// or https://
              </motion.p>
            )}
          </div>

          {/* Enhanced Scanning Animation */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-gradient-to-br from-gray-900/80 to-slate-900/80"
              >
                <div className="p-24 flex flex-col items-center justify-center">
                  <div className="relative mb-16">
                    {/* Multiple rotating rings */}
                    <motion.div
                      className="w-48 h-48 border-4 border-cyan-500/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-4 border-4 border-blue-500/30 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-8 border-4 border-purple-500/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />

                    {/* Enhanced progress ring */}
                    <svg className="absolute inset-0 w-48 h-48 -rotate-90">
                      <circle cx="96" cy="96" r="88" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="url(#scanGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        style={{ strokeDasharray: "553", strokeDashoffset: "553" }}
                      />
                      <defs>
                        <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Enhanced center AI indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 0 30px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <motion.span
                          className="text-white font-bold text-2xl"
                          animate={{
                            textShadow: [
                              "0 0 0px rgba(255,255,255,0.5)",
                              "0 0 20px rgba(255,255,255,0.8)",
                              "0 0 0px rgba(255,255,255,0.5)",
                            ],
                          }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          AI
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Enhanced floating elements */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          x: Math.cos((i * 45 * Math.PI) / 180) * 120,
                          y: Math.sin((i * 45 * Math.PI) / 180) * 120,
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  <div className="space-y-6 text-center max-w-lg">
                    {[
                      "Analyzing HTML structure...",
                      "Checking WCAG compliance...",
                      "Generating recommendations...",
                    ].map((text, i) => (
                      <motion.p
                        key={text}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 1 + 0.5 }}
                        className="text-white text-xl font-semibold"
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Results Section */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-800/90 to-slate-900/90"
              >
                {/* Enhanced Score Overview */}
                <div className="p-12 border-b border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="bg-gradient-to-br from-gray-700/50 to-slate-800/50 border border-white/10 p-8 text-center rounded-2xl shadow-xl hover:shadow-2xl transition-shadow backdrop-blur-sm"
                    >
                      <div className="relative mb-6">
                        <svg className="w-36 h-36 mx-auto" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray="283"
                            initial={{ strokeDashoffset: 283 }}
                            animate={{ strokeDashoffset: 283 - (283 * 68) / 100 }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                          />
                          <defs>
                            <linearGradient id="scoreGradient">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className="text-5xl font-bold text-white"
                          >
                            68
                          </motion.span>
                        </div>
                      </div>
                      <div className="text-white/80 font-semibold text-lg">Overall Score</div>
                    </motion.div>

                    {[
                      {
                        label: "Critical Issues",
                        value: 3,
                        color: "red",
                        icon: X,
                        gradient: "from-red-500 to-rose-600",
                      },
                      {
                        label: "Warnings",
                        value: 8,
                        color: "orange",
                        icon: AlertTriangle,
                        gradient: "from-orange-500 to-amber-600",
                      },
                      {
                        label: "Passed Checks",
                        value: 24,
                        color: "green",
                        icon: Check,
                        gradient: "from-green-500 to-emerald-600",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                        className="bg-gradient-to-br from-gray-700/50 to-slate-800/50 border border-white/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <motion.div
                            className={cn(
                              "w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r",
                              item.gradient,
                            )}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                          >
                            <item.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="text-5xl font-bold text-white"
                          >
                            {item.value}
                          </motion.span>
                        </div>
                        <div className="text-white/80 font-semibold text-lg">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Tabs */}
                <div className="border-b border-white/10 bg-gray-800/30">
                  <div className="flex">
                    {["Overview", "Issues", "Suggestions"].map((tab) => (
                      <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={cn(
                          "px-10 py-6 font-bold transition-all duration-300 relative text-lg",
                          activeTab === tab.toLowerCase()
                            ? "text-cyan-400 bg-gray-700/50"
                            : "text-white/70 hover:text-white hover:bg-gray-700/30",
                        )}
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                      >
                        {tab}
                        {activeTab === tab.toLowerCase() && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Tab Content */}
                <div className="p-12">
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-3xl font-bold mb-8 text-white">Accessibility Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div>
                            <h4 className="font-bold mb-6 text-xl text-white">WCAG Compliance</h4>
                            <div className="space-y-6">
                              {["Perceivable", "Operable", "Understandable", "Robust"].map((principle, i) => (
                                <div key={principle} className="flex items-center justify-between">
                                  <span className="font-semibold text-white">{principle}</span>
                                  <div className="flex items-center gap-4">
                                    <div className="w-48 h-4 bg-gray-700 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${65 + i * 5}%` }}
                                        transition={{ duration: 2, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                                      />
                                    </div>
                                    <span className="font-bold text-white min-w-[3rem] text-lg">{65 + i * 5}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold mb-6 text-xl text-white">Top Issues</h4>
                            <ul className="space-y-4">
                              {[
                                { icon: X, text: "Missing alt text on 12 images", color: "red" },
                                { icon: AlertTriangle, text: "Low contrast text in navigation", color: "orange" },
                                { icon: AlertTriangle, text: "Form inputs missing labels", color: "orange" },
                                { icon: AlertTriangle, text: "Keyboard navigation issues", color: "orange" },
                              ].map((issue, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-700/30 transition-colors"
                                >
                                  <issue.icon
                                    className={cn(
                                      "w-6 h-6 mt-0.5 flex-shrink-0",
                                      issue.color === "red" ? "text-red-400" : "text-orange-400",
                                    )}
                                  />
                                  <span className="text-white/90 text-lg">{issue.text}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "issues" && (
                      <motion.div
                        key="issues"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-3xl font-bold mb-8 text-white">Detailed Issues</h3>
                        <div className="space-y-6">
                          {[
                            {
                              type: "critical",
                              title: "Images missing alt text",
                              count: 12,
                              impact: "Screen readers cannot describe images",
                              wcag: "1.1.1 Non-text Content (Level A)",
                            },
                            {
                              type: "warning",
                              title: "Insufficient color contrast",
                              count: 5,
                              impact: "Text may be hard to read for users with low vision",
                              wcag: "1.4.3 Contrast (Minimum) (Level AA)",
                            },
                            {
                              type: "warning",
                              title: "Missing form labels",
                              count: 3,
                              impact: "Screen reader users may not understand form purpose",
                              wcag: "3.3.2 Labels or Instructions (Level A)",
                            },
                          ].map((issue, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="border border-white/10 hover:border-white/20 transition-all duration-300 rounded-xl overflow-hidden hover:shadow-xl bg-gray-700/30 backdrop-blur-sm"
                              whileHover={{ y: -3 }}
                            >
                              <div className="p-8 flex items-start justify-between cursor-pointer">
                                <div className="flex items-start gap-6">
                                  <div
                                    className={cn(
                                      "w-4 h-4 rounded-full mt-2 flex-shrink-0",
                                      issue.type === "critical" ? "bg-red-500" : "bg-orange-500",
                                    )}
                                  />
                                  <div>
                                    <h4 className="font-bold text-xl mb-3 text-white">{issue.title}</h4>
                                    <p className="text-white/80 mb-3 text-lg">{issue.impact}</p>
                                    <p className="text-white/60">{issue.wcag}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-bold text-white text-lg">{issue.count} instances</span>
                                  <ChevronRight className="w-6 h-6 text-white/60" />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "suggestions" && (
                      <motion.div
                        key="suggestions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-3xl font-bold mb-8 text-white">AI-Powered Suggestions</h3>
                        <div className="space-y-8">
                          <motion.div
                            className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-8 border border-cyan-500/30 rounded-2xl backdrop-blur-sm"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <h4 className="font-bold mb-6 text-xl flex items-center gap-3 text-white">
                              <Zap className="w-6 h-6 text-cyan-400" />
                              Quick Wins (Implement Today)
                            </h4>
                            <ul className="space-y-6">
                              {[
                                {
                                  title: "Add descriptive alt text to all images",
                                  description: "This will immediately improve screen reader experience",
                                },
                                {
                                  title: "Increase text contrast in navigation menu",
                                  description: "Change text color from #999 to #666 for WCAG AA compliance",
                                },
                              ].map((item, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-4"
                                >
                                  <motion.div
                                    className="w-10 h-10 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0"
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                  >
                                    <Check className="w-5 h-5 text-green-400" />
                                  </motion.div>
                                  <div>
                                    <p className="font-bold text-white text-lg">{item.title}</p>
                                    <p className="text-white/80 mt-2">{item.description}</p>
                                  </div>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>

                          <motion.div
                            className="bg-gray-800/50 p-8 border border-white/10 rounded-2xl backdrop-blur-sm"
                            whileHover={{ scale: 1.01 }}
                          >
                            <h4 className="font-bold mb-6 text-xl text-white">Code Example</h4>
                            <div className="space-y-6">
                              <div className="bg-gray-900/80 p-6 border border-red-500/30 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                  <span className="font-semibold text-red-400 text-lg">Before</span>
                                  <motion.button
                                    className="text-white/70 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Copy
                                  </motion.button>
                                </div>
                                <pre className="text-base font-mono overflow-x-auto p-4 bg-black/50 rounded-lg border border-white/10 text-white">
                                  {`<img src="hero.jpg">`}
                                </pre>
                              </div>
                              <div className="bg-gray-900/80 p-6 border border-green-500/30 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                  <span className="font-semibold text-green-400 text-lg">After</span>
                                  <motion.button
                                    className="text-white/70 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Copy
                                  </motion.button>
                                </div>
                                <pre className="text-base font-mono overflow-x-auto p-4 bg-black/50 rounded-lg border border-white/10 text-white">
                                  {`<img src="hero.jpg" alt="Team collaborating in modern office space">`}
                                </pre>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
