"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Sparkles, Zap, Shield, BarChart, Layers, Users } from "lucide-react"

// Feature card data
const features = [
  {
    title: "AI-Powered Analysis",
    description: "Our advanced AI scans your website and identifies accessibility issues in seconds.",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    rotation: -5,
  },
  {
    title: "WCAG Compliance",
    description: "Ensure your website meets all Web Content Accessibility Guidelines standards.",
    icon: Shield,
    color: "from-indigo-500 to-blue-500",
    rotation: 3,
  },
  {
    title: "Detailed Reports",
    description: "Get comprehensive reports with actionable insights to improve accessibility.",
    icon: BarChart,
    color: "from-purple-500 to-indigo-500",
    rotation: -3,
  },
  {
    title: "Code Suggestions",
    description: "Receive code-level suggestions to fix accessibility issues quickly.",
    icon: Layers,
    color: "from-pink-500 to-purple-500",
    rotation: 5,
  },
  {
    title: "User Simulation",
    description: "Experience your website from the perspective of users with different abilities.",
    icon: Users,
    color: "from-orange-500 to-pink-500",
    rotation: -4,
  },
  {
    title: "Real-time Monitoring",
    description: "Monitor your website's accessibility score in real-time as you make changes.",
    icon: Sparkles,
    color: "from-yellow-500 to-orange-500",
    rotation: 4,
  },
]

export function Premium3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  // Auto-rotate through features
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-950 to-black" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(0,100,255,0.1),transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent,rgba(0,100,255,0.1),transparent)] animate-[spin_20s_linear_infinite]"></div>
      </div>
      
      <div className="container-xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Premium Features</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Powerful
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Accessibility Tools
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our comprehensive suite of accessibility tools helps you identify, fix, and monitor 
            accessibility issues on your website.
          </p>
        </motion.div>

        {/* 3D Feature Showcase */}
        <div className="relative h-[600px] mb-16">
          {/* Center spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)] z-0"></div>
          
          {/* Feature cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {features.map((feature, index) => {
              const isActive = index === activeIndex
              const angle = (index * (360 / features.length) + scrollYProgress.get() * 30) * (Math.PI / 180)
              const radius = 250
              const x = Math.cos(angle) * radius
              const z = Math.sin(angle) * radius
              
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    x: x,
                    y: 0,
                    z: z,
                    rotateY: angle * (180 / Math.PI),
                    scale: isActive ? 1.2 : 0.8,
                    zIndex: isActive ? 10 : 5,
                  }}
                  animate={{
                    x: x,
                    z: z,
                    rotateY: angle * (180 / Math.PI),
                    scale: isActive ? 1.2 : 0.8,
                    opacity: z < 0 ? 0.6 : 1,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <motion.div
                    className="w-64 h-80 rounded-2xl backdrop-blur-lg p-6 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'} 0%, ${isActive ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)'} 100%)`,
                      border: `1px solid ${isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
                      transform: `perspective(1000px) rotateX(${feature.rotation}deg)`,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateX: 0,
                      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                      borderColor: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                    
                    {isActive && (
                      <motion.div
                        className="mt-6 pt-4 border-t border-white/10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium">
                          Learn More
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Navigation dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-blue-500 scale-125' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Feature highlight */}
        <motion.div
          className="max-w-4xl mx-auto"
          style={{ opacity, y, scale }}
        >
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${features[activeIndex].color} flex items-center justify-center mb-6`}>
                  {React.createElement(features[activeIndex].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{features[activeIndex].title}</h3>
                <p className="text-gray-400">{features[activeIndex].description}</p>
                <div className="mt-8">
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                    Explore Feature
                  </button>
                </div>
              </div>
              
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl aspect-square flex items-center justify-center p-8 border border-white/5"
                style={{ rotate }}
                whileHover={{ rotate: 0 }}
              >
                <div className="relative w-full h-full">
                  {/* Feature visualization placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">\
                    <features[activeIndex].icon className="w-16 h-16 text-blue-400" />
                  </div>
                  
                  {/* Orbiting elements */}
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-blue-500"
                      style={{
                        transform: `rotate(${i * 120}deg) translateX(100px) rotate(${-i * 120}deg)`,
                        animation: `orbit ${6 + i}s linear infinite`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* CSS for orbiting animation */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}
