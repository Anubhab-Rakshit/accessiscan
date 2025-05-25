"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Check, Star, Sparkles, Crown, ArrowRight, Rocket, Diamond } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for personal projects",
    features: ["5 website scans per month", "Basic accessibility reports", "WCAG 2.1 Level A checks", "Email support"],
    cta: "Start Free",
    popular: false,
    gradient: "from-slate-600 via-gray-700 to-slate-800",
    glowColor: "slate",
    icon: Star,
    bgPattern: "dots",
  },
  {
    name: "Professional",
    price: { monthly: 99, annual: 79 },
    description: "For growing businesses",
    features: [
      "Unlimited website scans",
      "Advanced AI analysis",
      "WCAG 2.1 Level AA checks",
      "Priority support",
      "Team collaboration (5 users)",
      "API access",
      "Custom reports",
    ],
    cta: "Start Trial",
    popular: true,
    gradient: "from-blue-600 via-purple-600 to-indigo-700",
    glowColor: "blue",
    icon: Rocket,
    bgPattern: "grid",
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "WCAG 2.1 Level AAA checks",
      "Unlimited team members",
      "SSO & advanced security",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-purple-600 via-pink-600 to-rose-700",
    glowColor: "purple",
    icon: Crown,
    bgPattern: "waves",
  },
]

function PricingCard({ plan, index, billingCycle }: { plan: any; index: number; billingCycle: "monthly" | "annual" }) {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]))

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        rotateX: plan.popular ? rotateX : 0,
        rotateY: plan.popular ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative group cursor-pointer", plan.popular ? "z-30" : "z-10")}
    >
      {/* Outer glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-700",
          plan.glowColor === "slate" && "bg-slate-500/30",
          plan.glowColor === "blue" && "bg-blue-500/40",
          plan.glowColor === "purple" && "bg-purple-500/40",
        )}
        animate={{
          opacity: isHovered ? 1 : plan.popular ? 0.6 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
      />

      {/* Main card with rich background */}
      <motion.div
        animate={{
          scale: isPressed ? 0.95 : isHovered ? (plan.popular ? 1.08 : 1.05) : plan.popular ? 1.02 : 1,
          y: isHovered ? -12 : plan.popular ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "relative overflow-hidden rounded-3xl p-8 transition-all duration-500",
          "bg-gradient-to-br",
          plan.gradient,
          "shadow-2xl border border-white/20",
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {plan.bgPattern === "dots" && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          )}
          {plan.bgPattern === "grid" && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          )}
          {plan.bgPattern === "waves" && (
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "60px 60px",
              }}
            />
          )}
        </div>

        {/* Animated particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0,
                }}
                animate={{
                  y: [null, "-30px"],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}

        {/* Popular badge with enhanced styling */}
        {plan.popular && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2"
          >
            <div className="relative px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-sm font-bold rounded-full flex items-center gap-2 shadow-xl border-2 border-white/30">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{
                  rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <Diamond className="w-4 h-4" />
              </motion.div>
              Most Popular
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Plan icon with enhanced styling */}
        <motion.div
          animate={{
            y: isHovered ? [-3, 3, -3] : [0],
            rotate: isHovered ? [0, 10, -10, 0] : [0],
            scale: isHovered ? [1, 1.1, 1] : [1],
          }}
          transition={{
            y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            rotate: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-white/20 backdrop-blur-sm border border-white/30"
        >
          <plan.icon className="w-10 h-10 text-white relative z-10" />
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-2xl"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : [1],
              opacity: isHovered ? [0.2, 0.4, 0.2] : [0.2],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Plan details with enhanced typography */}
        <div className="mb-8">
          <motion.h3
            className="text-3xl font-bold mb-3 text-white"
            animate={{
              textShadow: isHovered
                ? ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
                : ["0 0 0px rgba(255,255,255,0)"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {plan.name}
          </motion.h3>
          <p className="text-white/80 mb-6 text-lg">{plan.description}</p>

          <div className="mb-8">
            {plan.price.monthly !== null ? (
              <motion.div
                className="flex items-baseline gap-3"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  className="text-6xl font-bold text-white"
                  animate={{
                    textShadow: isHovered
                      ? [
                          "0 0 0px rgba(255,255,255,0.5)",
                          "0 0 30px rgba(255,255,255,0.8)",
                          "0 0 0px rgba(255,255,255,0.5)",
                        ]
                      : ["0 0 0px rgba(255,255,255,0.5)"],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  ${billingCycle === "monthly" ? plan.price.monthly : plan.price.annual}
                </motion.span>
                <span className="text-white/70 text-xl">/month</span>
              </motion.div>
            ) : (
              <motion.div
                className="text-4xl font-bold text-white"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  textShadow: isHovered
                    ? [
                        "0 0 0px rgba(255,255,255,0.5)",
                        "0 0 20px rgba(255,255,255,0.8)",
                        "0 0 0px rgba(255,255,255,0.5)",
                      ]
                    : ["0 0 0px rgba(255,255,255,0.5)"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                Custom Pricing
              </motion.div>
            )}
          </div>

          {/* Enhanced CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            className="relative w-full py-4 font-bold rounded-2xl transition-all duration-300 overflow-hidden group bg-white text-gray-900 shadow-xl hover:shadow-2xl"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white to-gray-100"
              animate={{
                x: isHovered ? ["-100%", "100%"] : ["-100%"],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute inset-0 bg-white/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={isPressed ? { scale: 3, opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              {plan.cta}
              <motion.div animate={{ x: isHovered ? 8 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </div>

        {/* Features with enhanced styling */}
        <ul className="space-y-4">
          {plan.features.map((feature, idx) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 + 0.8 }}
              className="flex items-start gap-4 group"
            >
              <motion.div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-white/20 backdrop-blur-sm border border-white/30"
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
              <motion.span
                className="text-white/90 group-hover:text-white transition-colors text-base"
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {feature}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section id="pricing" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Rich animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full mb-8 shadow-2xl border border-white/20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <span className="font-bold text-lg">Pricing Plans</span>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Diamond className="w-6 h-6" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-7xl font-bold mb-8 text-white"
            animate={{
              textShadow: isInView
                ? ["0 0 0px rgba(255,255,255,0.5)", "0 0 40px rgba(59,130,246,0.8)", "0 0 0px rgba(255,255,255,0.5)"]
                : ["0 0 0px rgba(255,255,255,0.5)"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Simple, Transparent
            <br />
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              Pricing
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-2xl text-white/80 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            Choose the perfect plan for your needs. Always flexible to scale up or down.
          </motion.p>

          {/* Enhanced Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.8 }}
            className="relative inline-flex items-center gap-6 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl"
          >
            <motion.div
              className="absolute inset-y-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl"
              animate={{
                x: billingCycle === "monthly" ? 6 : "calc(100% - 6px)",
                width: billingCycle === "monthly" ? "calc(50% - 12px)" : "calc(50% - 12px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "relative z-10 px-10 py-4 rounded-full font-bold transition-colors text-lg",
                billingCycle === "monthly" ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "relative z-10 px-10 py-4 rounded-full font-bold transition-colors flex items-center gap-3 text-lg",
                billingCycle === "annual" ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              Annual
              <motion.span
                className="text-sm bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 px-3 py-1 rounded-full font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Save 20%
              </motion.span>
            </button>
          </motion.div>
        </motion.div>

        {/* Enhanced Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 perspective-1000">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} billingCycle={billingCycle} />
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-24"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="inline-block"
          >
            <p className="text-white/90 mb-6 text-xl">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="text-white/70">
              Questions?{" "}
              <motion.a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors relative font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Talk to our sales team
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
