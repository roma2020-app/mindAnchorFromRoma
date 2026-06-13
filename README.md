# MindAnchor — AI-Powered Mental Wellness Tracker for Students

MindAnchor is a hackathon-winning micro-SaaS application designed to support students preparing for high-stakes competitive and academic examinations (JEE, NEET, UPSC, CAT, GATE, CUET) in maintaining mental wellness, managing stress, and preventing cumulative academic burnout.

---

## 🚀 Interactive Judge Demo & Quick Setup

The application is fully client-side enabled with high-fidelity simulated response models, making it 100% functional out-of-the-box.

### Running Locally
To run and test the application immediately:
1. Navigate to the project root directory.
2. Launch a local web server (e.g., using Python):
   ```bash
   python -m http.server 3000
   ```
3. Open your browser and go to: **[http://localhost:3000](http://localhost:3000)**

### Production Deployment
Since MindAnchor is a serverless static web application (HTML, CSS, JS), you can deploy it instantly for free:

*   **Vercel:**
    1. Install Vercel CLI: `npm install -g vercel`
    2. Run `vercel` in the project root directory and follow the prompt options.
*   **GitHub Pages:**
    1. Push the files (`index.html`, `style.css`, `script.js`) to a GitHub repository.
    2. Navigate to repository **Settings** -> **Pages**.
    3. Set build source to your main branch, root folder, and click **Save**.
*   **Netlify Drag-and-Drop:**
    1. Drag and drop the project folder directly into the Netlify Drop dashboard (`app.netlify.com/drop`).

### 30-Second Demo Tour
On the landing page, click the **✨ Quick Judge Demo Tour (30s)** button.
* **Onboarding Bypass:** Bypasses registration and logs in as `Roma (UPSC Aspirant)`.
* **Dashboard Surge:** Generates a weekly stress graph culminating in a critical Burnout Risk Index rating (**78%**), activating the warning UI red theme.
* **CBT Reframer Pre-Load:** Populates the Cognitive Behavioral Therapy workspace and automatically analyzes a mock self-critical journal entry, isolating cognitive traps (Catastrophizing & Personalization) side-by-side.
* **Empathetic Companion History:** Seeds the AI Chat companion channel with a relevant prep stress conversation log.
* **Social Impact Metrics:** Checks off daily screen-free breathing metrics to update the Social Connectedness Quotient dynamically.

---

## 📋 Product Discovery

### 1. Stakeholders
* **Aspirants:** Primary users facing long study hours, exam stress, and imposter syndrome.
* **Parents & Guardians:** Finance preparation and seek safe, indirect updates on wellness.
* **Mentors / Coaching Centers:** Adjust exam schedules and cohort workloads based on anonymized cohort data.
* **Counselors:** Direct clinical support channels powered by logged student histories.

### 2. Gaps in Existing Solutions
* **Manual Friction:** Students drop manual checkboxes first during periods of high stress.
* **No Academic Context:** General health apps don't speak regional academic lingo ("syllabus backlog", "mock test percentile", "gap year dropper").
* **Reactive counseling:** Schools intervene only after student mental health crashes completely.
* **Trust & Privacy Concerns:** Fear of institutional disclosure keeps students from reaching out.

### 3. Core Solution Architecture
* **Empathetic Chat Companion:** Empathetic AI agent acting as a secure validator.
* **CBT Distortion Engine:** Highlights self-sabotaging speech patterns (All-or-Nothing, Mind Reading, Catastrophizing) and displays healthy alternatives side-by-side.
* **Binaural sound drone:** Browser Web Audio synthesizer generating 4Hz Theta waves (Left: 110Hz, Right: 114Hz) for brainwave entrainment.
* **Social Impact & Sustainability Index:** Gamifies eco-social screen-free checks (e.g. calling family, screen-free breathing) to offset exam tunnel vision.
* **Gita Wisdom Sanctuary:** Dedicated portal serving performance-resilience verses in Sanskrit and English with integrated Web Speech audio translation.

---

## 🛠️ Technology Stack & Architecture

```
                                  ┌───────────────────────┐
                                  │      Web Browser      │
                                  │   (Vite + React.js)   │
                                  └───────────┬───────────┘
                                              │ HTTPS
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Backend Server                                       │
│                                (Node.js + Express)                                     │
│                                                                                        │
│   ┌───────────────────┐    ┌───────────────────┐    ┌──────────────────────────────┐   │
│   │   Auth & Session  │    │ Analytics Engine  │    │     Gemini SDK Wrapper       │   │
│   │    (JWT Logic)    │    │ (Burnout Scoring) │    │  (Structured JSON Prompts)   │   │
│   └─────────┬─────────┘    └─────────┬─────────┘    └──────────────┬───────────────┘   │
└─────────────┼────────────────────────┼─────────────────────────────┼───────────────────┘
              │                        │                             │ HTTPS (API)
              ▼                        ▼                             ▼
   ┌────────────────────┐    ┌────────────────────┐      ┌───────────────────────┐
   │ PostgreSQL DB Host │    │ Redis (Optional)   │      │    Google Gemini      │
   │   (Render/Neon)    │    │ (Session/Caching)  │      │  (Flash / Pro 1.5)    │
   └────────────────────┘    └────────────────────┘      └───────────────────────┘
```

* **Frontend:** HTML5, CSS Variables, and client-side JavaScript.
* **Styling System:** Vanilla HSL variable-based stylesheets managing dynamic color transformations (e.g., changes hues automatically when stress limits are breached).
* **Binaural Synthesizer:** Real-time modular browser oscillator nodes synthesized via the native **Web Audio API** (no assets required).
* **AI API Routing:** Google Gemini 1.5 Flash SDK integrations utilizing structured JSON response patterns. Runs high-fidelity simulated backups when offline or key-less.

---

## 🎤 Hackathon Pitch Deck (Slide-by-Slide Outline)

* **Slide 1: Cover** — *MindAnchor: Anchoring Minds, Securing Futures.* AI mental resilience tracker for exam aspirants.
* **Slide 2: Problem** — Hyper-competitive study isolation (12h+ daily) breeds silent anxiety, backlog fatigue, and unmanaged student burnout.
* **Slide 3: Why It Matters** — Tragic dropouts, delayed institutional counselor reach-outs, and severe student crisis hotspots like Kota require proactive, low-friction outlets.
* **Slide 4: Target Users** — Competitive aspirants (NEET, JEE, UPSC) facing selection ratios below 1% who refuse institutional counseling due to parent disclosure fears.
* **Slide 5: The Solution** — An anonymous onboarding app featuring dynamic CBT cognitive distortion reframers, live Web Audio binaural oscillators, proactive burnout calculations, and a Gita Wisdom audio sanctuary.
* **Slide 6: Architecture & Stack** — Clean HSL CSS variable layers, Google Gemini Flash API, and local storage metric systems.
* **Slide 7: Core Differentiators** — Context-aware regional lingo prompts, interactive side-by-side reframers, and real-time HSL mood theme shifts.
* **Slide 8: Sustainability & Social Impact** — The Social Impact index checklist rewarding screen-free family time and peer support to break hyper-isolated preparation routines.
* **Slide 9: Demo Flow (30s)** — Bypass onboarding, trigger Red Warning alert burnout meters, show pre-analyzed cbt distortion cards, and play binauralbeats.
* **Slide 10: Market Potential** — B2C premium dashboard memberships and B2B licensed cohort stress analytics for coaching institutes.
* **Slide 11: Future Roadmap** — Calendar syncing (Q3), Voice tone acoustic stress tracking (Q4), and AI-moderated peer circles (Q1).
