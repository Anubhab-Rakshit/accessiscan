"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Interactive3DCardProps {
  children: ReactNode
  className?: string
  backgroundGradient?: string
  glareEnabled?: boolean
  depth?: number
  scale?: number
  perspective?: number
  shadow?: boolean
}

export function Interactive3DCard({
  children,
  className = "",
  backgroundGradient = "bg-gradient-to-br from-blue-50 to-indigo-50",
  glareEnabled = true,
  depth = 1,
  scale = 1.05,
  perspective = 1000,
  shadow = true,
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Motion values for rotation
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Spring physics for smooth rotation
  const springConfig = { damping: 15, stiffness: 150 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  // Glare effect position
  const glareX = useMotionValue(0)
  const glareY = useMotionValue(0)
  const glareOpacity = useMotionValue(0)

  const springGlareX = useSpring(glareX, springConfig)
  const springGlareY = useSpring(glareY, springConfig)
  const springGlareOpacity = useSpring(glareOpacity, { damping: 25, stiffness: 200 })

  // Transform values for depth effect
  const translateZ = useTransform(springRotateX, [-20, 0, 20], [depth * -10, 0, depth * 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (in -1 to 1 range)
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Convert to rotation angles (-15 to 15 degrees)
    const rotX = (mouseY / (rect.height / 2)) * -15
    const rotY = (mouseX / (rect.width / 2)) * 15

    rotateX.set(rotX)
    rotateY.set(rotY)

    // Update glare position (0 to 100%)
    const glX = ((e.clientX - rect.left) / rect.width) * 100
    const glY = ((e.clientY - rect.top) / rect.height) * 100

    glareX.set(glX)
    glareY.set(glY)
    glareOpacity.set(0.2)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    rotateX.set(0)
    rotateY.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale }}
    >
      <motion.div
        className={`relative w-full h-full ${backgroundGradient} rounded-xl overflow-hidden`}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          translateZ,
          boxShadow: shadow ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Glare effect */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              background: "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
              opacity: springGlareOpacity,
              top: 0,
              left: 0,
              transform: `translate(${springGlareX}%, ${springGlareY}%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
