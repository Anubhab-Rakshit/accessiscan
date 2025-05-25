"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Glasses, Smartphone, AlertCircle, CheckCircle } from "lucide-react"

export function VrArExperience() {
  const [xrSupported, setXrSupported] = useState<boolean | null>(null)
  const [xrMode, setXrMode] = useState<"vr" | "ar">("vr")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<any>(null)

  // Check if WebXR is supported
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.xr) {
      Promise.all([navigator.xr.isSessionSupported("immersive-vr"), navigator.xr.isSessionSupported("immersive-ar")])
        .then(([vrSupported, arSupported]) => {
          setXrSupported(vrSupported || arSupported)
        })
        .catch((err) => {
          console.error("Error checking XR support:", err)
          setXrSupported(false)
        })
    } else {
      setXrSupported(false)
    }
  }, [])

  // Start XR session
  const startXrSession = async () => {
    if (!navigator.xr) {
      setError("WebXR not supported in your browser")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const sessionType = xrMode === "vr" ? "immersive-vr" : "immersive-ar"
      const supported = await navigator.xr.isSessionSupported(sessionType)

      if (!supported) {
        throw new Error(`${xrMode.toUpperCase()} not supported on this device`)
      }

      const xrSession = await navigator.xr.requestSession(sessionType, {
        requiredFeatures: xrMode === "ar" ? ["hit-test"] : [],
        optionalFeatures: ["local-floor", "bounded-floor"],
      })

      // Set up XR session
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl", { xrCompatible: true })

      if (!gl) {
        throw new Error("WebGL not supported")
      }

      await xrSession.updateRenderState({
        baseLayer: new XRWebGLLayer(xrSession, gl),
      })

      // Handle session end
      xrSession.addEventListener("end", () => {
        setSession(null)
        setIsLoading(false)
      })

      setSession(xrSession)

      // Start the XR session
      // In a real app, you would set up a render loop here
    } catch (err: any) {
      console.error("Error starting XR session:", err)
      setError(err.message || "Failed to start XR session")
    } finally {
      setIsLoading(false)
    }
  }

  // End XR session
  const endXrSession = () => {
    if (session) {
      session.end()
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">Accessibility Testing in VR/AR</h2>
          <p className="text-white/80 mt-2">Experience your website from different perspectives</p>
        </div>

        <Tabs value={xrMode} onValueChange={(value) => setXrMode(value as "vr" | "ar")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1">
            <TabsTrigger
              value="vr"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Glasses className="h-4 w-4 mr-2" />
              VR Mode
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              AR Mode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vr" className="mt-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium text-white mb-2">Virtual Reality Testing</h3>
              <p className="text-white/80 mb-4">
                Test your website in VR to experience it from different user perspectives, including:
              </p>
              <ul className="space-y-2 mb-4 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Screen reader simulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Color blindness filters</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Keyboard-only navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Motor impairment simulation</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="ar" className="mt-4">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-4 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium text-white mb-2">Augmented Reality Testing</h3>
              <p className="text-white/80 mb-4">Use AR to visualize accessibility issues in real-time:</p>
              <ul className="space-y-2 mb-4 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Overlay accessibility issues on your screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Visualize user flows and navigation paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Test mobile responsiveness in real environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Identify touch target size issues</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          {xrSupported === null ? (
            <div className="text-center text-white/70">
              <p>Checking XR support...</p>
            </div>
          ) : xrSupported ? (
            <div className="space-y-4">
              {!session ? (
                <Button
                  onClick={startXrSession}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Starting..." : `Launch ${xrMode.toUpperCase()} Experience`}
                </Button>
              ) : (
                <Button
                  onClick={endXrSession}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-12"
                >
                  Exit XR Experience
                </Button>
              )}

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-white">
                  <AlertCircle className="h-5 w-5 text-red-300" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-white">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-300" />
                <p className="font-medium">WebXR not supported</p>
              </div>
              <p className="text-sm text-white/80">
                Your browser or device doesn't support WebXR. Try using a compatible browser like Chrome on Android or
                use a VR headset.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
