import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required")
}

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.1,
    topK: 1,
    topP: 1,
    maxOutputTokens: 8192,
  },
})

export const WCAG_GUIDELINES = {
  perceivable: {
    "1.1.1": "Non-text Content (Level A)",
    "1.2.1": "Audio-only and Video-only (Level A)",
    "1.3.1": "Info and Relationships (Level A)",
    "1.3.2": "Meaningful Sequence (Level A)",
    "1.3.3": "Sensory Characteristics (Level A)",
    "1.4.1": "Use of Color (Level A)",
    "1.4.2": "Audio Control (Level A)",
    "1.4.3": "Contrast (Minimum) (Level AA)",
    "1.4.4": "Resize text (Level AA)",
    "1.4.5": "Images of Text (Level AA)",
  },
  operable: {
    "2.1.1": "Keyboard (Level A)",
    "2.1.2": "No Keyboard Trap (Level A)",
    "2.2.1": "Timing Adjustable (Level A)",
    "2.2.2": "Pause, Stop, Hide (Level A)",
    "2.3.1": "Three Flashes or Below Threshold (Level A)",
    "2.4.1": "Bypass Blocks (Level A)",
    "2.4.2": "Page Titled (Level A)",
    "2.4.3": "Focus Order (Level A)",
    "2.4.4": "Link Purpose (In Context) (Level A)",
    "2.4.5": "Multiple Ways (Level AA)",
    "2.4.6": "Headings and Labels (Level AA)",
    "2.4.7": "Focus Visible (Level AA)",
  },
  understandable: {
    "3.1.1": "Language of Page (Level A)",
    "3.1.2": "Language of Parts (Level AA)",
    "3.2.1": "On Focus (Level A)",
    "3.2.2": "On Input (Level A)",
    "3.2.3": "Consistent Navigation (Level AA)",
    "3.2.4": "Consistent Identification (Level AA)",
    "3.3.1": "Error Identification (Level A)",
    "3.3.2": "Labels or Instructions (Level A)",
    "3.3.3": "Error Suggestion (Level AA)",
    "3.3.4": "Error Prevention (Legal, Financial, Data) (Level AA)",
  },
  robust: {
    "4.1.1": "Parsing (Level A)",
    "4.1.2": "Name, Role, Value (Level A)",
    "4.1.3": "Status Messages (Level AA)",
  },
}

export const ACCESSIBILITY_TESTS = {
  images: {
    missingAlt: "Images without alt attributes",
    emptyAlt: "Images with empty alt text",
    decorativeImages: "Decorative images not marked properly",
    complexImages: "Complex images without detailed descriptions",
  },
  forms: {
    missingLabels: "Form inputs without labels",
    inaccessibleLabels: "Labels not properly associated",
    missingFieldsets: "Related form controls not grouped",
    missingErrorHandling: "No error identification or suggestions",
  },
  navigation: {
    missingSkipLinks: "No skip navigation links",
    poorHeadingStructure: "Improper heading hierarchy",
    inaccessibleMenus: "Navigation menus not keyboard accessible",
    missingLandmarks: "Page lacks proper landmarks",
  },
  interactive: {
    keyboardTraps: "Keyboard focus traps",
    missingFocusIndicators: "No visible focus indicators",
    inaccessibleButtons: "Buttons without proper labels",
    poorTabOrder: "Illogical tab order",
  },
}
