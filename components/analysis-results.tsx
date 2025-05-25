"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, XCircle, Info, Download, FileText, RefreshCw } from "lucide-react"
import { WebsitePreview } from "./website-preview"

interface AnalysisResultsProps {
  results?: {
    success: boolean
    analysis: {
      score: number
      grade: string
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
      issues: Array<{
        id: string
        type: "critical" | "serious" | "moderate" | "minor"
        title: string
        description: string
        wcagCriteria: string
        impact: string
        howToFix: string
        priority: string
      }>
      positives: Array<{
        title: string
        description: string
        wcagCriteria: string
      }>
      summary: {
        overview: string
        criticalFindings: string
        recommendations: string[]
        estimatedFixTime: string
      }
      automatedChecks: {
        altTextMissing: number
        emptyLinks: number
        missingLabels: number
        headingStructure: string
        colorContrastIssues: number
        keyboardAccessibility: string
      }
      screenshots?: {
        hero: string
        full: string
      }
    }
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
    processingTime: string
  } | null
  onNewScan: () => void
}

export function AnalysisResults({ results, onNewScan }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Add these functions at the top of the component, after the imports
  const downloadPDF = async () => {
    try {
      const response = await fetch("/api/export/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ results, url: results?.url }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `accessibility-report-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    }
  }

  const downloadExcel = async () => {
    try {
      const response = await fetch("/api/export/excel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ results, url: results?.url }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate Excel file")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `accessibility-analysis-${new Date().toISOString().split("T")[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading Excel:", error)
      alert("Failed to generate Excel file. Please try again.")
    }
  }

  // Handle case when results is undefined or null
  if (!results) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center">
            <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
            <p className="text-gray-600 mb-4">Enter a website URL above to start the analysis.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Handle case when analysis failed
  if (!results.success) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analysis Failed</h3>
            <p className="text-gray-600 mb-4">We couldn't analyze this website. Please try again.</p>
            <Button onClick={onNewScan}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { analysis } = results

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "serious":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "moderate":
        return <Info className="h-4 w-4 text-yellow-500" />
      case "minor":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const totalIssues =
    analysis.issuesCount.critical +
    analysis.issuesCount.serious +
    analysis.issuesCount.moderate +
    analysis.issuesCount.minor

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Accessibility Analysis Results</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{results.url}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={downloadExcel}>
                <FileText className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button onClick={onNewScan} size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                New Scan
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Website Preview */}
      {results.websitePreview && (
        <WebsitePreview
          websitePreview={results.websitePreview}
          websiteMetadata={results.websiteMetadata}
          url={results.url}
        />
      )}

      {/* Main Results */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues ({totalIssues})</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="positives">Positives</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(analysis.score)}`}>{analysis.score}/100</div>
                  <Badge variant="secondary" className="mt-2">
                    Grade {analysis.grade}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Issues by Severity */}
            <Card>
              <CardHeader>
                <CardTitle>Issues by Severity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Critical
                  </span>
                  <span className="font-semibold">{analysis.issuesCount.critical}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Serious
                  </span>
                  <span className="font-semibold">{analysis.issuesCount.serious}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-yellow-500" />
                    Moderate
                  </span>
                  <span className="font-semibold">{analysis.issuesCount.moderate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    Minor
                  </span>
                  <span className="font-semibold">{analysis.issuesCount.minor}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Overview</h4>
                <p className="text-gray-700">{analysis.summary.overview}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Critical Findings</h4>
                <p className="text-gray-700">{analysis.summary.criticalFindings}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Estimated Fix Time</h4>
                <Badge variant="outline">{analysis.summary.estimatedFixTime}</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {analysis.issues && analysis.issues.length > 0 ? (
            analysis.issues.map((issue, index) => (
              <Card key={issue.id || index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getIssueIcon(issue.type)}
                      <CardTitle className="text-lg">{issue.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={issue.type === "critical" ? "destructive" : "secondary"}>{issue.type}</Badge>
                      <Badge variant="outline">{issue.wcagCriteria}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{issue.description}</p>
                  <div>
                    <h5 className="font-semibold mb-1">Impact</h5>
                    <p className="text-sm text-gray-600">{issue.impact}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">How to Fix</h5>
                    <p className="text-sm text-gray-600">{issue.howToFix}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Issues Found!</h3>
                  <p className="text-gray-600">This website has excellent accessibility.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(analysis.categories).map(([category, score]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Score</span>
                      <span className="font-semibold">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positives" className="space-y-4">
          {analysis.positives && analysis.positives.length > 0 ? (
            analysis.positives.map((positive, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">{positive.title}</CardTitle>
                    <Badge variant="outline">{positive.wcagCriteria}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{positive.description}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Positive Features Detected</h3>
                  <p className="text-gray-600">Run the analysis to see positive accessibility features.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Processing Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Analysis completed in {results.processingTime}</span>
            <span>Powered by Gemini AI</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
