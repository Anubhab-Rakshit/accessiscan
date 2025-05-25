"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useAnimation, type PanInfo } from "framer-motion"
import { Volume2, VolumeX, Hand, Zap } from "lucide-react"

interface GestureControlsProps {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onRotate?: (angle: number) => void
  children: React.ReactNode
  className?: string
}

export function GestureControls({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onRotate,
  children,
  className = "",
}: GestureControlsProps) {
  const [isGestureMode, setIsGestureMode] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [lastTouchAngle, setLastTouchAngle] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const controls = useAnimation()

  // Audio feedback
  const playGestureSound = useCallback(
    (type: "swipe" | "pinch" | "rotate") => {
      if (!audioEnabled || !audioRef.current) return

      // Different frequencies for different gestures
      const frequencies = {
        swipe: 800,
        pinch: 600,
        rotate: 1000,
      }

      // Create audio context for gesture sounds
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    },
    [audioEnabled],
  )

  // Touch distance calculation
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0
    const touch1 = touches[0]
    const touch2 = touches[1]
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2))
  }

  // Touch angle calculation
  const getTouchAngle = (touches: TouchList) => {
    if (touches.length < 2) return 0
    const touch1 = touches[0]
    const touch2 = touches[1]
    return (Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX) * 180) / Math.PI
  }

  // Handle pan gestures
  const handlePan = (event: any, info: PanInfo) => {
    const { offset, velocity } = info
    const threshold = 100
    const velocityThreshold = 500

    if (Math.abs(velocity.x) > velocityThreshold || Math.abs(offset.x) > threshold) {
      if (offset.x > threshold && onSwipeRight) {
        onSwipeRight()
        playGestureSound("swipe")
        controls.start({
          x: [0, 20, 0],
          transition: { duration: 0.3 },
        })
      } else if (offset.x < -threshold && onSwipeLeft) {
        onSwipeLeft()
        playGestureSound("swipe")
        controls.start({
          x: [0, -20, 0],
          transition: { duration: 0.3 },
        })
      }
    }

    if (Math.abs(velocity.y) > velocityThreshold || Math.abs(offset.y) > threshold) {
      if (offset.y > threshold && onSwipeDown) {
        onSwipeDown()
        playGestureSound("swipe")
        controls.start({
          y: [0, 20, 0],
          transition: { duration: 0.3 },
        })
      } else if (offset.y < -threshold && onSwipeUp) {
        onSwipeUp()
        playGestureSound("swipe")
        controls.start({
          y: [0, -20, 0],
          transition: { duration: 0.3 },
        })
      }
    }
  }

  // Handle touch events for pinch and rotate
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setLastTouchDistance(getTouchDistance(e.touches))
        setLastTouchAngle(getTouchAngle(e.touches))
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches)
        const currentAngle = getTouchAngle(e.touches)

        // Pinch gesture
        if (lastTouchDistance > 0 && onPinch) {
          const scale = currentDistance / lastTouchDistance
          if (Math.abs(scale - 1) > 0.1) {
            onPinch(scale)
            playGestureSound("pinch")
            setLastTouchDistance(currentDistance)
          }
        }

        // Rotate gesture
        if (lastTouchAngle !== 0 && onRotate) {
          const angleDiff = currentAngle - lastTouchAngle
          if (Math.abs(angleDiff) > 5) {
            onRotate(angleDiff)
            playGestureSound("rotate")
            setLastTouchAngle(currentAngle)
          }
        }
      }
    }

    const handleTouchEnd = () => {
      setLastTouchDistance(0)
      setLastTouchAngle(0)
    }

    if (isGestureMode) {
      document.addEventListener("touchstart", handleTouchStart, { passive: false })
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isGestureMode, lastTouchDistance, lastTouchAngle, onPinch, onRotate, playGestureSound])

  return (
    <div className={`relative ${className}`}>
      {/* Gesture controls overlay */}
      <motion.div
        className="fixed top-6 left-6 z-50 flex items-center gap-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => setIsGestureMode(!isGestureMode)}
          className={`p-3 rounded-full backdrop-blur-xl border transition-all ${
            isGestureMode ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-white/10 border-white/20 text-white"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Hand className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>

        {isGestureMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-2 bg-blue-500/20 backdrop-blur-xl rounded-full border border-blue-500/50 text-blue-400 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Gesture Mode Active
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Gesture hints */}
      {isGestureMode && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl">👆</div>
                <div className="text-xs">Swipe Up</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">👇</div>
                <div className="text-xs">Swipe Down</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🤏</div>
                <div className="text-xs">Pinch</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🔄</div>
                <div className="text-xs">Rotate</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main content with gesture detection */}
      <motion.div
        drag={isGestureMode}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        onPan={handlePan}
        animate={controls}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Audio element for gesture feedback */}
      <audio ref={audioRef} preload="auto" className="hidden">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
          type="audio/wav"
        />
      </audio>
    </div>
  )
}
