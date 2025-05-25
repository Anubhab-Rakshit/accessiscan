"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, CheckCircle, Zap, Sparkles } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [url, setUrl] = useState("")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleScan = () => {
    if (url.trim()) {
      console.log("Scanning:", url)
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center spacing-section overflow-hidden">
      {/* Background Elements with very low opacity */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container-xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            {/* Floating badge with dark background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-black/60 border border-white/30 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-bold text-white force-visible">✨ Trusted by Fortune 500 companies</span>
            </motion.div>

            {/* Main headline with maximum contrast */}
            <div className="space-y-6 text-overlay">
              <h1 className="text-hero force-visible">AI-Powered Web</h1>

              <h1 className="text-hero force-visible">Accessibility That</h1>

              <div className="relative">
                <h1 className="text-hero text-gradient-bright">Actually Works</h1>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute bottom-2 left-0 w-full h-6 bg-blue-400/40 -z-10 origin-left rounded"
                />
              </div>
            </div>

            {/* Subtitle with dark background overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-overlay"
            >
              <p className="text-xl force-visible max-w-2xl leading-relaxed font-semibold">
                Scan, analyze, and fix accessibility issues in <span className="font-bold text-blue-300">seconds</span>.
                Enterprise-grade WCAG compliance powered by advanced AI that understands{" "}
                <span className="font-bold text-purple-300">context</span>, not just rules.
              </p>
            </motion.div>

            {/* CTA Section with maximum contrast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="space-y-6"
            >
              {/* URL Input with proper spacing and contrast */}
              <div className="form-group">
                <div className="form-row max-w-4xl">
                  <div className="flex-1 min-w-0">
                    <input
                      type="url"
                      placeholder="Enter your website URL to get started..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="input-field w-full text-lg py-4 px-6"
                      style={{ color: "#1f2937 !important" }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={handleScan}
                      className="btn btn-primary text-lg py-4 px-8 flex items-center gap-3 group min-w-fit"
                    >
                      <Zap className="w-5 h-5" />
                      <span className="font-bold">Scan Now</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust indicators with dark backgrounds */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm bg-black/40 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-bold force-visible">Free for personal use</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-black/40 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-bold force-visible">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-black/40 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-bold force-visible">GDPR compliant</span>
                </div>
              </div>
            </motion.div>

            {/* Company logos with maximum contrast */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="pt-8 border-t border-white/20 text-overlay"
            >
              <p className="text-sm force-visible mb-6 font-bold">🚀 Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"].map((company, i) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 + i * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-lg lg:text-xl font-bold force-visible hover:text-blue-300 transition-all duration-300 cursor-pointer bg-black/30 px-4 py-2 rounded-lg"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Demo Image */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative bg-black/60 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/accessibility-dashboard.png"
                  alt="AccessiScan Dashboard"
                  className="w-full h-auto opacity-90"
                />

                {/* Floating elements with maximum contrast */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-3 border border-white/20"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">WCAG AA Compliant</div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-6 left-6 bg-blue-600/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg border border-blue-500/20"
                >
                  <div className="text-sm font-bold text-white">Accessibility Score</div>
                  <div className="text-2xl font-black text-white">98/100</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with maximum contrast */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 bg-black/50 px-4 py-3 rounded-full"
      >
        <span className="text-sm force-visible font-bold">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
