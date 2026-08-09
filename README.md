# ABTalks Redesign 🚀

A mobile-first redesign of the **ABTalks 60-day coding challenge platform**, built specifically for Indian college students. This redesign focuses on motivation, consistency, and a seamless late-night coding experience — because that's when most of us actually ship code.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-custom_UI-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)

---

## 🔗 Live Demo

**[Visit Live Application →](https://abtalks-redesign.edubox.sbs)**

---

## 📖 About the Project

ABTalks is a 60-day coding challenge students commit to as part of a hackathon-style learning sprint. The original flow was functional but easy to abandon — this redesign rebuilds the core experience around **daily habit-building**, using a gamified, glassmorphic dark UI that feels closer to a modern fitness or streak app than a plain submission form.

The goal: make showing up every day *feel* rewarding, not like a chore.

---

## 💡 The "Thoughtful Idea" — Streak Shields

To reduce burnout and student anxiety around missing a single day (and losing all momentum), we introduced a **Streak Shield** mechanism:

- Students earn **1 shield for every 7-day streak** they complete.
- When submitting their daily proof of work, they can **spend a shield to protect against a missed day** — so one bad day at college, one power cut, or one late-night exam doesn't wipe out weeks of consistency.
- Shields are visualized directly on the profile screen, reinforcing progress and making the platform feel like a modern, gamified learning app rather than a strict attendance tracker.

This small mechanic was designed to keep students in the challenge during their toughest weeks, instead of letting one missed day snowball into quitting entirely.

---

## 🗺️ Route Map

```text
/
/dashboard
/day/12
```

| Route | Description |
|---|---|
| `/` | Landing page — challenge overview, tracks, and sign-up |
| `/dashboard` | Student dashboard — streak, progress, badges, and daily submission |
| `/day/12` | Individual challenge-day view (dynamic route per day) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) + React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom CSS (Glassmorphism, Neon UI) |
| **Icons** | Lucide React & Heroicons |
| **Data** | Mocked data structures — no production database, kept the UI realistic without backend overhead |

---

## ⚙️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Cybertech5544/abtalks-redesign.git
cd abtalks-redesign

# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Highlights

- **Streak Shields** — burnout-aware gamification (see above)
- **Glassmorphic, neon-accented dark UI** tuned for late-night use
- **Customizable theme system** — students can pick a color theme that persists across the whole app
- **Progress rings, badges, and confetti moments** to celebrate milestones
- **Mobile-first** layout with a bottom navigation bar, built for the way Indian students actually browse — on their phones

---

## 👥 Team

Built by two 4th-year B.Sc Computer Science students at **Sir Gurudas Mahavidyalaya**:

| Name | GitHub |
|---|---|
| **Ritesh Saha** | [@Cybertech5544](https://github.com/Cybertech5544) |
| **Soham Ghosh** | [@Soham-coder397](https://github.com/Soham-coder397) |

---

## 🙌 Acknowledgments

Built with ❤️ for the **ABTalks Hackathon**.