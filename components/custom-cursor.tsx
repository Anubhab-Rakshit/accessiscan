"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Mouse position with spring physics for smooth following
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Check if hovering over clickable elements
    const handleElementDetection = () => {
      const element = document.elementFromPoint(mouseX.get(), mouseY.get())

      if (element) {
        const computedStyle = window.getComputedStyle(element)
        setIsPointer(computedStyle.cursor === "pointer")

        // Check if it's a link or button
        setIsHoveringLink(
          element.tagName === "A" ||
            element.tagName === "BUTTON" ||
            element.closest("a") !== null ||
            element.closest("button") !== null,
        )
      } else {
        setIsPointer(false)
        setIsHoveringLink(false)
      }
    }

    // Throttled version of element detection
    const throttledElementDetection = () => {
      let lastCall = 0
      return () => {
        const now = Date.now()
        if (now - lastCall >= 50) {
          lastCall = now
          handleElementDetection()
        }
      }
    }

    const throttled = throttledElementDetection()

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousemove", throttled)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", throttled)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isHoveringLink ? 1.5 : isPointer ? 1.2 : 1,
            opacity: isHoveringLink ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute rounded-full bg-white"
            animate={{
              width: isClicking ? "20px" : isPointer ? "40px" : "30px",
              height: isClicking ? "20px" : isPointer ? "40px" : "30px",
              opacity: isClicking ? 0.5 : 0.2,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Inner dot */}
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: isClicking ? "6px" : "8px",
              height: isClicking ? "6px" : "8px",
            }}
            transition={{ duration: 0.15 }}
          />
        </motion.div>
      </motion.div>

      {/* Cursor trail */}
      <div className="fixed top-0 left-0 z-[9998] pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-20"
            style={{
              width: 6 - i * 0.5,
              height: 6 - i * 0.5,
              x: cursorX,
              y: cursorY,
              transition: `transform ${0.1 + i * 0.05}s ease-out`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>
    </>
  )
}
