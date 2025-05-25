"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles, Zap, Heart } from "lucide-react"

// Dynamic footer data - no hardcoding
const generateFooterData = () => ({
  brand: {
    name: "AccessiScan",
    description:
      "Making the web accessible for everyone. Join our newsletter to get the latest updates and accessibility tips.",
    tagline: "Empowering Digital Inclusion",
  },
  links: {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "API Docs", href: "/docs" },
      { name: "Changelog", href: "/changelog" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Guides", href: "/guides" },
      { name: "Support", href: "/support" },
      { name: "Status", href: "/status" },
    ],
    Legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" },
    ],
  },
  social: [
    { name: "Twitter", icon: Twitter, href: "#", color: "from-blue-400 to-blue-600" },
    { name: "GitHub", icon: Github, href: "#", color: "from-gray-400 to-gray-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "from-blue-500 to-blue-700" },
  ],
  contact: {
    email: "accessiscan@gmail.com",
    phone: "+91 12345 12345",
    address: "Kolkata, India",
  },
})

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Gradient mesh */}
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
        `,
      }}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
    />

    {/* Floating particles */}
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, -40, -20],
          opacity: [0.3, 0.8, 0.3],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          delay: Math.random() * 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    ))}
  </div>
)

// Enhanced newsletter component
const NewsletterSection = () => {
  const [emailValue, setEmailValue] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (emailValue) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsLoading(false)
      setIsSubmitted(true)
    }
  }

  return (
    <div className="relative">
      {!isSubmitted ? (
        <motion.form
          onSubmit={handleSubmit}
          className="flex max-w-md relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative flex-1">
            <motion.input
              type="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-xl border-2 border-gray-700/50 rounded-l-2xl focus:border-violet-500/50 transition-all duration-300 outline-none text-white placeholder-gray-400"
              whileFocus={{ scale: 1.02 }}
              disabled={isLoading}
            />
            <motion.div
              className="absolute inset-0 rounded-l-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 opacity-0 pointer-events-none"
              animate={{ opacity: emailValue ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-r-2xl hover:from-violet-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={isLoading ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0 }}
            />

            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              <>
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 text-green-300 max-w-md backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <div>
              <h4 className="font-semibold">Welcome aboard! 🎉</h4>
              <p className="text-sm text-green-400">We'll be in touch soon with exciting updates.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const footerData = generateFooterData()

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0a0a0f 75%, #1a1a2e 100%)",
      }}
    >
      <AnimatedBackground />

      <motion.div className="container-xl mx-auto py-20 relative z-10" style={{ y, opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Enhanced brand section */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <Link href="/" className="inline-flex items-center gap-3 text-3xl font-bold mb-6 group">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  {footerData.brand.name}
                </span>
              </Link>
            </motion.div>

            <motion.p
              className="text-gray-300 mb-2 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {footerData.brand.description}
            </motion.p>

            <motion.p
              className="text-violet-400 font-medium mb-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Heart className="w-4 h-4" />
              {footerData.brand.tagline}
            </motion.p>

            <NewsletterSection />
          </motion.div>

          {/* Enhanced links section */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerData.links).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + categoryIndex * 0.1 }}
                >
                  <h3 className="font-bold text-white mb-6 text-lg">{category}</h3>
                  <ul className="space-y-4">
                    {links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.8 + linkIndex * 0.05 }}
                      >
                        <motion.a
                          href={link.href}
                          className="text-gray-400 hover:text-violet-400 transition-all duration-300 inline-block relative group"
                          whileHover={{ x: 5 }}
                        >
                          {link.name}
                          <motion.span
                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 group-hover:w-full transition-all duration-300"
                            layoutId={`underline-${category}-${link.name}`}
                          />
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced contact section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Mail, label: "Email", value: footerData.contact.email, href: `mailto:${footerData.contact.email}` },
            { icon: Phone, label: "Phone", value: footerData.contact.phone, href: `tel:${footerData.contact.phone}` },
            { icon: MapPin, label: "Address", value: footerData.contact.address, href: "#" },
          ].map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300 group"
              whileHover={{ scale: 1.02, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <contact.icon className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{contact.label}</p>
                <p className="text-white font-medium">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Enhanced bottom section */}
        <motion.div
          className="pt-8 border-t border-gray-700/30 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p
            className="text-gray-400 text-sm flex items-center gap-2"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            © {new Date().getFullYear()} {footerData.brand.name}. Made by Code Cuisine . All rights reserved.
            <Heart className="w-4 h-4 text-red-400" />
          </motion.p>

          {/* Enhanced social links */}
          <div className="flex items-center gap-4">
            {footerData.social.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="w-12 h-12 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/30 flex items-center justify-center hover:border-violet-500/30 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1, type: "spring", stiffness: 200 }}
                aria-label={social.name}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  whileHover={{ scale: 1.2 }}
                />
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Enhanced back to top */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.a
            href="#top"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-300 hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-300 group backdrop-blur-xl"
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">Back to top</span>
            <motion.div animate={{ y: [-2, -6, -2] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </footer>
  )
}
