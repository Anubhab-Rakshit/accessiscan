"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Zap, Shield, Globe } from "lucide-react"
import { AnalysisResults } from "./analysis-results"

export function UrlAnalyzer() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    // Basic URL validation
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)
    setError("")
    setResults(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.startsWith("http") ? url : `https://${url}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed")
      }

      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during analysis")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewScan = () => {
    setResults(null)
    setUrl("")
    setError("")
  }

  return (
    <div className="space-y-8">
      {/* URL Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Analyze Website Accessibility</CardTitle>
          <p className="text-center text-gray-600">Enter a website URL to scan for accessibility issues using AI</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="url"
              placeholder="Enter your website URL to get started..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleAnalyze()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button onClick={handleAnalyze} disabled={isLoading || !url.trim()} className="px-8">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Scan Now
                </>
              )}
            </Button>
          </div>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          {/* Features */}
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-green-500" />
              No login required
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-500" />
              GDPR compliant
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <AnalysisResults results={results} onNewScan={handleNewScan} />
    </div>
  )
}
