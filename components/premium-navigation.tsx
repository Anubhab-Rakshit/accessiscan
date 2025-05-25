"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronDown, Sparkles, Zap, Layers, Users, BarChart, Shield, Headphones, Menu, X } from "lucide-react"

export function PremiumNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const navBackground = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(10, 10, 15, 0.95)"])
  const navPadding = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"])
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const navItems = [
    {
      name: "Features",
      href: "#features",
      dropdown: "features",
      dropdownContent: [
        { icon: Zap, title: "AI Analysis", description: "Scan websites for accessibility issues" },
        { icon: Sparkles, title: "Auto-Fix", description: "Automatically fix common issues" },
        { icon: Layers, title: "Reports", description: "Detailed accessibility reports" },
        { icon: Shield, title: "Compliance", description: "WCAG & ADA compliance tools" },
      ],
    },
    {
      name: "Solutions",
      href: "#solutions",
      dropdown: "solutions",
      dropdownContent: [
        { icon: Users, title: "Enterprise", description: "For large organizations" },
        { icon: BarChart, title: "Startups", description: "For growing businesses" },
        { icon: Headphones, title: "Agencies", description: "For web developers" },
      ],
    },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ]

  const DropdownMenu = ({ item }: { item: any }) => (
    <AnimatePresence>
      {activeDropdown === item.dropdown && (
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 10, height: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-80 rounded-2xl overflow-hidden z-50"
        >
          <div className="backdrop-blur-xl bg-black/90 border border-white/10 p-4 rounded-2xl shadow-2xl">
            <div className="grid gap-3">
              {item.dropdownContent?.map((dropdownItem: any, idx: number) => (
                <motion.a
                  key={idx}
                  href={`#${dropdownItem.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="mt-1 h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <dropdownItem.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{dropdownItem.title}</div>
                    <div className="text-sm text-gray-400">{dropdownItem.description}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: navBackground,
        paddingTop: navPadding,
        paddingBottom: navPadding,
        borderBottom: `1px solid ${navBorder}`,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="group relative z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl">
              <span className="text-lg font-bold">A</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              AccessiScan
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <nav className="flex items-center gap-8">
            {navItems.map((item, i) => (
              <div key={item.name} className="relative group">
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  onClick={() => (item.dropdown ? toggleDropdown(item.dropdown) : null)}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeDropdown === item.dropdown ? "rotate-180" : "",
                      )}
                    />
                  )}
                </motion.button>

                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300" />

                {/* Dropdown menu */}
                {item.dropdown && <DropdownMenu item={item} />}
              </div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <Link
              href="#login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Log In
            </Link>

            <Link
              href="#signup"
              className="px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Start Free Scan
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-10 lg:hidden flex h-10 w-10 items-center justify-center"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto py-6 px-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 text-lg font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="#login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 text-center text-gray-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  Log In
                </Link>
                <Link
                  href="#signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-medium"
                >
                  Start Free Scan
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
