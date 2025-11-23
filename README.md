# AlgoCoach – Interactive DSA Visualizer

AlgoCoach is an interactive, open‑source platform to **learn Data Structures & Algorithms visually**. It focuses on building real intuition through animations, step‑through controls, and a clean, distraction‑free UI.

This branch (`ui-redesign-v1`) contains the first major UI redesign: a modern dashboard layout, consistent theming across pages, and a mobile‑first "Browse algorithms" experience.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The dev server runs on **http://localhost:3000** (or the next available port).

---

## ✨ Highlights in this UI Redesign

- **Unified Layout** – Landing, visualizer overview, and curriculum now share the same dark, glassy theme.
- **Curriculum Page** – Dedicated `/curriculum` route with a structured roadmap and module cards.
- **Visualizer Hub** – `/visualizer` overview lets you jump into any category/algorithm quickly.
- **Mobile "Browse Algorithms" Sheet** – Full‑height, scrollable sheet that behaves like a native settings screen and stops above the system bottom bar.
- **No Accounts, No Noise** – Open the site and start experimenting; no login or profile required.

---

## 🧩 Features

- **Interactive Visualizers** – Step through sorting, searching, trees, graphs, and more.
- **Playback Controls** – Play, pause, step, and control animation speed.
- **Code & Explanation Panels** – See pseudocode, highlighted lines, and plain‑English step explanations.
- **State Inspector** – Track variables, pointers, and key metrics per algorithm.
- **Responsive Design** – Works on desktop and mobile, with special care for small screens.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript + React
- **Styling:** Tailwind CSS

---

## 📂 Key Files

- `app/page.tsx` – Landing page / overview.
- `app/visualizer/page.tsx` – Visualizer overview hub.
- `app/visualizer/[category]/[algorithm]/page.tsx` – Individual algorithm visualizers.
- `app/curriculum/page.tsx` – Curriculum / roadmap page.
- `components/layout/Navbar.tsx` – Global navbar and mobile "Browse algorithms" sheet.
- `lib/algorithms.ts` – Algorithm metadata used across the app.

---

## 🤝 Contributing

Contributions are welcome, especially around UX polish, accessibility, and new visualizers.

1. Fork the repo and create a branch (e.g. `feature/my-idea`).
2. Make your changes, keeping the redesign style consistent.
3. Run `npm run lint` and fix any reported issues.
4. Open a pull request against `ui-redesign-v1` or `main`.

---

## 📜 License

This project is open source; see the repository for licensing details.

Built with ❤️ for DSA learners.
