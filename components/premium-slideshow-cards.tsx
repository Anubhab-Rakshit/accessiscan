"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, Zap, Shield, Brain, Code, Users, Star, ArrowRight } from "lucide-react"
import { PremiumCard } from "@/components/premium-card-redesign"

interface SlideData {
  id: number
  title: string
  subtitle: string
  description: string
  icon: any
  gradient: string
  stats: { label: string; value: string }[]
  features: string[]
  color: string
  bgPattern: "dots" | "grid" | "waves" | "none"
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "AI-Powered Analysis",
    subtitle: "Next-Generation Intelligence",
    description:
      "Revolutionary machine learning algorithms that understand context, semantics, and user intent to deliver unprecedented accuracy in accessibility detection.",
    icon: Brain,
    gradient: "from-purple-600 via-blue-600 to-cyan-500",
    color: "#8b5cf6",
    bgPattern: "dots",
    stats: [
      { label: "Accuracy Rate", value: "99.7%" },
      { label: "Processing Speed", value: "0.3s" },
      { label: "Languages", value: "40+" },
    ],
    features: [
      "Deep learning neural networks",
      "Contextual understanding",
      "Multi-language support",
      "Real-time processing",
    ],
  },
  {
    id: 2,
    title: "Lightning Scanner",
    subtitle: "Unmatched Performance",
    description:
      "Distributed cloud architecture that processes thousands of pages simultaneously, delivering comprehensive reports in seconds, not hours.",
    icon: Zap,
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    color: "#f59e0b",
    bgPattern: "waves",
    stats: [
      { label: "Pages/Second", value: "10,000+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Global CDN", value: "50+" },
    ],
    features: ["Distributed processing", "Edge computing", "Auto-scaling infrastructure", "Real-time monitoring"],
  },
  {
    id: 3,
    title: "WCAG Compliance",
    subtitle: "Industry Standard",
    description:
      "Complete coverage of WCAG 2.1 Level A, AA, and AAA guidelines with automated testing and validation across all modern browsers and devices.",
    icon: Shield,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    color: "#10b981",
    bgPattern: "grid",
    stats: [
      { label: "WCAG Coverage", value: "100%" },
      { label: "Test Cases", value: "500+" },
      { label: "Browsers", value: "15+" },
    ],
    features: ["WCAG 2.1 A/AA/AAA", "Cross-browser testing", "Mobile accessibility", "Screen reader validation"],
  },
  {
    id: 4,
    title: "Code Generator",
    subtitle: "Intelligent Automation",
    description:
      "Advanced AI generates production-ready code fixes tailored to your specific framework, reducing manual work by 95% while maintaining code quality.",
    icon: Code,
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    color: "#6366f1",
    bgPattern: "dots",
    stats: [
      { label: "Frameworks", value: "25+" },
      { label: "Fix Accuracy", value: "98.5%" },
      { label: "Time Saved", value: "95%" },
    ],
    features: [
      "Framework-specific fixes",
      "Production-ready code",
      "Version control integration",
      "Custom rule engine",
    ],
  },
  {
    id: 5,
    title: "Team Collaboration",
    subtitle: "Enterprise Ready",
    description:
      "Comprehensive collaboration platform with role-based access, real-time updates, progress tracking, and seamless integration with your existing workflow.",
    icon: Users,
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    color: "#ec4899",
    bgPattern: "waves",
    stats: [
      { label: "Team Members", value: "Unlimited" },
      { label: "Integrations", value: "50+" },
      { label: "SSO Support", value: "✓" },
    ],
    features: ["Real-time collaboration", "Role-based permissions", "Progress tracking", "API integrations"],
  },
]

export function PremiumSlideshowCards() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [direction, setDirection] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)
  const controls = useAnimation()

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const playTransitionSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    playTransitionSound()
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    playTransitionSound()
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    playTransitionSound()
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic background based on current slide */}
      <motion.div
        key={currentSlide}
        className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} opacity-10`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: currentSlideData.color }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-full backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Star className="w-5 h-5 text-yellow-400" />
            </motion.div>
            <span className="text-sm font-semibold">Premium Features Showcase</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Revolutionary
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Accessibility Platform
            </span>
          </h2>
        </motion.div>

        {/* Main slideshow */}
        <div className="relative max-w-7xl mx-auto">
          {/* Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>

              <div className="text-sm text-gray-600">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={prevSlide}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Slide content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction * 300, rotateY: direction * 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -300, rotateY: direction * -15 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${currentSlideData.color}20, ${currentSlideData.color}40)`,
                      }}
                    >
                      <currentSlideData.icon className="w-8 h-8" style={{ color: currentSlideData.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">{currentSlideData.subtitle}</div>
                      <h3 className="text-3xl font-bold">{currentSlideData.title}</h3>
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-lg text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentSlideData.description}
                  </motion.p>
                </div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentSlideData.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold" style={{ color: currentSlideData.color }}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Features */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {currentSlideData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentSlideData.color }} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                  <motion.button
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Feature
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right content - Interactive card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <PremiumCard
                  variant="holographic"
                  size="xl"
                  interactive={true}
                  hoverEffect="tilt"
                  shadowIntensity="extreme"
                  backgroundPattern={currentSlideData.bgPattern}
                  className="relative overflow-hidden"
                  glowColor={`${currentSlideData.color}80`}
                >
                  <div className="relative h-96 flex items-center justify-center">
                    {/* Dynamic background pattern */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} opacity-20`}
                      animate={{
                        background: [
                          `linear-gradient(45deg, ${currentSlideData.color}20, transparent)`,
                          `linear-gradient(135deg, transparent, ${currentSlideData.color}20)`,
                          `linear-gradient(225deg, ${currentSlideData.color}20, transparent)`,
                          `linear-gradient(315deg, transparent, ${currentSlideData.color}20)`,
                        ],
                      }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                    />

                    {/* Central icon */}
                    <motion.div
                      className="relative z-10"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div
                        className="w-32 h-32 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20"
                        style={{
                          background: `linear-gradient(135deg, ${currentSlideData.color}40, ${currentSlideData.color}20)`,
                        }}
                      >
                        <currentSlideData.icon className="w-16 h-16 text-white" />
                      </div>
                    </motion.div>

                    {/* Floating elements */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full"
                        style={{ backgroundColor: currentSlideData.color }}
                        animate={{
                          x: [0, Math.cos((i * 60 * Math.PI) / 180) * 100],
                          y: [0, Math.sin((i * 60 * Math.PI) / 180) * 100],
                          opacity: [0, 0.6, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>
                </PremiumCard>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Audio for transitions */}
      <audio ref={audioRef} preload="auto">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
          type="audio/wav"
        />
      </audio>
    </section>
  )
}
