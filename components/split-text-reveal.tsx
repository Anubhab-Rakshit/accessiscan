"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"

type SplitType = "chars" | "words" | "lines"
type AnimationType = "fade" | "slide" | "zoom" | "flip" | "bounce" | "glitch" | "wave" | "stagger" | "typewriter"
type Direction = "up" | "down" | "left" | "right"

interface SplitTextRevealProps {
  text: string
  splitBy?: SplitType
  animation?: AnimationType
  direction?: Direction
  duration?: number
  staggerChildren?: number
  delay?: number
  className?: string
  threshold?: number
  once?: boolean
  ease?: string
  fontSize?: string
  fontWeight?: string
  color?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  glitchIntensity?: number
  waveFrequency?: number
  typewriterCursor?: boolean
}

export function SplitTextReveal({
  text,
  splitBy = "words",
  animation = "fade",
  direction = "up",
  duration = 0.5,
  staggerChildren = 0.03,
  delay = 0,
  className = "",
  threshold = 0.1,
  once = true,
  ease = "easeOut",
  fontSize,
  fontWeight,
  color,
  as = "div",
  glitchIntensity = 5,
  waveFrequency = 0.5,
  typewriterCursor = true,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()
  const [splitItems, setSplitItems] = useState<string[]>([])

  // Split text into characters, words, or lines
  useEffect(() => {
    if (splitBy === "chars") {
      setSplitItems(text.split(""))
    } else if (splitBy === "words") {
      setSplitItems(text.split(" ").filter((word) => word !== ""))
    } else if (splitBy === "lines") {
      setSplitItems(text.split("\n").filter((line) => line !== ""))
    }
  }, [text, splitBy])

  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  // Define animation variants based on type and direction
  const getVariants = (): { container: Variants; item: Variants } => {
    const baseItemVariants: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }

    const baseContainerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    }

    // Add specific animations
    switch (animation) {
      case "slide":
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
          x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          y: 0,
          x: 0,
          transition: { duration, ease },
        }
        break

      case "zoom":
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          scale: 0.5,
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          scale: 1,
          transition: { duration, ease },
        }
        break

      case "flip":
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          rotateX: direction === "up" || direction === "down" ? 90 : 0,
          rotateY: direction === "left" || direction === "right" ? 90 : 0,
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          rotateX: 0,
          rotateY: 0,
          transition: { duration, ease },
        }
        break

      case "bounce":
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          y: 50,
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          y: 0,
          transition: {
            duration,
            type: "spring",
            stiffness: 300,
            damping: 10,
          },
        }
        break

      case "glitch":
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          x: 0,
          y: 0,
          filter: "blur(0px)",
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          x: [0, -glitchIntensity, glitchIntensity, 0],
          y: [0, glitchIntensity, -glitchIntensity, 0],
          filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
          transition: {
            duration: 0.3,
            ease: "easeInOut",
            times: [0, 0.25, 0.75, 1],
          },
        }
        break

      case "wave":
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          y: 0,
        }
        baseItemVariants.visible = (i: number) => ({
          ...baseItemVariants.visible,
          y: [0, -15, 0],
          transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: i * waveFrequency,
          },
        })
        break

      case "typewriter":
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          width: "0%",
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          width: "100%",
          transition: { duration: 0.1, ease: "linear" },
        }
        break

      case "stagger":
        // This is just a basic stagger with fade
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
          y: 20,
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          y: 0,
          transition: { duration, ease },
        }
        break

      case "fade":
      default:
        // Default fade animation
        baseItemVariants.hidden = {
          ...baseItemVariants.hidden,
        }
        baseItemVariants.visible = {
          ...baseItemVariants.visible,
          transition: { duration, ease },
        }
        break
    }

    return {
      container: baseContainerVariants,
      item: baseItemVariants,
    }
  }

  const { container: containerVariants, item: itemVariants } = getVariants()
  const Component = motion[as]

  // Special case for typewriter animation
  if (animation === "typewriter") {
    return (
      <div ref={ref} className={className} style={{ fontSize, fontWeight, color }}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="inline-flex flex-wrap"
        >
          <div className="relative inline-flex">
            <motion.div variants={itemVariants} className="whitespace-nowrap overflow-hidden" style={{ width: "0%" }}>
              {text}
            </motion.div>
            {typewriterCursor && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                className="absolute right-0 top-0 h-full w-[2px] bg-current"
              />
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <Component
      ref={ref}
      className={`${className} overflow-hidden`}
      style={{ fontSize, fontWeight, color }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <span className="inline-flex flex-wrap">
        {splitItems.map((item, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={itemVariants}
            className="inline-block"
            style={{
              marginRight: splitBy === "chars" ? "0" : splitBy === "words" ? "0.25em" : "0",
              whiteSpace: splitBy === "lines" ? "pre" : "normal",
              display: splitBy === "lines" ? "block" : "inline-block",
            }}
          >
            {item}
          </motion.span>
        ))}
      </span>
    </Component>
  )
}
