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
   - Light-themed, high-contrast bedside mobile container with piercing wake-up alarm siren.
   - **Tactile Slider Buttons (Accidental Touch Protection)**: Replaced tap buttons with interactive swipe/drag sliders (*"Slide: I am going over now"* and *"Slide: Cannot respond"*) requiring deliberate motor intent from groggy elderly responders.
   - Veranda gate keycode display (`PIN: 8492`) and built-in screen torch.
4. **Tab 4: Dr. Ishan Fernando's Mobile Clinical App (Kandy Health Centre)**:
   - Clinical triage mobile container reviewing weekly trends:
   - Medication adherence (100% morning / 4 missed evening pills).
   - Micro-radar fall risk (2 nocturnal stumbles, zero trauma).
   - Alert fatigue filter (14 anomalies contained locally; 0 unnecessary family wake-ups).
   - Doctor's Action Tray (Export PDF, schedule follow-up call, adjust reminder slot).

---

## ⚡ Global Control: "New Situation: 2:00 AM Fall (7:30 AM Melbourne)" Override Logic

A prominent top toggle switch allows judges and evaluators to simulate the **2:00 AM Fall override protocol**:

- **Tab 1 (Malani's Home Hub)**:
  - Hub radial glow switches to **pulsing, urgent Amber/Orange**.
  - **Two-Part Conversation Transcript**:
    - *Malani (02:14 AM)*: "I'm fine. I just slipped. Don't call anyone, and don't wake the children."
    - *Agent (02:18 AM - 4 mins later)*: "මලනී අම්මා, ඔබට තවමත් නැගිටින්න අපහසු නිසා මම අර්ජුන්ට එන්න කියනවා. මම දිල්රුක්ෂිට කතා කරන්නේ නැහැ." (*"Malani Amma, since you haven't been able to get up, I am waking Arjun. I am keeping my promise and not waking Dilrukshi."*)
- **Tab 2 (Dilrukshi's App - Timezone Loophole)**:
  - Screen shifts to **Warning / Amber state** (no flashing red siren, because she is already awake in daylight and Arjun is handling it locally).
  - Header shows: `Local Time: 7:30 AM AEST (Morning)`.
  - Headline: `Slip Detected. Arjun is checking in.`
  - Subtext: `Amma had a slip at 2:00 AM SLST. She asked not to be disturbed, but due to 4 minutes of immobility, Arjun has been dispatched. You will receive an update shortly.`
  - Design Note: Demonstrates agent's promise retention via timezone offset.
- **Tab 3 (Arjun's App - First Responder)**:
  - Clean light-themed container with high-contrast alert cards.
  - Headline: `EMERGENCY OVERRIDE: Check on Malani.`
  - Alert Text: `Malani verbally refused help but has been immobile on the bathroom floor for >4 minutes. Please go over immediately.`
  - Interactive Bright Green Slider: `Slide: I am going over now` (swipe to confirm, preventing accidental taps).
- **Tab 4 (Doctor's View - Trust Repair Log)**:
  - Prominent highlighted card at 8:00 AM:
    - *Trust Repair Log (8:00 AM)*: "Agent explained the override to Malani: 'Amma, I kept my promise and did not sound alarms for Dilrukshi last night. However, my core rule is that if you are on the floor for over 4 minutes, I must get local help for your safety.'"

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
