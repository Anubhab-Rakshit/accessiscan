"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"
type RevealType = "fade" | "slide" | "zoom" | "flip" | "rotate" | "bounce" | "glide"

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  type?: RevealType
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
  distance?: number
  staggerChildren?: boolean
  staggerDelay?: number
  ease?: string
}

export function ScrollReveal({
  children,
  direction = "up",
  type = "fade",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className = "",
  distance = 50,
  staggerChildren = false,
  staggerDelay = 0.1,
  ease = "easeOut",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  })

  // Define animation variants based on type and direction
  const getVariants = (): Variants => {
    const baseVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          ease,
          staggerChildren: staggerChildren ? staggerDelay : 0,
        },
      },
    }

    // Add transform properties based on type and direction
    switch (type) {
      case "slide":
        baseVariants.hidden = {
          ...baseVariants.hidden,
          x: direction === "left" ? -distance : direction === "right" ? distance : 0,
          y: direction === "up" ? distance : direction === "down" ? -distance : 0,
        }
        baseVariants.visible = {
          ...baseVariants.visible,
          x: 0,
          y: 0,
        }
        break

      case "zoom":
        baseVariants.hidden = {
          ...baseVariants.hidden,
          scale: direction === "none" ? 0.8 : 0.5,
        }
        baseVariants.visible = {
          ...baseVariants.visible,
          scale: 1,
        }
        break

      case "flip":
        baseVariants.hidden = {
          ...baseVariants.hidden,
          rotateX: direction === "up" || direction === "down" ? 90 : 0,
          rotateY: direction === "left" || direction === "right" ? 90 : 0,
        }
        baseVariants.visible = {
          ...baseVariants.visible,
          rotateX: 0,
          rotateY: 0,
        }
        break

      case "rotate":
        baseVariants.hidden = {
          ...baseVariants.hidden,
          rotate: direction === "left" ? -90 : 90,
          scale: 0.8,
        }
        baseVariants.visible = {
          ...baseVariants.visible,
          rotate: 0,
          scale: 1,
        }
        break

      case "bounce":
        baseVariants.hidden = {
          ...baseVariants.hidden,
          y: direction === "up" ? distance : -distance,
          scale: 0.8,
        }
        baseVariants.visible = {
          ...baseVariants.visible,
          y: 0,
          scale: 1,
          transition: {
            ...baseVariants.visible.transition,
            bounce: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 15,
          },
        }
        break

      case "glide":
        baseVariants.hidden = {
          ...baseVariants.hidden,
          x: direction === "left" ? -distance * 2 : direction === "right" ? distance * 2 : 0,
          y: direction === "up" ? distance * 2 : direction === "down" ? -distance * 2 : 0,
          rotate: direction === "left" ? -5 : direction === "right" ? 5 : 0,
        }
        baseVariants.visible = {
          ...baseVariants.visible,
          x: 0,
          y: 0,
          rotate: 0,
          transition: {
            ...baseVariants.visible.transition,
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }
        break

      // Default fade animation
      default:
        if (direction !== "none") {
          baseVariants.hidden = {
            ...baseVariants.hidden,
            x: direction === "left" ? -distance / 2 : direction === "right" ? distance / 2 : 0,
            y: direction === "up" ? distance / 2 : direction === "down" ? -distance / 2 : 0,
          }
          baseVariants.visible = {
            ...baseVariants.visible,
            x: 0,
            y: 0,
          }
        }
        break
    }

    return baseVariants
  }

  const variants = getVariants()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Child component for staggered animations
export function ScrollRevealItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
