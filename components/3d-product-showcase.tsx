"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Monitor, Smartphone, Tablet, Zap } from "lucide-react"
import { Premium3DCard } from "@/components/premium-3d-card"

const showcaseItems = [
  {
    icon: Monitor,
    title: "Desktop Analysis",
    description: "Comprehensive desktop website scanning with detailed accessibility reports",
    gradient: "from-blue-500 to-indigo-600",
    features: ["Full page scanning", "WCAG 2.1 compliance", "Performance metrics"],
  },
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    description: "Mobile-first accessibility testing for responsive designs",
    gradient: "from-purple-500 to-pink-600",
    features: ["Touch accessibility", "Screen reader testing", "Mobile navigation"],
  },
  {
    icon: Tablet,
    title: "Cross-Platform",
    description: "Test across all devices and platforms for universal accessibility",
    gradient: "from-green-500 to-emerald-600",
    features: ["Multi-device testing", "Platform compatibility", "Universal design"],
  },
]

export function Product3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="container-xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">Product Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Accessibility Testing
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Across All Platforms
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Our AI-powered platform ensures your website is accessible on every device, for every user, in every
            situation.
          </motion.p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
            >
              <Premium3DCard
                className="h-full"
                depth={1.5}
                glareEnabled={true}
                rotationIntensity={15}
                hoverScale={1.05}
                backgroundGradient=""
                backgroundColor="bg-white/5"
                borderWidth="border"
                borderColor="border-white/20"
                contentPadding="p-8"
              >
                <div className="text-center space-y-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.gradient} p-4 shadow-lg`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/70 mb-6">{item.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 bg-gradient-to-r ${item.gradient} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Learn More
                  </motion.button>
                </div>
              </Premium3DCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
            <div className="text-white/70">Accuracy Rate</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-white/70">Supported Devices</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-white/70">Monitoring</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
