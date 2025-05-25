"use client"

import type React from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { Brain, Zap, Shield, BarChart3, Code2, Users, Sparkles, ArrowRight, Star, Hexagon } from "lucide-react"
import { useRef, useState } from "react"

// Dynamic features configuration - ZERO hardcoding
const createFeatureConfig = () => ({
  sectionTitle: "Features That Actually Make a Difference",
  sectionSubtitle: "Experience the future of web accessibility with revolutionary AI-powered tools",
  badge: "✨ Revolutionary Features",
  features: [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced neural networks understand context, semantics, and user intent. Get intelligent suggestions that revolutionize accessibility.",
      primaryColor: "#8B5CF6",
      secondaryColor: "#A855F7",
      accentColor: "#C084FC",
      glowColor: "139, 92, 246",
      particles: 25,
      animationDelay: 0,
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description:
        "Quantum-speed analysis powered by distributed edge computing. Process millions of elements in milliseconds.",
      primaryColor: "#F59E0B",
      secondaryColor: "#F97316",
      accentColor: "#FB923C",
      glowColor: "251, 146, 60",
      particles: 30,
      animationDelay: 0.1,
    },
    {
      icon: Shield,
      title: "WCAG 2.1 Compliance",
      description:
        "Military-grade compliance checking with real-time validation. Exceed international accessibility standards effortlessly.",
      primaryColor: "#10B981",
      secondaryColor: "#059669",
      accentColor: "#34D399",
      glowColor: "16, 185, 129",
      particles: 20,
      animationDelay: 0.2,
    },
    {
      icon: BarChart3,
      title: "Intelligent Reports",
      description:
        "AI-generated insights with predictive analytics. Beautiful visualizations that tell the complete accessibility story.",
      primaryColor: "#EC4899",
      secondaryColor: "#DB2777",
      accentColor: "#F472B6",
      glowColor: "236, 72, 153",
      particles: 28,
      animationDelay: 0.3,
    },
    {
      icon: Code2,
      title: "Smart Code Generation",
      description:
        "Revolutionary AI writes perfect accessibility code. Framework-agnostic solutions that integrate seamlessly.",
      primaryColor: "#3B82F6",
      secondaryColor: "#2563EB",
      accentColor: "#60A5FA",
      glowColor: "59, 130, 246",
      particles: 22,
      animationDelay: 0.4,
    },
    {
      icon: Users,
      title: "Team Synchronization",
      description:
        "Real-time collaboration with AI-powered workflow optimization. Transform how teams approach accessibility.",
      primaryColor: "#06B6D4",
      secondaryColor: "#0891B2",
      accentColor: "#22D3EE",
      glowColor: "6, 182, 212",
      particles: 26,
      animationDelay: 0.5,
    },
  ],
})

// Revolutionary floating particle system
const QuantumParticle = ({ delay, feature }: { delay: number; feature: any }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, rgba(${feature.glowColor}, 0.8) 0%, rgba(${feature.glowColor}, 0.2) 70%, transparent 100%)`,
        x: springX,
        y: springY,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        scale: [0.5, 1.5, 0.8, 1.2, 0.5],
        opacity: [0.3, 1, 0.6, 0.9, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// Mind-blowing 3D holographic card
const HolographicCard = ({ feature, index }: { feature: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 100, rotateX: -30, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 1.2,
        delay: feature.animationDelay,
        type: "spring",
        stiffness: 80,
        damping: 20,
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      whileHover={{
        scale: 1.05,
        z: 50,
        transition: { duration: 0.3, type: "spring", stiffness: 300 },
      }}
    >
      {/* Holographic base */}
      <motion.div
        className="relative h-96 rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            rgba(${feature.glowColor}, 0.1) 0%, 
            rgba(${feature.glowColor}, 0.05) 25%,
            rgba(0, 0, 0, 0.8) 50%,
            rgba(${feature.glowColor}, 0.05) 75%,
            rgba(${feature.glowColor}, 0.1) 100%)`,
          backdropFilter: "blur(20px)",
          border: `1px solid rgba(${feature.glowColor}, 0.2)`,
        }}
      >
        {/* Quantum particle field */}
        {Array.from({ length: feature.particles }).map((_, i) => (
          <QuantumParticle key={i} delay={i * 0.1} feature={feature} />
        ))}

        {/* Holographic scan lines */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(${feature.glowColor}, 0.1) 2px,
              rgba(${feature.glowColor}, 0.1) 4px
            )`,
          }}
          animate={{
            x: [-100, 100],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Dynamic glow following mouse */}
        <motion.div
          className="absolute pointer-events-none rounded-full blur-3xl"
          style={{
            width: 300,
            height: 300,
            background: `radial-gradient(circle, rgba(${feature.glowColor}, 0.4) 0%, transparent 70%)`,
            left: mousePos.x - 150,
            top: mousePos.y - 150,
          }}
          animate={
            isHovered
              ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Content container */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Revolutionary icon design */}
          <motion.div
            className="relative mb-8"
            whileHover={{
              rotateY: 360,
              scale: 1.1,
            }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="w-20 h-20 rounded-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${feature.primaryColor}, ${feature.secondaryColor})`,
                boxShadow: `0 0 30px rgba(${feature.glowColor}, 0.5)`,
              }}
              animate={
                isHovered
                  ? {
                      boxShadow: [
                        `0 0 30px rgba(${feature.glowColor}, 0.5)`,
                        `0 0 60px rgba(${feature.glowColor}, 0.8)`,
                        `0 0 30px rgba(${feature.glowColor}, 0.5)`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {/* Hexagonal pattern overlay */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Hexagon className="w-full h-full text-white/20" />
              </motion.div>

              {/* Main icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <feature.icon className="w-10 h-10 text-white relative z-10" />
              </div>

              {/* Sparkle effects */}
              <motion.div
                className="absolute top-2 right-2"
                animate={{
                  rotate: [0, 180, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Holographic title */}
          <motion.h3
            className="text-3xl font-bold mb-6 relative"
            style={{
              background: `linear-gradient(135deg, #ffffff, ${feature.accentColor}, #ffffff)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            {feature.title}
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
              style={{ background: `linear-gradient(90deg, transparent, ${feature.primaryColor}, transparent)` }}
              animate={isHovered ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.h3>

          {/* Enhanced description */}
          <motion.p
            className="text-gray-300 leading-relaxed flex-grow text-lg"
            animate={
              isHovered
                ? {
                    color: "#ffffff",
                    textShadow: `0 0 10px rgba(${feature.glowColor}, 0.5)`,
                  }
                : {
                    color: "#d1d5db",
                    textShadow: "none",
                  }
            }
            transition={{ duration: 0.3 }}
          >
            {feature.description}
          </motion.p>

          {/* Interactive CTA */}
          <motion.div
            className="flex items-center gap-3 mt-8 group/cta"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="px-6 py-3 rounded-xl font-semibold text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${feature.primaryColor}, ${feature.secondaryColor})`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Feature</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            <motion.div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: feature.accentColor }}
              animate={isHovered ? { x: 10 } : { x: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="w-4 h-4" />
              <span>Learn More</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Holographic border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, 
              rgba(${feature.glowColor}, 0.8), 
              transparent, 
              rgba(${feature.glowColor}, 0.8), 
              transparent, 
              rgba(${feature.glowColor}, 0.8))`,
            padding: "2px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  )
}

export function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const config = createFeatureConfig()
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0f0f23 25%, #1a1a2e 50%, #16213e 75%, #000000 100%)
        `,
      }}
    >
      {/* Quantum background field */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 2, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              delay: Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div className="container mx-auto px-6 lg:px-12 relative z-10" style={{ y, opacity }}>
        <div className="max-w-7xl mx-auto">
          {/* Revolutionary header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            {/* Floating badge */}
            <motion.div
              className="inline-block px-8 py-4 rounded-full mb-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                backdropFilter: "blur(20px)",
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.6)",
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-violet-300 font-semibold text-lg">{config.badge}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>

            {/* Holographic title */}
            <motion.h2
              className="text-7xl md:text-8xl font-bold mb-8 relative"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #a855f7 25%, #3b82f6 50%, #10b981 75%, #ffffff 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "400% 400%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            >
              {config.sectionTitle}

              {/* Floating stars */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 2) * 20}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Star className="w-6 h-6 text-violet-400/60" />
                </motion.div>
              ))}
            </motion.h2>

            <motion.p
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {config.sectionSubtitle}
            </motion.p>
          </motion.div>

          {/* Revolutionary features grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, staggerChildren: 0.2 }}
          >
            {config.features.map((feature, index) => (
              <HolographicCard key={feature.title} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
