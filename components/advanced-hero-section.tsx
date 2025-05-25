"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion"
import { ArrowRight, CheckCircle, Zap, Sparkles, Play } from "lucide-react"
import { PremiumCard } from "@/components/premium-card-redesign"
import { SplitTextReveal } from "@/components/split-text-reveal"
import { MagneticButton } from "@/components/magnetic-button"

export function AdvancedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Spring physics for smooth animations
  const springY = useSpring(y, { damping: 20, stiffness: 100 })
  const springOpacity = useSpring(opacity, { damping: 20, stiffness: 100 })
  const springScale = useSpring(scale, { damping: 20, stiffness: 100 })

  // Floating animation for elements
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  useEffect(() => {
    // Staggered entrance animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    })
  }, [controls])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
          className="absolute bottom-40 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-orange-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 4 },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
        />

        {/* Animated grid */}
        <motion.div
          style={{ y: springY, opacity: springOpacity }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"
        />

        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container-xl mx-auto relative z-10"
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-blue-600" />
              </motion.div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by Fortune 500 companies worldwide
              </span>
            </motion.div>

            {/* Main headline with advanced text animations */}
            <div className="space-y-4">
              <SplitTextReveal
                text="AI-Powered Web"
                animation="glitch"
                splitBy="chars"
                delay={0.5}
                staggerChildren={0.05}
                as="h1"
                className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
                glitchIntensity={2}
              />

              <div className="relative">
                <SplitTextReveal
                  text="Accessibility That"
                  animation="slide"
                  splitBy="words"
                  direction="left"
                  delay={1.2}
                  staggerChildren={0.1}
                  as="h1"
                  className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
                />
              </div>

              <div className="relative inline-block">
                <SplitTextReveal
                  text="Actually Works"
                  animation="wave"
                  splitBy="chars"
                  delay={1.8}
                  staggerChildren={0.08}
                  as="h1"
                  className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  waveFrequency={0.1}
                />

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                />
              </div>
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="max-w-2xl"
            >
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Scan, analyze, and fix accessibility issues in{" "}
                <span className="font-semibold text-blue-600">seconds</span>. Enterprise-grade WCAG compliance powered
                by advanced AI that understands <span className="font-semibold text-purple-600">context</span>, not just
                rules.
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="space-y-6"
            >
              {/* URL Input */}
              <div className="relative max-w-2xl">
                <div className="relative group">
                  <input
                    type="url"
                    placeholder="Enter your website URL to get started..."
                    className="w-full px-8 py-6 pr-48 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none shadow-lg group-hover:shadow-xl"
                  />
                  <MagneticButton
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 group shadow-lg"
                    strength={30}
                    glowColor="rgba(59, 130, 246, 0.8)"
                  >
                    <Zap className="w-5 h-5" />
                    Scan Now
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </MagneticButton>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Free for personal use</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">GDPR compliant</span>
                </div>
              </div>
            </motion.div>

            {/* Company logos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
              className="pt-12 border-t border-gray-200/50"
            >
              <p className="text-sm text-gray-500 mb-6 font-medium">Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center gap-12 opacity-60">
                {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"].map((company, i) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5 + i * 0.1, duration: 0.6 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-all duration-300 cursor-pointer"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              className="relative"
            >
              <PremiumCard
                variant="holographic"
                size="xl"
                interactive={true}
                hoverEffect="tilt"
                shadowIntensity="extreme"
                backgroundPattern="grid"
                className="relative overflow-hidden"
              >
                {/* Video/Demo content */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden">
                  {/* Placeholder for demo video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />

                  {/* Play button overlay */}
                  <motion.button
                    onClick={handleVideoPlay}
                    className="absolute inset-0 flex items-center justify-center group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </motion.div>
                  </motion.button>

                  {/* Demo stats overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <motion.div
                      animate={floatingAnimation}
                      className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
                    >
                      <div className="text-sm font-semibold text-gray-800">Scan Progress</div>
                      <div className="text-2xl font-bold text-blue-600">87%</div>
                    </motion.div>

                    <motion.div
                      animate={{
                        ...floatingAnimation,
                        transition: { ...floatingAnimation.transition, delay: 1 },
                      }}
                      className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
                    >
                      <div className="text-sm font-semibold text-gray-800">Issues Found</div>
                      <div className="text-2xl font-bold text-red-500">23</div>
                    </motion.div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      animate={{
                        ...floatingAnimation,
                        transition: { ...floatingAnimation.transition, delay: 2 },
                      }}
                      className="bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-white"
                    >
                      <div className="text-sm font-semibold">WCAG Score</div>
                      <div className="text-2xl font-bold">98/100</div>
                    </motion.div>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="mt-6 space-y-4">
                  {[
                    { icon: "🚀", text: "Instant AI Analysis" },
                    { icon: "🎯", text: "Precise Issue Detection" },
                    { icon: "⚡", text: "Real-time Fixes" },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 + i * 0.2, duration: 0.6 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </PremiumCard>

              {/* Floating elements around the card */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-sm text-gray-500 font-medium">Discover more</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
