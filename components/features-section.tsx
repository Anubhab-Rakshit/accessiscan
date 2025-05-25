"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Brain, Zap, Shield, BarChart3, Code2, Users, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { SplitTextReveal } from "@/components/split-text-reveal"
import { Premium3DCard } from "@/components/premium-3d-card"
import { StaggeredCardReveal } from "@/components/staggered-card-reveal"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning understands context, not just rules. Get intelligent suggestions that actually make sense.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Scan entire websites in seconds. Our distributed architecture processes thousands of pages simultaneously.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "WCAG 2.1 Compliant",
    description:
      "Full coverage of Level A, AA, and AAA guidelines. Stay compliant with international accessibility standards.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description:
      "Beautiful, actionable reports that developers love. Export to PDF, share with stakeholders, track progress.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Code2,
    title: "Code Suggestions",
    description: "Get exact code fixes, not vague recommendations. Copy-paste solutions that work in your framework.",
    gradient: "from-red-500 to-rose-600",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built for teams. Assign issues, track fixes, and celebrate improvements together.",
    gradient: "from-sky-500 to-blue-600",
  },
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section id="features" className="py-32 relative" ref={containerRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]" />

      <div className="container-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue border border-blue-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Powerful Features</span>
          </div>

          <SplitTextReveal
            text="Features That Actually Make a Difference"
            animation="slide"
            splitBy="words"
            direction="up"
            staggerChildren={0.05}
            as="h2"
            className="text-display mb-4"
          />

          <SplitTextReveal
            text="We've obsessed over every detail to create the most powerful accessibility platform on the market."
            animation="fade"
            splitBy="words"
            delay={0.5}
            staggerChildren={0.02}
            as="p"
            className="text-body max-w-2xl mx-auto"
          />
        </div>

        {/* Features Grid */}
        <StaggeredCardReveal
          direction="left"
          staggerDelay={0.1}
          duration={0.7}
          distance={100}
          rotate={5}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          itemClassName="h-full"
        >
          {features.map((feature, i) => (
            <Premium3DCard
              key={feature.title}
              className="h-full"
              depth={1}
              glareEnabled={true}
              rotationIntensity={10}
              hoverScale={1.05}
              backgroundGradient=""
              backgroundColor="bg-black"
              borderWidth="border"
              borderColor="border-gray-200"
              contentPadding="p-8"
            >
              <div className="group relative h-full">
                {/* Gradient border on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient.split(" ")[1]}, ${
                      feature.gradient.split(" ")[3]
                    })`,
                  }}
                />

                {/* Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg p-2.5 mb-6 relative overflow-hidden",
                    "before:absolute before:inset-0 before:bg-gradient-to-r before:opacity-100",
                    feature.gradient,
                  )}
                >
                  <feature.icon className="w-full h-full text-white relative z-10" />
                </div>

                {/* Content */}
                <SplitTextReveal
                  text={feature.title}
                  animation="slide"
                  splitBy="words"
                  direction="up"
                  delay={0.2}
                  as="h3"
                  className="text-xl font-medium mb-3"
                />

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Premium3DCard>
          ))}
        </StaggeredCardReveal>
      </div>
    </section>
  )
}
