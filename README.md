# CycloneShield AI — AI-Powered Cyclone Impact & Infrastructure Vulnerability Forecaster

**Track 5 — Cyclone Impact & Infrastructure Vulnerability Forecaster**  
**Built with Google Gemini 3 series models, Node.js/Express, and React**

---

## 1. Project Overview & Mission

**CycloneShield AI** is an emergency-management command console engineered for civil protection authorities, disaster response commanders, and critical infrastructure engineers. It analyzes real-time meteorological conditions (cyclone category, sustained wind speeds, 24h precipitation, storm surge inundation, and population density) to predict multi-sector infrastructure vulnerabilities and prioritize life-saving preparedness directives before landfall.

### Core Capabilities
- **Hydro-Meteorological Scenario Engine**: Parameterized scenario modeling with preloaded regional presets (Mumbai, Bay of Bengal - Puri, Chennai, Gujarat Gulf).
- **Multi-Vector Risk Analytics**: 5 real-time KPI telemetry cards (Overall Hazard Score, Infrastructure Exposure, Flood Inundation, Transport Disruption, Power Stability).
- **Interactive GIS Radar & Vulnerability Map**: Multispectral satellite radar overlay, dynamic storm track scrubber (T-0h, +6h, +12h, +24h), zone classification (Surge Zone A, Wind Zone B, Grid Zone C), and interactive infrastructure node popups.
- **AI-Powered Vulnerability Diagnosis**: Deep structural failure probability estimation for high-voltage substations, bridges, water treatment plants, hospitals, and communication masts.
- **Actionable Preparedness Directives**: Prioritized operational incident directives with dispatch tracking for emergency operations centers.
- **Official Incident Briefings & Export**: Automated markdown, briefing generation, and incident dispatching.

---

## 2. Agentic Threat Modeling (5 Threat Zones)

| Threat Zone | Potential Security Risk | Countermeasure & Defensive Architecture |
| :--- | :--- | :--- |
| **1. Input Surfaces** | Malicious payload injection in location/parameters, prompt injection via freeform text inputs, buffer overflow attempts. | Strict schema validation, parameter boundary sanitization (wind, rain, surge clamped to physical limits), input length caps, defensive null-safe destructuring. |
| **2. Planning & Reasoning** | System instruction bypass, jailbreak attempts via external cyclone advisories, hallucinated safety directives. | Hardened system instructions (`systemInstruction`), non-executable plain data parsing, output JSON validation against strict TypeScript interfaces. |
| **3. Tool Execution & APIs** | SSRF or unauthorized external API calls, privilege escalation, external outage causing system deadlock. | Resilient Model Fallback Ladder (`gemini-3.8-flash` → `gemini-3.1-flash-lite` → `gemini-flash-latest` → `gemini-3.7-flash`), server-side isolation, zero client-exposed keys. |
| **4. Memory & State** | Cross-tenant data leakage, unauthenticated briefing tampering, unauthorized state modification. | Owner-bound path checking, sanitized payloads with undefined-stripping, strict role validation. |
| **5. Inter-System Communication** | API token leakage, man-in-the-middle attacks on telemetry endpoints, unencrypted transmission. | Server-to-server TLS 1.3, Secret Manager dynamic credential injection, no client-side API keys, Bearer token authorization headers. |

---

## 3. Environment & Prerequisites

1. **Google Cloud SDK (`gcloud` CLI)** installed and authenticated:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```
2. **Enable Required Google Cloud APIs**:
   ```bash
   gcloud services enable \
     run.googleapis.com \
     secretmanager.googleapis.com \
     firestore.googleapis.com \
     artifactregistry.googleapis.com \
     cloudbuild.googleapis.com
   ```
3. **Node.js**: v20+ and npm installed.

---

## 4. Secret Management Setup (Zero-Hardcoding Hygiene)

Create and populate the Gemini API key secret in Google Cloud Secret Manager:

```bash
# 1. Create and populate the secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"
echo -n "YOUR_ACTUAL_GEMINI_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# 2. Grant the default Cloud Run runtime service account access to read the secret
PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')

gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## 5. Secure Firestore Database Configuration

Deploy owner-bound security rules for incident reports and user settings:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/interactions/{interactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /incident_briefings/{briefingId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.role == 'incident_commander';
    }
  }
}
```

---

## 6. Local Development & Testing

```bash
# Install dependencies
npm install

# Run full-stack dev server (starts unified Express + Vite dev server on port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## 7. Google Cloud Run Deployment

Deploy the containerized service directly to Google Cloud Run:

```bash
# Deploy to Google Cloud Run with Secret Manager binding
gcloud run deploy cycloneshield-ai \
  --source . \
  --region asia-east1 \
  --allow-unauthenticated \
  --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest" \
  --set-env-vars="NODE_ENV=production" \
  --port=3000

# Required Campaign Labeling for Challenge Verification
gcloud run services update cycloneshield-ai \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region=asia-east1
```

---

## 8. Verification & User Walkthrough Test Cases

| Test Case | Interaction / Trigger | Expected Outcome |
| :--- | :--- | :--- |
| **TC-01: Default Scenario Load** | Open root application URL | Dashboard loads pre-populated with Mumbai, Category 3, 150 km/h wind, 250mm rainfall, 2.5m surge, High density, 4 infrastructure classes. Risk score (88/100) displays with circular gauge. |
| **TC-02: AI Simulation Execution** | Click "Analyze Risk" button | Multi-stage loading displays sequentially: "Analyzing cyclone conditions...", "Assessing infrastructure vulnerability...", "Generating recommendations...". Backend API returns updated risk assessment. |
| **TC-03: GIS Radar Timeline Scrubber** | Click timeline buttons `T-0h`, `+6h`, `+12h`, `+24h` | Storm center moves across radar coordinates; danger zones and surge readings dynamically update. |
| **TC-04: Map Pin Inspection** | Click any critical pin (e.g. Substation 400kV or Hospital #4) | Floating HUD popup opens displaying failure probability (e.g. 94%), failure reason, and mitigation action. |
| **TC-05: Radar Layer Toggles** | Click Surge, Wind, Grid, or Satellite HUD buttons | Respective SVG layers / satellite image fade in/out smoothly. |
| **TC-06: Preset Swapping** | Click preset button (e.g. "Bay of Bengal (Cat-4)") | Form inputs instantly update to Bay of Bengal parameters (215 km/h, 380 mm rain, 4.8m surge). |
| **TC-07: Directive Dispatching** | Click "Dispatch Directive" on any recommendation | Directive status updates to green "Dispatched" with checkmark; dispatched count badge increments. |
| **TC-08: Report Export & Download** | Click "Download Report (.MD)" | Official formatted Markdown incident briefing file is downloaded with full parameters, scores, and directives. |
| **TC-09: Navigation Tabs** | Click "Risk Analysis", "Infrastructure", or "Reports" | View smoothly switches to focused sub-module without page reloads. |

---

## 9. Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React
- **Backend**: Node.js, Express, tsx
- **AI & Reasoning**: Google Gemini 3 Series Models (`gemini-3.8-flash`, `gemini-3.1-flash-lite`, `gemini-3.7-flash`) with Resilient Fallback Ladder
- **Deployment**: Google Cloud Run, Secret Manager, Cloud Build
