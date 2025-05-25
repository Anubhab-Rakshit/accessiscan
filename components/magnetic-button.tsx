"use client"

import type React from "react"

import { type ReactNode, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: "button" | "a"
  href?: string
  onClick?: () => void
  glowColor?: string
}

export function MagneticButton({
  children,
  className = "",
  strength = 30,
  radius = 300,
  as = "button",
  href,
  onClick,
  glowColor = "rgba(59, 130, 246, 0.5)",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  // Motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth movement
  const springConfig = { damping: 15, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Glow effect
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const glowOpacity = useMotionValue(0)

  const springGlowX = useSpring(glowX, springConfig)
  const springGlowY = useSpring(glowY, springConfig)
  const springGlowOpacity = useSpring(glowOpacity, { damping: 25, stiffness: 200 })

  // Scale effect on hover
  const scale = useSpring(1, springConfig)

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

    // Only apply magnetic effect within radius
    if (distance < radius) {
      // Calculate magnetic pull (stronger when closer to center)
      const pull = 1 - distance / radius

      const moveX = (e.clientX - centerX) * pull * (strength / 10)
      const moveY = (e.clientY - centerY) * pull * (strength / 10)

      mouseX.set(moveX)
      mouseY.set(moveY)

      // Update glow position
      const glX = ((e.clientX - rect.left) / rect.width) * 100
      const glY = ((e.clientY - rect.top) / rect.height) * 100

      glowX.set(glX)
      glowY.set(glY)
      glowOpacity.set(0.8 * pull)

      // Scale up slightly
      scale.set(1.05)
    } else {
      // Reset when outside radius
      mouseX.set(0)
      mouseY.set(0)
      glowOpacity.set(0)
      scale.set(1)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    glowOpacity.set(0)
    scale.set(1)
  }

  const Component = motion[as as keyof typeof motion]

  return (
    <Component
      ref={buttonRef as any}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      style={{
        x,
        y,
        scale,
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${springGlowX}% ${springGlowY}%, ${glowColor} 0%, transparent 70%)`,
          opacity: springGlowOpacity,
        }}
      />
    </Component>
  )
}
