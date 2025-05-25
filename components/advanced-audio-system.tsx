"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Music, Headphones } from "lucide-react"

interface AudioSystemProps {
  children: React.ReactNode
}

export function AdvancedAudioSystem({ children }: AudioSystemProps) {
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const backgroundMusicRef = useRef<HTMLAudioElement>(null)

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime)
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime)
    }
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume * 0.3 // Background music at lower volume
    }
  }, [volume])

  // Audio feedback functions
  const playHoverSound = useCallback(() => {
    if (!audioEnabled || !audioContextRef.current || !gainNodeRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()

    oscillator.connect(envelope)
    envelope.connect(gainNodeRef.current)

    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
    oscillator.type = "sine"

    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    envelope.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 0.01)
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + 0.1)
  }, [audioEnabled])

  const playClickSound = useCallback(() => {
    if (!audioEnabled || !audioContextRef.current || !gainNodeRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()

    oscillator.connect(envelope)
    envelope.connect(gainNodeRef.current)

    oscillator.frequency.setValueAtTime(1200, audioContextRef.current.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContextRef.current.currentTime + 0.1)
    oscillator.type = "square"

    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    envelope.gain.linearRampToValueAtTime(0.15, audioContextRef.current.currentTime + 0.01)
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.15)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + 0.15)
  }, [audioEnabled])

  const playSuccessSound = useCallback(() => {
    if (!audioEnabled || !audioContextRef.current || !gainNodeRef.current) return

    const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContextRef.current!.createOscillator()
        const envelope = audioContextRef.current!.createGain()

        oscillator.connect(envelope)
        envelope.connect(gainNodeRef.current!)

        oscillator.frequency.setValueAtTime(freq, audioContextRef.current!.currentTime)
        oscillator.type = "sine"

        envelope.gain.setValueAtTime(0, audioContextRef.current!.currentTime)
        envelope.gain.linearRampToValueAtTime(0.1, audioContextRef.current!.currentTime + 0.01)
        envelope.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current!.currentTime + 0.3)

        oscillator.start(audioContextRef.current!.currentTime)
        oscillator.stop(audioContextRef.current!.currentTime + 0.3)
      }, index * 100)
    })
  }, [audioEnabled])

  const playErrorSound = useCallback(() => {
    if (!audioEnabled || !audioContextRef.current || !gainNodeRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()

    oscillator.connect(envelope)
    envelope.connect(gainNodeRef.current)

    oscillator.frequency.setValueAtTime(200, audioContextRef.current.currentTime)
    oscillator.frequency.linearRampToValueAtTime(150, audioContextRef.current.currentTime + 0.3)
    oscillator.type = "sawtooth"

    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    envelope.gain.linearRampToValueAtTime(0.2, audioContextRef.current.currentTime + 0.01)
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.3)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + 0.3)
  }, [audioEnabled])

  // Background music tracks
  const backgroundTracks = ["Ambient Tech", "Digital Dreams", "Cyber Flow", "Neural Networks"]

  const toggleBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      if (backgroundMusicRef.current.paused) {
        backgroundMusicRef.current.play().catch(() => {})
      } else {
        backgroundMusicRef.current.pause()
      }
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % backgroundTracks.length)
    playClickSound()
  }

  // Add audio event listeners to all interactive elements
  useEffect(() => {
    if (!audioEnabled) return

    const addAudioToElements = () => {
      // Add hover sounds to buttons
      const buttons = document.querySelectorAll('button, [role="button"], a')
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", playHoverSound)
        button.addEventListener("click", playClickSound)
      })

      // Add sounds to form submissions
      const forms = document.querySelectorAll("form")
      forms.forEach((form) => {
        form.addEventListener("submit", playSuccessSound)
      })

      // Add sounds to error states
      const errorElements = document.querySelectorAll('[data-error="true"]')
      errorElements.forEach((element) => {
        element.addEventListener("focus", playErrorSound)
      })
    }

    addAudioToElements()

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addAudioToElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      const buttons = document.querySelectorAll('button, [role="button"], a')
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", playHoverSound)
        button.removeEventListener("click", playClickSound)
      })
    }
  }, [audioEnabled, playHoverSound, playClickSound, playSuccessSound, playErrorSound])

  return (
    <div className="relative">
      {/* Audio Control Panel */}
      <motion.div
        className="fixed top-6 right-6 z-50 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 p-4 space-y-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main audio toggle */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium">Audio</span>
          <motion.button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded-lg transition-all ${
              audioEnabled ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </motion.button>
        </div>

        {audioEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            {/* Volume control */}
            <div className="space-y-2">
              <label className="text-white text-xs">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Background music controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-xs">Background</span>
                <motion.button
                  onClick={toggleBackgroundMusic}
                  className="p-1 rounded bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Music className="w-3 h-3" />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs truncate">{backgroundTracks[currentTrack]}</span>
                <motion.button
                  onClick={nextTrack}
                  className="p-1 rounded bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Headphones className="w-3 h-3" />
                </motion.button>
              </div>
            </div>

            {/* Audio visualizer */}
            <div className="flex items-end justify-center gap-1 h-8">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-blue-500 rounded-full"
                  animate={{
                    height: audioEnabled ? [4, 16, 8, 20, 12, 6, 18, 10] : [2, 2, 2, 2, 2, 2, 2, 2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Background music element */}
      <audio ref={backgroundMusicRef} loop preload="auto" className="hidden">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
          type="audio/wav"
        />
      </audio>

      {/* Main content */}
      {children}

      {/* Audio feedback indicator */}
      {audioEnabled && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 bg-green-500/20 backdrop-blur-sm rounded-full p-3 border border-green-500/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <Volume2 className="w-4 h-4 text-green-400" />
        </motion.div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
      `}</style>
    </div>
  )
}
