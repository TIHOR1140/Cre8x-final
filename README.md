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

## 📱 System Architecture: In-Home Hardware vs. Mobile Phone Containers

The ecosystem explicitly differentiates between elder in-home hardware (no screens, no mobile app) and the support network's smartphone apps:

1. **Tab 1: In-Home Hardware Simulator (Malani • Peradeniya)**:
   - **Zero touchscreens, zero mobile apps.** Malani interacts solely through physical objects in her home:
   - **Object A (The Home Hub)**: Circular tabletop ambient device with 360° diffuse radial light glow (Amber for reminders, Blue/White for night pathway, Crimson for emergency) and an interactive **Transcript Box** displaying spoken Sinhala (*"මලනී අම්මා, සවස බෙහෙත් පෙත්ත ගන්න අමතක වුණාද?"*) with English translation and audio replay.
   - **Object B (The Wearable)**: Tactile elder wristband with **exactly ONE massive, tactile 3D button** that says *"I AM OK"*, haptic vibration engine, and zero display screen.
2. **Tab 2: Dilrukshi's Mobile Phone App (Melbourne)**:
   - Standard smartphone frame container (`max-w-sm mx-auto border-[8px] border-slate-800 rounded-[2.5rem]`).
   - Switchable between **State A (Normal Safe Status)** and **State B (Night Critical Emergency)**.
   - Incident timeline tracker and simulated international audio dialer.
3. **Tab 3: Arjun's Bedside Mobile Phone App (Neighbour • 2 min walk)**:
   - High-contrast bedside mobile container with piercing wake-up alarm siren.
   - Two massive touch targets for groggy interaction in the dark (*"I AM ON MY WAY"* & *"Cannot Respond"*).
   - Veranda gate keycode display (`PIN: 8492`) and built-in screen torch.
4. **Tab 4: Dr. Ishan Fernando's Mobile Clinical App (Kandy Health Centre)**:
   - Clinical triage mobile container reviewing weekly trends:
   - Medication adherence (100% morning / 4 missed evening pills).
   - Micro-radar fall risk (2 nocturnal stumbles, zero trauma).
   - Alert fatigue filter (14 anomalies contained locally; 0 unnecessary family wake-ups).
   - Doctor's Action Tray (Export PDF, schedule follow-up call, adjust reminder slot).

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
