"use client"

import { useState } from "react"

export type AnalysisStatus = "idle" | "loading" | "success" | "error"

export interface AccessibilityIssue {
  id: string
  type: "critical" | "serious" | "moderate" | "minor"
  title: string
  description: string
  elements?: {
    selector: string
    html: string
    suggestion: string
  }[]
  wcagCriteria: string
  impact: string
  howToFix?: string
}

export interface AnalysisResult {
  score: number
  issuesCount: {
    critical: number
    serious: number
    moderate: number
    minor: number
  }
  categories: {
    perceivable: number
    operable: number
    understandable: number
    robust: number
  }
  issues: AccessibilityIssue[]
  positives?: {
    title: string
    description: string
    wcagCriteria: string
  }[]
  summary?: {
    overview: string
    criticalFindings: string
    recommendations: string
    estimatedFixTime: string
  }
  automatedChecks?: {
    altTextMissing: number
    lowContrast: number
    missingLabels: number
    emptyLinks: number
    missingLandmarks: boolean
    keyboardTraps: boolean
    focusIndicators: boolean
  }
  websiteMetadata?: {
    title: string
    language: string
    totalImages: number
    totalLinks: number
    totalForms: number
  }
}

export function useAccessibilityAnalysis() {
  const [status, setStatus] = useState<AnalysisStatus>("idle")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState<string>("")

  const analyzeWebsite = async (websiteUrl: string, options = { includeDetailedReport: true }) => {
    try {
      setStatus("loading")
      setError(null)
      setUrl(websiteUrl)

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: websiteUrl, options }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze website")
      }

      const data = await response.json()
      setResult(data.analysis)
      setStatus("success")
      return data.analysis
    } catch (err: any) {
      setStatus("error")
      setError(err.message || "An unexpected error occurred")
      return null
    }
  }

  const generateCodeFix = async (issue: AccessibilityIssue, framework = "html") => {
    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue,
          framework,
          currentCode: issue.elements?.[0]?.html || "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate code fix")
      }

      return await response.json()
    } catch (err) {
      console.error("Error generating code fix:", err)
      return null
    }
  }

  const exportReport = async (format: "pdf" | "excel" | "json") => {
    if (!result || !url) return null

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          analysis: result,
          format,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to export report as ${format}`)
      }

      // For PDF and Excel, return blob for download
      if (format === "pdf" || format === "excel") {
        const blob = await response.blob()
        const downloadUrl = URL.createObjectURL(blob)

        // Create and trigger download
        const a = document.createElement("a")
        a.href = downloadUrl
        a.download = `accessibility-report-${new Date().toISOString().split("T")[0]}.${format === "pdf" ? "pdf" : "xlsx"}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        return true
      }

      // For JSON, return the data
      return await response.json()
    } catch (err) {
      console.error(`Error exporting ${format} report:`, err)
      return null
    }
  }

  const resetAnalysis = () => {
    setStatus("idle")
    setResult(null)
    setError(null)
    setUrl("")
  }

  return {
    status,
    result,
    error,
    url,
    analyzeWebsite,
    generateCodeFix,
    exportReport,
    resetAnalysis,
  }
}
