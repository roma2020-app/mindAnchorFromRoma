### MindAnchor

An AI-assisted mental wellness platform that helps users cope with anxiety, stress, and intrusive thoughts through guided mindfulness exercises, journaling, grounding techniques, and supportive conversational experiences.

**Live Demo:** https://roma2020-app.github.io/mindAnchorFromRoma/

Project Summary

MindAnchor is an AI-powered mental wellness application designed to help students preparing for high-stakes competitive and academic examinations (JEE, NEET, UPSC, CAT, GATE, CUET) to manage stress, anxiety, and intrusive thoughts through guided self-reflection and mindfulness techniques. The platform combines interactive therapeutic exercises, grounding activities, journaling tools, and supportive AI conversations to promote emotional well-being. Built with a user-friendly interface, the application encourages healthy coping strategies, self-awareness, and mental resilience in a safe and accessible digital environment. Inspired by principles from mindfulness, Acceptance and Commitment Therapy (ACT), and cognitive behavioral techniques, the project aims to make emotional support more approachable and engaging.



##  Quick Setup

The application is fully client-side enabled with high-fidelity simulated response models, making it 100% functional out-of-the-box.

### Running Locally
To run and test the application immediately:
1. Navigate to the project root directory.
2. Launch a local web server (e.g., using Python):
   ```bash
   python -m http.server 3000
   ```
3. Open your browser and go to: **[http://localhost:3000](http://localhost:3000)**


Live Demo: https://roma2020-app.github.io/mindAnchorFromRoma/

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

## Technology Architecture

```text
┌─────────────────────────────┐
│          End User           │
│  Web Browser / Mobile       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│     Presentation Layer      │
│                             │
│ • HTML5                     │
│ • CSS3                      │
│ • JavaScript                │
│ • Responsive User Interface │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Mental Wellness Engine    │
│                             │
│ • Mood Assessment           │
│ • Guided Reflection         │
│ • Journaling Activities     │
│ • Grounding Exercises       │
│ • Wellness Recommendations  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│    AI Support Layer         │
│                             │
│ • Prompt-Based Guidance     │
│ • Emotional Check-ins       │
│ • Self-Reflection Support   │
│ • Personalized Responses    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Data & Session Layer      │
│                             │
│ • Browser Local Storage     │
│ • User Preferences          │
│ • Session Management        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│     Deployment Layer        │
│                             │
│ • GitHub Repository         │
│ • GitHub Pages Hosting      │
│ • GitHub Actions (Optional) │
└─────────────────────────────┘
```

### Technology Stack

**Frontend**

* HTML5
* CSS3
* JavaScript

**User Experience**

* Responsive Design
* Interactive Wellness Dashboard
* Guided Mental Health Activities

**AI Components**

* Conversational Guidance
* Reflection Prompt Generation
* Personalized Wellness Recommendations

**Deployment**

* GitHub Pages
* GitHub Repository
* Static Web Hosting

### System Flow

1. User accesses MindAnchor through the browser.
2. Frontend captures user mood and wellness inputs.
3. Wellness engine processes activities and journaling interactions.
4. AI layer generates personalized guidance and reflection prompts.
5. Session data is maintained locally for a seamless experience.
6. Application is delivered through GitHub Pages hosting.

🌐 Live Demo: https://roma2020-app.github.io/mindAnchorFromRoma/

📂 Source Code: https://github.com/roma2020-app/mindAnchorFromRoma


---

