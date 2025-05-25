"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Monitor, Smartphone, Download, ExternalLink } from "lucide-react"

interface WebsitePreviewProps {
  websitePreview: {
    title: string
    description: string
    screenshots?: {
      hero: string
      full: string
    }
  }
  websiteMetadata: {
    title: string
    language: string
    totalImages: number
    totalLinks: number
    totalForms: number
  }
  url: string
}

export function WebsitePreview({ websitePreview, websiteMetadata, url }: WebsitePreviewProps) {
  const [activeView, setActiveView] = useState<"hero" | "full">("hero")
  const [imageLoaded, setImageLoaded] = useState(false)

  const downloadScreenshot = (type: "hero" | "full") => {
    if (!websitePreview.screenshots) return

    const link = document.createElement("a")
    link.href = websitePreview.screenshots[type]
    link.download = `${websiteMetadata.title}-${type}-screenshot.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!websitePreview.screenshots) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Website Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Monitor className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Screenshots not available</p>
              <p className="text-sm text-gray-500">Analysis completed without visual capture</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Website Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => downloadScreenshot(activeView)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(url, "_blank")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Site
            </Button>
          </div>
        </div>

        {/* Website Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{websitePreview.title}</h3>
          {websitePreview.description && <p className="text-sm text-gray-600">{websitePreview.description}</p>}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{websiteMetadata.totalImages} Images</Badge>
            <Badge variant="secondary">{websiteMetadata.totalLinks} Links</Badge>
            <Badge variant="secondary">{websiteMetadata.totalForms} Forms</Badge>
            <Badge variant="secondary">Language: {websiteMetadata.language.toUpperCase()}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "hero" | "full")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="full" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Full Page
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-4">
            <div className="relative">
              <div className="border rounded-lg overflow-hidden bg-white">
                <img
                  src={websitePreview.screenshots.hero || "/placeholder.svg"}
                  alt="Hero section screenshot"
                  className="w-full h-auto"
                  onLoad={() => setImageLoaded(true)}
                  style={{ maxHeight: "600px", objectFit: "contain" }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">Hero section (1200x800px) - Above the fold content</div>
            </div>
          </TabsContent>

          <TabsContent value="full" className="mt-4">
            <div className="relative">
              <div className="border rounded-lg overflow-hidden bg-white max-h-96 overflow-y-auto">
                <img
                  src={websitePreview.screenshots.full || "/placeholder.svg"}
                  alt="Full page screenshot"
                  className="w-full h-auto"
                  onLoad={() => setImageLoaded(true)}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">Full page screenshot - Complete website capture</div>
            </div>
          </TabsContent>
        </Tabs>

        {imageLoaded && (
          <div className="mt-4 p-3  border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Screenshots captured successfully!</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
