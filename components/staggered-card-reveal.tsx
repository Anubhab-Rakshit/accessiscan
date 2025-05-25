"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"

interface StaggeredCardRevealProps {
  children: React.ReactNode[]
  direction?: "left" | "right" | "up" | "down"
  staggerDelay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
  itemClassName?: string
  ease?: string
  distance?: number
  rotate?: number
  scale?: number
  opacity?: boolean
}

export function StaggeredCardReveal({
  children,
  direction = "left",
  staggerDelay = 0.1,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className = "",
  itemClassName = "",
  ease = "easeOut",
  distance = 100,
  rotate = 0,
  scale = 1,
  opacity = true,
}: StaggeredCardRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Define animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      rotate: rotate,
      scale: scale < 1 ? scale : 1,
      opacity: opacity ? 0 : 1,
    },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration,
        ease,
        type: rotate !== 0 || scale !== 1 ? "spring" : "tween",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children.map((child, index) => (
        <motion.div key={index} className={itemClassName} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
