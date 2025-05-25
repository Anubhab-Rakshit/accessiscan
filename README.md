# 🚀 AccessiScan - AI-Powered Web Accessibility Analyzer

<div align="center">

![AccessiScan Logo](https://img.shields.io/badge/AccessiScan-AI%20Accessibility-blue?style=for-the-badge\&logo=accessibility)

**The most comprehensive AI-powered web accessibility analysis tool that actually works.**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square\&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square\&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square\&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-orange?style=flat-square\&logo=google)](https://ai.google.dev/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-23.0-green?style=flat-square\&logo=puppeteer)](https://pptr.dev/)

[🌟 Live Demo](https://accessiscan.vercel.app) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [🤝 Contributing](#contributing)

</div>

---

## 🎯 What is AccessiScan?

AccessiScan is an enterprise-grade, AI-driven web accessibility analyzer designed to help developers, designers, and QA engineers ensure their websites meet ADA & WCAG guidelines. Powered by Google Gemini 1.5 Flash and Puppeteer, AccessiScan performs in-depth scans, identifies real accessibility issues, and delivers contextual, AI-generated recommendations in easy-to-understand reports.

* **Inclusive by Default:** Automatically detect issues across WCAG 2.1 levels A, AA, and AAA.
* **Enterprise Ready:** Real-time scanning in under 30 seconds, comprehensive exports (PDF/Excel), and seamless CI/CD integration.
* **AI-Powered Insights:** Uses advanced multimodal AI to distinguish true errors from false positives and suggest precise fixes.

---

## 📋 Table of Contents

1. [✨ Key Features](#-key-features)
2. [🛠 Tech Stack](#-tech-stack)
3. [📦 Installation & Setup](#-installation--setup)
4. [🚀 Quick Start](#-quick-start)
5. [🔧 Configuration](#-configuration)
6. [📖 Usage & Demo](#-usage--demo)
7. [🏗 Architecture & Project Structure](#-architecture--project-structure)
8. [📱 API Reference](#-api-reference)
9. [🎨 UI Components & Accessibility](#-ui-components--accessibility)
10. [📊 Export & Reporting](#-export--reporting)
11. [🧪 Testing & CI](#-testing--ci)
12. [🤝 Contributing & Roadmap](#-contributing--roadmap)
13. [📄 License](#-license)

---

## ✨ Key Features

### 1. AI-Powered Analysis

* **Gemini 1.5 Flash Integration:** Leverage Google’s state-of-the-art AI for multimodal accessibility checks.
* **Visual & Code Inspection:** Combines DOM scanning with full-page screenshots to catch visual contrast issues and missing alt tags.
* **Smart Issue Filtering:** AI-driven classification to reduce false positives by over 60%.
* **Contextual Fix Suggestions:** Natural language recommendations with code snippets for rapid remediation.

### 2. Comprehensive Coverage

* **WCAG 2.1 Compliance:** Full support for Level A, AA, and AAA criteria.
* **Dynamic Content Support:** Works seamlessly with SPAs built on React, Vue, Angular, Svelte, and more.
* **Lazy Loading & Infinite Scroll:** Auto-triggers interactions to scan hidden or deferred content.
* **Verification Bypass:** Integrates CAPTCHA and bot-check bypass for uninterrupted scans.
* **Mobile & Desktop Modes:** Simulate multiple viewports, including screen reader and keyboard-only flows.

### 3. Professional Reporting

* **PDF Reports:** High-fidelity, print-ready documents with an executive summary, issue breakdown, remediation steps, and visual snapshots.
* **Excel Exports:** Five-sheet workbook with summary, issue logs, positives, element inventory, and prioritized recommendations.
* **Interactive Dashboard:** Web UI with filterable tables, severity heatmaps, and before/after comparison charts.
* **Progress Tracking:** Historical data retention, trend analysis, and team performance metrics.

### 4. Premium UI/UX

* **3D Animations & WebGL Backgrounds:** Engaging visuals powered by React Three Fiber and Three.js.
* **Gesture & Keyboard Controls:** Full keyboard navigation, focus outlines, and ARIA roles for the UI itself.
* **Theme System:** Dark, light, and high-contrast themes with user preferences saved.
* **Custom Cursor & Micro-interactions:** Subtle animations to enhance discoverability.

### 5. Performance & Scalability

* **Under-30s Scan Times:** Optimized Puppeteer workflows and caching strategies.
* **Error Recovery:** Automatic retry and failure handling for unreliable network conditions.
* **Rate Limiting & Throttling:** Protect your APIs and ensure reliable operation at scale.
* **Serverless & Cloud-Native:** Deploy on Vercel, AWS Lambda, or any Node.js environment.

---

## 🛠 Tech Stack

### Frontend

```json
{
  "framework": "Next.js 15.0 (App Router)",
  "language": "TypeScript 5.6",
  "styling": "Tailwind CSS 3.4",
  "ui_library": "shadcn/ui + Radix UI",
  "animations": "Framer Motion 11.11",
  "3d_graphics": "React Three Fiber + Three.js",
  "icons": "Lucide React",
  "fonts": "Inter, Clash Display, JetBrains Mono"
}
```

### Backend & AI

```json
{
  "runtime": "Node.js 20+",
  "ai_model": "Google Gemini 1.5 Flash",
  "web_scraping": "Puppeteer 23.0",
  "pdf_generation": "jsPDF 2.5 + Puppeteer PDF API",
  "excel_export": "xlsx 0.18",
  "image_processing": "Canvas API + Sharp"
}
```

### Deployment & DevOps

```json
{
  "package_manager": "npm/yarn/pnpm",
  "ci": "GitHub Actions",
  "linting": "ESLint + Prettier + Stylelint",
  "monitoring": "Sentry + Vercel Analytics",
  "deployment": "Vercel (Serverless)",
  "environment": "Environment Variables + Secret Management"
}
```

---

## 📦 Installation & Setup

### Prerequisites

* **Node.js 20+**
* **npm/yarn/pnpm**
* **Gemini API Key** from [Google AI Studio](https://makersuite.google.com/) or environment variable
* **Git**

### Clone & Install

```bash
# Clone the repo
git clone https://github.com/yourusername/accessiscan.git
cd accessiscan

# Install dependencies
npm install
# or yarn install
# or pnpm install
```

### Environment Variables

```bash
# Copy example
cp .env.example .env.local

# Add your keys
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_URL=http://localhost:3000
PUPPETEER_TIMEOUT=30000
MAX_ANALYSIS_TIME=60000
ENABLE_SCREENSHOTS=true
ENABLE_VERIFICATION_BYPASS=true
```

---

## 🚀 Quick Start

```bash
# Development
npm run dev
# Open http://localhost:3000 in your browser

# Production
npm run build
npm start
```

Visit `http://localhost:3000` to access the dashboard.

---

## 🔧 Configuration

### Global Config

```typescript
// lib/config.ts
export const CONFIG = {
  analysis: {
    timeout: Number(process.env.PUPPETEER_TIMEOUT) || 30000,
    maxElements: 10000,
    screenshotQuality: 90,
    enableFrameworkDetection: true,
  },
  ui: {
    theme: process.env.DEFAULT_THEME || 'dark',
    animations: true,
    particleEffects: true,
    customCursor: true,
  },
  export: {
    pdfQuality: 'high',
    includeScreenshots: true,
    brandingEnabled: true,
  },
};
```

### CLI & API Options

Additional flags and environment variables allow granular control over scan depth, concurrency, and export formats. See [Configuration Docs](#configuration) for full details.

---

## 🎞 Usage & Demo

1. **Enter URL** — Provide the target website URL in the input field.
2. **Customize Scan** — Toggle screenshots, framework waiting, and bypass options.
3. **Run Analysis** — Click “Start Scan”; grab a coffee ☕ while AI works its magic.
4. **Review Report** — Explore issues, positives, and recommendations in the interactive UI.
5. **Export** — Download PDF or Excel for sharing with stakeholders.

[🔗 Watch a 2-minute demo](https://youtu.be/demo-link)

---

## 🏗 Architecture & Project Structure

```plaintext
accessiscan/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── analyze/route.ts      # Main analysis endpoint
│   │   ├── export/pdf/route.ts   # PDF generation endpoint
│   │   └── export/excel/route.ts # Excel generation endpoint
│   ├── analyze/page.tsx          # Interactive analysis UI
│   ├── dashboard/page.tsx        # Historical reports & metrics
│   ├── globals.css               # Global styles
│   └── layout.tsx                # App shell & providers
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui primitives
│   ├── analyzer/
│   ├── dashboard/
│   ├── heroes/
│   └── [50+ premium components]
├── lib/                          # Utilities & configs
│   ├── gemini-config.ts          # AI client setup
│   └── puppeteer.ts              # Puppeteer wrapper functions
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript types & interfaces
├── public/                       # Static assets (fonts, images)
├── scripts/                      # Build & release scripts
├── tests/                        # Unit, E2E, accessibility tests
│   ├── unit/
│   ├── e2e/
│   └── a11y/
└── .github/                      # CI/CD workflows
```

---

## 📱 API Reference

### POST `/api/analyze`

**Description:** Run an accessibility analysis on a given URL.

**Request**

```json
{
  "url": "https://example.com",
  "options": {
    "includeScreenshots": true,
    "waitForFrameworks": true,
    "bypassVerification": true,
    "timeout": 45000
  }
}
```

**Response**

```json
{
  "success": true,
  "analysis": {
    "score": 78,
    "grade": "B",
    "issuesCount": { "imagesWithoutAlt": 2, "emptyLinks": 1, ...},
    "categories": { "perceivable": 10, ...},
    "issues": [ ... ],
    "positives": [ ... ],
    "summary": { "totalElements": 120, ... },
    "screenshots": { "hero": "data:image/png;...", "fullPage": "..." }
  },
  "processingTime": "28s"
}
```

### POST `/api/export/pdf`

Generates a PDF report.

### POST `/api/export/excel`

Generates an Excel spreadsheet.

Refer to [API Docs](docs/api.md) for complete details.

---

## 🎨 UI Components & Accessibility

* **Semantic HTML & ARIA:** All UI elements built with accessibility in mind.
* **Keyboard Navigation:** Tab-order management, focus outlines, skip links.
* **Screen Reader Compatibility:** Proper labels, roles, and live region announcements.
* **Contrast Checker:** Ensures UI meets 4.5:1 contrast ratio.

### Highlighted Components

| Component     | Purpose                 | Accessibility Feature         |
| ------------- | ----------------------- | ----------------------------- |
| `Button`      | Clickable actions       | `aria-pressed`, focus ring    |
| `Modal`       | Dialogs & overlays      | `aria-modal`, trap focus      |
| `DataTable`   | Tabular data display    | `role="table"`, keyboard sort |
| `ThemeToggle` | Dark/Light theme switch | Screen-reader labels          |

---

## 📊 Export & Reporting

* **PDF Report** — Print-ready, corporate-branded, includes:

  * Executive summary
  * Scorecard & grade
  * Issue breakdown (WCAG mapping)
  * Remediation steps with code snippets
  * Full-page screenshots
  * Historical trend charts

* **Excel Workbook** — Multi-sheet analysis:

  1. Summary
  2. Issues
  3. Positives
  4. Element Inventory
  5. Recommendations

---

## 🧪 Testing & CI

### Test Suites

* **Unit Tests:** Jest + React Testing Library
* **E2E Tests:** Playwright
* **Accessibility Tests:** axe-core integrations
* **Performance Budgets:** Lighthouse checks

### Run Tests

```bash
npm run test        # unit + a11y
npm run test:e2e    # end-to-end
npm run test:perf   # performance
```

### CI/CD

Configured via GitHub Actions:

* Linting & type-checking
* Test execution
* Automated release on tag
* Vercel preview deployments

---

## 🤝 Contributing & Roadmap

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and review the [Code of Conduct](CODE_OF_CONDUCT.md).

**🚀 Roadmap:**

* [ ] OAuth & SSO Integration
* [ ] CI/CD Webhooks for GitHub/GitLab
* [ ] Custom Plugin Architecture
* [ ] Real-time Collaboration Dashboard
* [ ] Dedicated CLI Tool
* [ ] Multi-language Support (i18n)

---

## 📄 License

AccessiScan is released under the [MIT License](LICENSE).

> *Built with ❤️ | Empowering Accessible Web Experiences*
