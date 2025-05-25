"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxLayerProps {
  children: React.ReactNode
  depth: number
  className?: string
  rotateX?: boolean
  rotateY?: boolean
  scale?: boolean
  opacity?: boolean
}

export function ParallaxLayer({
  children,
  depth,
  className,
  rotateX = false,
  rotateY = false,
  scale = false,
  opacity = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const initial = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 150 }
  const springValue = useSpring(initial, springConfig)

  // Update element position on scroll or resize
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const onResize = () => {
      setElementTop(element.offsetTop)
      setClientHeight(window.innerHeight)
    }

    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [ref])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      // Normalize mouse position to -1 to 1 range
      const normalizedX = (clientX - centerX) / centerX
      const normalizedY = (clientY - centerY) / centerY

      setMousePosition({ x: normalizedX, y: normalizedY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform values based on scroll and mouse position
  const y = useTransform(scrollYProgress, [0, 1], [100 * depth, -100 * depth])
  const springY = useSpring(y, { damping: 15, stiffness: 150 })

  // Mouse-based transforms
  const mouseX = useTransform(() => mousePosition.x * 20 * depth)
  const mouseY = useTransform(() => mousePosition.y * 20 * depth)

  // Optional transforms
  const rotateXValue = useTransform(() => (rotateX ? mousePosition.y * 10 * depth : 0))
  const rotateYValue = useTransform(() => (rotateY ? -mousePosition.x * 10 * depth : 0))
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scale ? [1 - 0.1 * depth, 1, 1 + 0.1 * depth] : [1, 1, 1],
  )
  const opacityValue = useTransform(scrollYProgress, [0, 0.5, 1], opacity ? [0.5, 1, 0.5] : [1, 1, 1])

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        y: springY,
        x: mouseX,
        rotateX: rotateXValue,
        rotateY: rotateYValue,
        scale: scaleValue,
        opacity: opacityValue,
        zIndex: Math.round(100 - depth * 10),
      }}
    >
      {children}
    </motion.div>
  )
}

interface Parallax3DSceneProps {
  children: React.ReactNode
  className?: string
  perspective?: number
}

export function Parallax3DScene({ children, className, perspective = 1000 }: Parallax3DSceneProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  )
}
