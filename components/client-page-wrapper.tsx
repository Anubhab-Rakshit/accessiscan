"use client"

import dynamic from "next/dynamic"

// Dynamically import client-side components to prevent SSR issues
const WebGLBackground = dynamic(
  () => import("@/components/webgl-background").then((mod) => ({ default: mod.WebGLBackground })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />,
  },
)

const AdvancedHeroSection = dynamic(
  () => import("@/components/advanced-hero-section").then((mod) => ({ default: mod.AdvancedHeroSection })),
  {
    ssr: false,
  },
)

const Product3DShowcase = dynamic(
  () => import("@/components/3d-product-showcase").then((mod) => ({ default: mod.Product3DShowcase })),
  {
    ssr: false,
  },
)

const PremiumSlideshowCards = dynamic(
  () => import("@/components/premium-slideshow-cards").then((mod) => ({ default: mod.PremiumSlideshowCards })),
  {
    ssr: false,
  },
)

const LiveDemo = dynamic(() => import("@/components/live-demo").then((mod) => ({ default: mod.LiveDemo })), {
  ssr: false,
})

const FeaturesSection = dynamic(
  () => import("@/components/features-section").then((mod) => ({ default: mod.FeaturesSection })),
  {
    ssr: false,
  },
)

const MetricsSection = dynamic(
  () => import("@/components/metrics-section").then((mod) => ({ default: mod.MetricsSection })),
  {
    ssr: false,
  },
)

const PricingSection = dynamic(
  () => import("@/components/pricing-section").then((mod) => ({ default: mod.PricingSection })),
  {
    ssr: false,
  },
)

const Footer = dynamic(() => import("@/components/footer").then((mod) => ({ default: mod.Footer })), {
  ssr: false,
})

const SimplifiedGestureControls = dynamic(
  () => import("@/components/simplified-gesture-controls").then((mod) => ({ default: mod.SimplifiedGestureControls })),
  {
    ssr: false,
  },
)

const AdvancedAudioSystem = dynamic(
  () => import("@/components/advanced-audio-system").then((mod) => ({ default: mod.AdvancedAudioSystem })),
  {
    ssr: false,
  },
)

const PremiumNavigation = dynamic(
  () => import("@/components/premium-navigation").then((mod) => ({ default: mod.PremiumNavigation })),
  {
    ssr: false,
  },
)

export function ClientPageWrapper() {
  return (
    <>
      <main className="relative">
        <PremiumNavigation />
        <Product3DShowcase />
        <PremiumSlideshowCards />
        <LiveDemo />
        <FeaturesSection />
        <MetricsSection />
        <PricingSection />
        <Footer />
      </main>
    </>
  )
}

export function ClientBackgroundWrapper() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <WebGLBackground />
    </div>
  )
}
