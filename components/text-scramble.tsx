"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TextScrambleProps {
  text: string
  className?: string
  speed?: number
  scrambleSpeed?: number
  characters?: string
  delay?: number
  once?: boolean
  threshold?: number
}

export function TextScramble({
  text,
  className = "",
  speed = 0.5,
  scrambleSpeed = 30,
  characters = "!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz0123456789",
  delay = 0,
  once = true,
  threshold = 0.5,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("")
  const [isScrambling, setIsScrambling] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  useEffect(() => {
    if (!isInView) return

    let timeout: NodeJS.Timeout

    // Delay start if needed
    timeout = setTimeout(() => {
      setIsScrambling(true)

      let iteration = 0
      const maxIterations = Math.floor(text.length * speed)
      let interval: NodeJS.Timeout

      // Start the scramble effect
      interval = setInterval(() => {
        if (iteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
          setIsScrambling(false)
          return
        }

        // Calculate how many characters should be revealed
        const progress = Math.min(1, iteration / maxIterations)
        const revealedLength = Math.floor(text.length * progress)

        // Build the output text
        let output = ""
        for (let i = 0; i < text.length; i++) {
          if (i < revealedLength) {
            // Character is revealed
            output += text[i]
          } else if (i === revealedLength) {
            // Character is being scrambled
            output += characters[Math.floor(Math.random() * characters.length)]
          } else {
            // Character is not yet revealed
            if (Math.random() < 0.1) {
              output += characters[Math.floor(Math.random() * characters.length)]
            } else {
              output += " "
            }
          }
        }

        setDisplayText(output)
        iteration++
      }, scrambleSpeed)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [isInView, text, speed, scrambleSpeed, characters, delay])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-mono">{displayText}</span>
    </motion.div>
  )
}
