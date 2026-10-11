# Mithra — Privacy-First AI Care Agent Ecosystem
### Set in Peradeniya / Kandy, Sri Lanka ⇄ Melbourne, Australia

Mithra is a multi-view interactive React prototype that translates real geriatric research constraints into an evidence-backed care agent ecosystem for solo-living elders and their remote families.

---

## 🌟 Core UX Pillars & Evidence-Backed Rationale

1. **Anti-Surveillance Architecture (Malani, 87)**:
   - **Zero camera feeds, no live video streaming, and no minute-by-minute logs.**
   - Uses 60GHz micro-radar and passive infrared (PIR) sensors to track motion vs. stillness. Bodily dignity in bathrooms and bedrooms is strictly preserved.
2. **Alert Fatigue Prevention (Dilrukshi in Melbourne)**:
   - **"No news is good news."** The daughter's mobile dashboard is completely passive during routine daily life.
   - Non-urgent routine misses (e.g., occasional missed evening tablets or tea delays) are contained locally in Sinhala or batched into weekly digests, preventing anxious middle-of-the-night pings across timezones.
3. **Escalation Friction Elimination (Arjun, 74)**:
   - Arjun lives 2 minutes away but sleeps deeply and leaves his phone across the room.
   - High-contrast bedside emergency terminal with high-decibel audio alarm simulation, two massive tactile touch targets, keybox code (`PIN: 8492`), screen torch toggle, and explicit verification of Malani's pre-approved consent.
4. **Voice-First & Screenless Ambient Hub**:
   - Screenless form factor for Malani (who has mild cataract/vision decline and low English tech literacy).
   - 360° diffuse radial light ring indicators (Amber, Blue/White, Crimson) paired with warm colloquial Sinhala (*"මලනී අම්මා, සවස බෙහෙත් පෙත්ත ගන්න අමතක වුණාද?"*).

---

## 📱 Prototype Navigation

The prototype provides 4 standalone views accessible via the top navigation bar:

1. **Malani's Ambient Hub Simulator**:
   - Physical hub device simulation with dynamic radial light glows.
   - Interactive state switchers: *Normal Evening*, *Tablet Reminder*, *Night Pathway*, *Bathroom Check*.
   - Sinhala voice TTS simulator with English subtitles and verbal response testing (*"Taken"*, *"Ignore"*, *"Later"*, *"Help"*).
   - Anti-surveillance telemetry panel (PIR active, 16 resp/min micro-radar, zero cameras).
2. **Dilrukshi's Companion App (Melbourne)**:
   - Switchable between **State A (Normal Safe Status)** and **State B (Night Critical Emergency)**.
   - Incident timeline tracker (02:14 AM stillness detected → 02:17 AM spoken check unanswered → 02:18 AM neighbour alerted).
   - Simulated international call dialer to Arjun and Kandy 1990 Suwa Seriya ambulance.
3. **Arjun's Emergency Screen (Neighbour)**:
   - Bedside wake-up display with Web Audio API alarm siren.
   - Massive buttons for groggy awakening: *"I AM ON MY WAY"* and *"CANNOT RESPOND"*.
   - Veranda gate keycode display (`8492`) and built-in screen torch.
4. **Dr. Ishan Fernando's Clinical Digest (Kandy Health Centre)**:
   - Tabular metrics: Medication Adherence, Mobility & Fall Risk (micro-radar gait velocity), and Alert Fatigue Filter (14 minor anomalies contained locally; 0 unnecessary family wake-ups).
   - Doctor's Action Tray: Export Clinical PDF and schedule routine follow-up call.

---

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** with HMR
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (Vector icons)
- **Web Audio API** (Gentle ambient temple-bowl chimes and emergency wake-up siren)
- **Google Fonts** (*Noto Serif Sinhala*, *Noto Sans Sinhala*, *Plus Jakarta Sans*)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/TIHOR1140/Cre8x-final.git
cd Cre8x-final

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Build for Production

```bash
npm run build
```
