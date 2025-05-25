"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

interface ParticleBackgroundProps {
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
  speed?: number
  className?: string
  interactive?: boolean
  interactionRadius?: number
  interactionStrength?: number
}

export function ParticleBackground({
  count = 50,
  color = "#3b82f6",
  minSize = 1,
  maxSize = 5,
  speed = 1,
  className = "",
  interactive = true,
  interactionRadius = 100,
  interactionStrength = 3,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const animationRef = useRef<number>(0)

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Create particles
    particlesRef.current = Array.from({ length: count }, () => createParticle())

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    // Animation loop
    const animate = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Apply mouse interaction
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius
            particle.speedX += (dx / distance) * force * interactionStrength * 0.05
            particle.speedY += (dy / distance) * force * interactionStrength * 0.05
          }
        }

        // Update position
        particle.x += particle.speedX * speed
        particle.y += particle.speedY * speed

        // Apply friction
        particle.speedX *= 0.99
        particle.speedY *= 0.99

        // Update life
        particle.life -= 1

        // Respawn if needed
        if (
          particle.life <= 0 ||
          particle.x < -particle.size ||
          particle.x > canvas.width + particle.size ||
          particle.y < -particle.size ||
          particle.y > canvas.height + particle.size
        ) {
          particlesRef.current[index] = createParticle()
        }

        // Calculate opacity based on life
        const normalizedLife = particle.life / particle.maxLife
        const fadeInOut =
          normalizedLife < 0.2 ? normalizedLife * 5 : normalizedLife > 0.8 ? (1 - normalizedLife) * 5 : 1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * fadeInOut * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Draw connections
        particlesRef.current.forEach((otherParticle) => {
          if (particle === otherParticle) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

            const opacity = (1 - distance / 150) * 0.2
            ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }

  // Create a single particle
  const createParticle = (): Particle => {
    if (!canvasRef.current) {
      return {
        x: 0,
        y: 0,
        size: 0,
        speedX: 0,
        speedY: 0,
        color,
        opacity: 0,
        life: 0,
        maxLife: 0,
      }
    }

    const canvas = canvasRef.current

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: minSize + Math.random() * (maxSize - minSize),
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color,
      opacity: 0.1 + Math.random() * 0.4,
      life: 100 + Math.random() * 200,
      maxLife: 100 + Math.random() * 200,
    }
  }

  useEffect(() => {
    const cleanup = initParticles()
    return cleanup
  }, [count, color, minSize, maxSize, speed, interactive, interactionRadius, interactionStrength])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
