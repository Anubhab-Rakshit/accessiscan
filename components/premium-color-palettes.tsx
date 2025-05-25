"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Sparkles, Zap, Moon, Sun, Sunset, Waves } from "lucide-react"

interface ColorPalette {
  id: string
  name: string
  description: string
  icon: any
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    gradient: string
  }
  css: {
    [key: string]: string
  }
}

const colorPalettes: ColorPalette[] = [
  {
    id: "cyber-blue",
    name: "Cyber Blue",
    description: "Futuristic tech-inspired palette with electric blues and neon accents",
    icon: Zap,
    colors: {
      primary: "#00D4FF",
      secondary: "#0099CC",
      accent: "#FF0080",
      background: "#0A0E1A",
      text: "#E0F4FF",
      gradient: "linear-gradient(135deg, #00D4FF 0%, #0099CC 50%, #FF0080 100%)",
    },
    css: {
      "--primary": "0 212 255",
      "--secondary": "0 153 204",
      "--accent": "255 0 128",
      "--background": "10 14 26",
      "--foreground": "224 244 255",
    },
  },
  {
    id: "aurora-purple",
    name: "Aurora Purple",
    description: "Mystical aurora-inspired colors with deep purples and ethereal greens",
    icon: Sparkles,
    colors: {
      primary: "#8B5CF6",
      secondary: "#A855F7",
      accent: "#10B981",
      background: "#1A0B2E",
      text: "#F3E8FF",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #10B981 100%)",
    },
    css: {
      "--primary": "139 92 246",
      "--secondary": "168 85 247",
      "--accent": "16 185 129",
      "--background": "26 11 46",
      "--foreground": "243 232 255",
    },
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm sunset palette with vibrant oranges and golden yellows",
    icon: Sunset,
    colors: {
      primary: "#FF6B35",
      secondary: "#F7931E",
      accent: "#FFD23F",
      background: "#2D1B0E",
      text: "#FFF8E7",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)",
    },
    css: {
      "--primary": "255 107 53",
      "--secondary": "247 147 30",
      "--accent": "255 210 63",
      "--background": "45 27 14",
      "--foreground": "255 248 231",
    },
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    description: "Deep ocean-inspired palette with calming teals and aqua blues",
    icon: Waves,
    colors: {
      primary: "#14B8A6",
      secondary: "#0891B2",
      accent: "#06B6D4",
      background: "#0F1419",
      text: "#E6FFFA",
      gradient: "linear-gradient(135deg, #14B8A6 0%, #0891B2 50%, #06B6D4 100%)",
    },
    css: {
      "--primary": "20 184 166",
      "--secondary": "8 145 178",
      "--accent": "6 182 212",
      "--background": "15 20 25",
      "--foreground": "230 255 250",
    },
  },
  {
    id: "midnight-dark",
    name: "Midnight Dark",
    description: "Sophisticated dark palette with subtle grays and silver accents",
    icon: Moon,
    colors: {
      primary: "#6B7280",
      secondary: "#4B5563",
      accent: "#E5E7EB",
      background: "#111827",
      text: "#F9FAFB",
      gradient: "linear-gradient(135deg, #6B7280 0%, #4B5563 50%, #E5E7EB 100%)",
    },
    css: {
      "--primary": "107 114 128",
      "--secondary": "75 85 99",
      "--accent": "229 231 235",
      "--background": "17 24 39",
      "--foreground": "249 250 251",
    },
  },
  {
    id: "solar-gold",
    name: "Solar Gold",
    description: "Luxurious gold and amber palette with warm, premium feel",
    icon: Sun,
    colors: {
      primary: "#F59E0B",
      secondary: "#D97706",
      accent: "#FCD34D",
      background: "#1F1611",
      text: "#FFFBEB",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #FCD34D 100%)",
    },
    css: {
      "--primary": "245 158 11",
      "--secondary": "217 119 6",
      "--accent": "252 211 77",
      "--background": "31 22 17",
      "--foreground": "255 251 235",
    },
  },
]

export function PremiumColorPalettes() {
  const [activePalette, setActivePalette] = useState(colorPalettes[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const changePalette = (palette: ColorPalette) => {
    if (palette.id === activePalette.id) return

    setIsTransitioning(true)

    // Apply CSS variables to document root
    const root = document.documentElement
    Object.entries(palette.css).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    setTimeout(() => {
      setActivePalette(palette)
      setIsTransitioning(false)
    }, 300)
  }

  // Initialize with first palette
  useEffect(() => {
    changePalette(colorPalettes[0])
  }, [])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic background based on active palette */}
      <motion.div
        key={activePalette.id}
        className="absolute inset-0"
        style={{ background: activePalette.colors.gradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      />

      <div className="container-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Palette className="w-5 h-5" style={{ color: activePalette.colors.primary }} />
            </motion.div>
            <span className="text-sm font-semibold">Dynamic Color Palettes</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Premium
            <span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage: activePalette.colors.gradient }}
            >
              Color Systems
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our platform with carefully crafted color palettes designed for maximum visual impact and
            accessibility compliance.
          </p>
        </motion.div>

        {/* Active palette showcase */}
        <motion.div className="max-w-4xl mx-auto mb-16" layout transition={{ duration: 0.5 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePalette.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Palette info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: activePalette.colors.primary }}
                    >
                      <activePalette.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold" style={{ color: activePalette.colors.text }}>
                        {activePalette.name}
                      </h3>
                      <p className="text-gray-400">{activePalette.description}</p>
                    </div>
                  </div>

                  {/* Color swatches */}
                  <div className="grid grid-cols-5 gap-3">
                    {Object.entries(activePalette.colors)
                      .slice(0, 5)
                      .map(([name, color]) => (
                        <motion.div
                          key={name}
                          className="group cursor-pointer"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div
                            className="w-full h-16 rounded-xl border-2 border-white/20 shadow-lg"
                            style={{ backgroundColor: color }}
                          />
                          <div className="mt-2 text-center">
                            <div className="text-xs font-medium capitalize text-gray-300">{name}</div>
                            <div className="text-xs text-gray-500 font-mono">{color}</div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* Preview card */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="rounded-2xl border-2 p-6 backdrop-blur-xl"
                    style={{
                      backgroundColor: activePalette.colors.background + "80",
                      borderColor: activePalette.colors.primary + "40",
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold" style={{ color: activePalette.colors.text }}>
                          Preview Card
                        </h4>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: activePalette.colors.accent }}
                        />
                      </div>

                      <p style={{ color: activePalette.colors.text + "CC" }}>
                        This is how your content would look with the {activePalette.name} palette.
                      </p>

                      <motion.button
                        className="w-full py-3 rounded-xl font-semibold transition-all"
                        style={{
                          backgroundColor: activePalette.colors.primary,
                          color: activePalette.colors.background,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sample Button
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Palette selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorPalettes.map((palette, index) => (
            <motion.button
              key={palette.id}
              onClick={() => changePalette(palette)}
              className={`group relative p-4 rounded-2xl border-2 transition-all ${
                activePalette.id === palette.id
                  ? "border-white/40 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Gradient preview */}
              <div className="w-full h-20 rounded-xl mb-3" style={{ background: palette.colors.gradient }} />

              {/* Palette info */}
              <div className="text-center">
                <h4 className="font-semibold text-sm mb-1">{palette.name}</h4>
                <div className="flex justify-center gap-1">
                  {Object.values(palette.colors)
                    .slice(0, 4)
                    .map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                </div>
              </div>

              {/* Active indicator */}
              {activePalette.id === palette.id && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: palette.colors.primary }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Transition overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ backgroundColor: activePalette.colors.background + "E6" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: activePalette.colors.primary }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Palette className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-lg font-semibold" style={{ color: activePalette.colors.text }}>
                  Applying {activePalette.name}...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
