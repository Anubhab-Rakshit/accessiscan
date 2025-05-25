"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  alpha: number
  vx: number
  vy: number
  originX: number
  originY: number
  life: number
  maxLife: number
}

interface MicroParticlesProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  speed?: number
  className?: string
  interactive?: boolean
  interactionRadius?: number
  interactionForce?: number
  noiseIntensity?: number
  connectParticles?: boolean
  connectDistance?: number
  blendMode?: string
  mouseGlow?: boolean
  mouseGlowSize?: number
  mouseGlowColor?: string
  mouseGlowOpacity?: number
  particleShape?: "circle" | "square" | "triangle" | "line" | "custom"
  customDrawFunction?: (ctx: CanvasRenderingContext2D, particle: Particle) => void
}

export function MicroParticles({
  count = 150,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  minSize = 1,
  maxSize = 3,
  speed = 1,
  className = "",
  interactive = true,
  interactionRadius = 100,
  interactionForce = 0.3,
  noiseIntensity = 0.2,
  connectParticles = true,
  connectDistance = 120,
  blendMode = "screen",
  mouseGlow = true,
  mouseGlowSize = 150,
  mouseGlowColor = "rgba(59, 130, 246, 0.15)",
  mouseGlowOpacity = 0.8,
  particleShape = "circle",
  customDrawFunction,
}: MicroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const animationRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [time, setTime] = useState(0)

  // Mouse position with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const springMouseX = useSpring(mouseX, springConfig)
  const springMouseY = useSpring(mouseY, springConfig)

  // Mouse glow opacity
  const mouseGlowOpacityValue = useMotionValue(0)
  const springMouseGlowOpacity = useSpring(mouseGlowOpacityValue, { damping: 25, stiffness: 200 })

  // Perlin noise function (simplified)
  const noise = (x: number, y: number, z: number) => {
    // Simple noise approximation for this example
    return Math.sin(x * 10 + time * 0.01) * Math.cos(y * 10 + time * 0.01) * Math.sin(z * 10 + time * 0.01)
  }

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      setDimensions({ width: canvas.width, height: canvas.height })
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Create particles
    particlesRef.current = Array.from({ length: count }, () => createParticle())

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * window.devicePixelRatio
      const y = (e.clientY - rect.top) * window.devicePixelRatio

      mouseX.set(x)
      mouseY.set(y)
      mouseRef.current = { x, y, active: true }
      mouseGlowOpacityValue.set(mouseGlow ? mouseGlowOpacity : 0)
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
      mouseGlowOpacityValue.set(0)
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

      // Set global composite operation
      ctx.globalCompositeOperation = blendMode as GlobalCompositeOperation

      // Update time for noise
      setTime((prev) => prev + 1)

      // Draw mouse glow
      if (mouseGlow && mouseRef.current.active) {
        const grd = ctx.createRadialGradient(
          springMouseX.get(),
          springMouseY.get(),
          0,
          springMouseX.get(),
          springMouseY.get(),
          mouseGlowSize,
        )
        grd.addColorStop(0, mouseGlowColor)
        grd.addColorStop(1, "rgba(59, 130, 246, 0)")

        ctx.globalAlpha = springMouseGlowOpacity.get()
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(springMouseX.get(), springMouseY.get(), mouseGlowSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw connections first (behind particles)
      if (connectParticles) {
        ctx.globalAlpha = 0.2
        ctx.strokeStyle = colors[0]
        ctx.lineWidth = 0.5 * window.devicePixelRatio

        for (let i = 0; i < particlesRef.current.length; i++) {
          const p1 = particlesRef.current[i]

          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p2 = particlesRef.current[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectDistance) {
              const opacity = 1 - distance / connectDistance
              ctx.globalAlpha = opacity * 0.2
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }

        ctx.globalAlpha = 1
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Apply noise for organic movement
        const noiseX = noise(particle.x * 0.01, particle.y * 0.01, time * 0.001) * noiseIntensity
        const noiseY = noise(particle.x * 0.01 + 100, particle.y * 0.01 + 100, time * 0.001) * noiseIntensity

        particle.vx += noiseX
        particle.vy += noiseY

        // Apply mouse interaction
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < interactionRadius) {
            const force = ((interactionRadius - distance) / interactionRadius) * interactionForce
            particle.vx -= (dx / distance) * force
            particle.vy -= (dy / distance) * force
          }
        }

        // Apply spring force to return to origin
        const dx = particle.originX - particle.x
        const dy = particle.originY - particle.y
        particle.vx += dx * 0.003 * speed
        particle.vy += dy * 0.003 * speed

        // Apply friction
        particle.vx *= 0.94
        particle.vy *= 0.94

        // Update position
        particle.x += particle.vx * speed
        particle.y += particle.vy * speed

        // Update life
        particle.life -= 0.2
        if (particle.life <= 0) {
          // Reset particle
          particlesRef.current[index] = createParticle()
        } else {
          // Calculate alpha based on life
          const lifeRatio = particle.life / particle.maxLife
          particle.alpha = lifeRatio < 0.3 ? lifeRatio / 0.3 : 1 - lifeRatio < 0.3 ? (1 - lifeRatio) / 0.3 : 1

          // Draw particle
          ctx.globalAlpha = particle.alpha
          ctx.fillStyle = particle.color

          if (customDrawFunction) {
            customDrawFunction(ctx, particle)
          } else {
            switch (particleShape) {
              case "square":
                ctx.fillRect(
                  particle.x - particle.size / 2,
                  particle.y - particle.size / 2,
                  particle.size,
                  particle.size,
                )
                break
              case "triangle":
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y - particle.size)
                ctx.lineTo(particle.x + particle.size, particle.y + particle.size)
                ctx.lineTo(particle.x - particle.size, particle.y + particle.size)
                ctx.closePath()
                ctx.fill()
                break
              case "line":
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particle.x + particle.vx * 5, particle.y + particle.vy * 5)
                ctx.lineWidth = particle.size
                ctx.stroke()
                break
              case "circle":
              default:
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fill()
                break
            }
          }

          ctx.globalAlpha = 1
        }
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
        color: "",
        alpha: 0,
        vx: 0,
        vy: 0,
        originX: 0,
        originY: 0,
        life: 0,
        maxLife: 0,
      }
    }

    const canvas = canvasRef.current
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height

    return {
      x,
      y,
      originX: x,
      originY: y,
      size: minSize + Math.random() * (maxSize - minSize),
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random(),
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      life: 100 + Math.random() * 100,
      maxLife: 100 + Math.random() * 100,
    }
  }

  useEffect(() => {
    const cleanup = initParticles()
    return cleanup
  }, [
    count,
    colors,
    minSize,
    maxSize,
    speed,
    interactive,
    interactionRadius,
    interactionForce,
    noiseIntensity,
    connectParticles,
    connectDistance,
    blendMode,
    mouseGlow,
    mouseGlowSize,
    mouseGlowColor,
    mouseGlowOpacity,
    particleShape,
  ])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ mixBlendMode: blendMode as any }}
    />
  )
}
