"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Brain, Code, Users, BarChart3 } from "lucide-react"

export function FloatingElements() {
  const elements = [
    { icon: Zap, color: "from-yellow-400 to-orange-500", delay: 0 },
    { icon: Shield, color: "from-green-400 to-emerald-500", delay: 1 },
    { icon: Brain, color: "from-purple-400 to-pink-500", delay: 2 },
    { icon: Code, color: "from-blue-400 to-cyan-500", delay: 3 },
    { icon: Users, color: "from-indigo-400 to-purple-500", delay: 4 },
    { icon: BarChart3, color: "from-red-400 to-pink-500", delay: 5 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-16 bg-gradient-to-r ${element.color} rounded-full flex items-center justify-center shadow-lg opacity-20`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-8 h-8 text-white" />
        </motion.div>
      ))}
    </div>
  )
}
