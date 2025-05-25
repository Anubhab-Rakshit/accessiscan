"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface Premium3DCardProps {
  children: React.ReactNode
  className?: string
  backgroundGradient?: string
  glareEnabled?: boolean
  depth?: number
  scale?: number
  perspective?: number
  shadow?: boolean
  borderRadius?: string
  borderWidth?: string
  borderColor?: string
  glareColor?: string
  glareOpacity?: number
  rotationIntensity?: number
  hoverScale?: number
  springConfig?: { damping: number; stiffness: number }
  backgroundColor?: string
  backgroundImage?: string
  backgroundOpacity?: number
  backgroundBlur?: string
  contentPadding?: string
  clickEffect?: boolean
  disabled?: boolean
  disableRotation?: boolean
  disableScale?: boolean
  disableGlare?: boolean
  disableShadow?: boolean
}

export function Premium3DCard({
  children,
  className = "",
  backgroundGradient = "bg-gradient-to-br from-blue-50 to-indigo-50",
  glareEnabled = true,
  depth = 1,
  scale = 1.05,
  perspective = 1000,
  shadow = true,
  borderRadius = "rounded-xl",
  borderWidth = "border",
  borderColor = "border-gray-200",
  glareColor = "rgba(255, 255, 255, 0.8)",
  glareOpacity = 0.2,
  rotationIntensity = 15,
  hoverScale = 1.05,
  springConfig = { damping: 15, stiffness: 150 },
  backgroundColor = "",
  backgroundImage = "",
  backgroundOpacity = 1,
  backgroundBlur = "",
  contentPadding = "p-6",
  clickEffect = true,
  disabled = false,
  disableRotation = false,
  disableScale = false,
  disableGlare = false,
  disableShadow = false,
}: Premium3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Motion values for rotation
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Spring physics for smooth rotation
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  // Glare effect position
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareOpacityValue = useMotionValue(0)

  const springGlareX = useSpring(glareX, springConfig)
  const springGlareY = useSpring(glareY, springConfig)
  const springGlareOpacity = useSpring(glareOpacityValue, { damping: 25, stiffness: 200 })

  // Transform values for depth effect
  const translateZ = useTransform(
    springRotateX,
    [-rotationIntensity, 0, rotationIntensity],
    [depth * -10, 0, depth * 10],
  )

  // Shadow intensity based on rotation
  const shadowBlur = useTransform([springRotateX, springRotateY], ([rx, ry]) => Math.sqrt(rx * rx + ry * ry) * 0.5 + 10)

  const shadowX = useTransform(springRotateY, [-rotationIntensity, 0, rotationIntensity], [depth * -5, 0, depth * 5])
  const shadowY = useTransform(springRotateX, [-rotationIntensity, 0, rotationIntensity], [depth * -5, 0, depth * 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || disableRotation) return

    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (in -1 to 1 range)
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Convert to rotation angles (-15 to 15 degrees)
    const rotX = (mouseY / (rect.height / 2)) * -rotationIntensity
    const rotY = (mouseX / (rect.width / 2)) * rotationIntensity

    rotateX.set(rotX)
    rotateY.set(rotY)

    // Update glare position (0 to 100%)
    if (!disableGlare) {
      const glX = ((e.clientX - rect.left) / rect.width) * 100
      const glY = ((e.clientY - rect.top) / rect.height) * 100

      glareX.set(glX)
      glareY.set(glY)
      glareOpacityValue.set(glareEnabled ? glareOpacity : 0)
    }
  }

  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (disabled) return
    setIsHovering(false)
    rotateX.set(0)
    rotateY.set(0)
    glareOpacityValue.set(0)
  }

  const handleMouseDown = () => {
    if (disabled || !clickEffect) return
    setIsClicking(true)
  }

  const handleMouseUp = () => {
    if (disabled || !clickEffect) return
    setIsClicking(false)
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    card.addEventListener("mousedown", handleMouseDown as any)
    card.addEventListener("mouseup", handleMouseUp as any)
    card.addEventListener("mouseleave", handleMouseUp as any)

    return () => {
      card.removeEventListener("mousedown", handleMouseDown as any)
      card.removeEventListener("mouseup", handleMouseUp as any)
      card.removeEventListener("mouseleave", handleMouseUp as any)
    }
  }, [disabled, clickEffect])

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden", className, borderRadius, borderWidth, borderColor)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        cursor: disabled ? "default" : "pointer",
      }}
      whileHover={!disabled && !disableScale ? { scale: hoverScale } : {}}
      whileTap={!disabled && clickEffect ? { scale: hoverScale * 0.95 } : {}}
    >
      <motion.div
        className={cn(
          "relative w-full h-full overflow-hidden",
          borderRadius,
          backgroundGradient,
          backgroundColor,
          contentPadding,
        )}
        style={{
          rotateX: disableRotation ? 0 : springRotateX,
          rotateY: disableRotation ? 0 : springRotateY,
          translateZ,
          boxShadow:
            shadow && !disableShadow
              ? `${shadowX.get()}px ${shadowY.get()}px ${shadowBlur.get()}px rgba(0, 0, 0, 0.15)`
              : "none",
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: backgroundImage ? "cover" : undefined,
          backgroundPosition: backgroundImage ? "center" : undefined,
          opacity: backgroundOpacity,
          backdropFilter: backgroundBlur ? `blur(${backgroundBlur})` : undefined,
        }}
      >
        {/* Background overlay for gradient or color */}
        {(backgroundColor || backgroundGradient) && (
          <div
            className={cn("absolute inset-0 -z-10", backgroundColor, backgroundGradient, borderRadius)}
            style={{
              opacity: backgroundOpacity,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Glare effect */}
        {glareEnabled && !disableGlare && (
          <motion.div
            className={cn("absolute inset-0 w-full h-full pointer-events-none", borderRadius)}
            style={{
              background: `radial-gradient(circle at ${springGlareX}% ${springGlareY}%, ${glareColor} 0%, transparent 80%)`,
              opacity: springGlareOpacity,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Click ripple effect */}
        {isClicking && clickEffect && !disabled && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-white pointer-events-none"
          />
        )}
      </motion.div>
    </motion.div>
  )
}
