"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface PremiumCardProps {
  children: React.ReactNode
  className?: string
  variant?: "glass" | "gradient" | "neon" | "holographic" | "minimal"
  size?: "sm" | "md" | "lg" | "xl"
  interactive?: boolean
  glowColor?: string
  borderGradient?: string
  backgroundPattern?: "dots" | "grid" | "waves" | "none"
  shadowIntensity?: "low" | "medium" | "high" | "extreme"
  hoverEffect?: "lift" | "tilt" | "glow" | "scale" | "morph"
}

export function PremiumCard({
  children,
  className = "",
  variant = "glass",
  size = "md",
  interactive = true,
  glowColor = "rgba(59, 130, 246, 0.5)",
  borderGradient = "from-blue-500 via-purple-500 to-pink-500",
  backgroundPattern = "none",
  shadowIntensity = "medium",
  hoverEffect = "tilt",
}: PremiumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  // Motion values
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)
  const glowOpacity = useMotionValue(0)
  const borderOpacity = useMotionValue(0)

  // Spring configurations
  const springConfig = { damping: 20, stiffness: 300 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const springScale = useSpring(scale, springConfig)
  const springGlowOpacity = useSpring(glowOpacity, { damping: 25, stiffness: 200 })
  const springBorderOpacity = useSpring(borderOpacity, { damping: 25, stiffness: 200 })

  // Transform values
  const shadowX = useTransform(springRotateY, [-20, 20], [-40, 40])
  const shadowY = useTransform(springRotateX, [-20, 20], [-40, 40])
  const shadowBlur = useTransform([springRotateX, springRotateY], ([x, y]) => Math.abs(x) + Math.abs(y) + 20)

  // Size variants
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  }

  // Shadow intensity variants
  const shadowClasses = {
    low: "shadow-lg",
    medium: "shadow-xl",
    high: "shadow-2xl",
    extreme: "shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
  }

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -15
    const rotateYValue = (mouseX / (rect.width / 2)) * 15

    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })

    if (hoverEffect === "tilt") {
      rotateX.set(rotateXValue)
      rotateY.set(rotateYValue)
    } else if (hoverEffect === "scale") {
      scale.set(1.05)
    }

    glowOpacity.set(0.8)
    borderOpacity.set(1)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)

    if (hoverEffect === "lift") {
      controls.start({
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      })
    } else if (hoverEffect === "glow") {
      glowOpacity.set(1)
    } else if (hoverEffect === "morph") {
      controls.start({
        borderRadius: "2rem",
        transition: { duration: 0.3, ease: "easeOut" },
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    glowOpacity.set(0)
    borderOpacity.set(0)

    controls.start({
      y: 0,
      borderRadius: "1rem",
      transition: { duration: 0.3, ease: "easeOut" },
    })
  }

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-white/10 backdrop-blur-xl border border-white/20"
      case "gradient":
        return "bg-gradient-to-br from-white/90 to-white/70 border border-gray-200/50"
      case "neon":
        return "bg-black/90 border border-cyan-500/50"
      case "holographic":
        return "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-white/30"
      case "minimal":
        return "bg-white border border-gray-200"
      default:
        return "bg-white border border-gray-200"
    }
  }

  // Background pattern
  const getBackgroundPattern = () => {
    switch (backgroundPattern) {
      case "dots":
        return "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]"
      case "grid":
        return "bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"
      case "waves":
        return 'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
      default:
        return ""
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300",
        getVariantStyles(),
        sizeClasses[size],
        shadowClasses[shadowIntensity],
        getBackgroundPattern(),
        className,
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX: hoverEffect === "tilt" ? springRotateX : 0,
        rotateY: hoverEffect === "tilt" ? springRotateY : 0,
        scale: hoverEffect === "scale" ? springScale : 1,
        boxShadow: interactive
          ? `${shadowX.get()}px ${shadowY.get()}px ${shadowBlur.get()}px rgba(0,0,0,0.15)`
          : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={controls}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated border gradient */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
          `bg-gradient-to-r ${borderGradient}`,
        )}
        style={{
          opacity: springBorderOpacity,
          padding: "2px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor} 0%, transparent 70%)`,
          opacity: springGlowOpacity,
        }}
      />

      {/* Holographic effect for holographic variant */}
      {variant === "holographic" && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(${mousePosition.x}deg, rgba(255,0,150,0.1) 0%, rgba(0,255,255,0.1) 50%, rgba(255,255,0,0.1) 100%)`,
            opacity: isHovering ? 0.6 : 0.3,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Noise texture for glass variant */}
      {variant === "glass" && (
        <div
          className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          transform: `translateX(${isHovering ? "100%" : "-100%"})`,
          transition: "transform 0.6s ease",
        }}
      />
    </motion.div>
  )
}
