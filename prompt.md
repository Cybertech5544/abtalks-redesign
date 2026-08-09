# AI Usage Log 🤖

This file documents the AI tools and prompts used during the development of the **ABTalks Redesign** project, in compliance with the hackathon's Stage 1 (Eligibility) and Stage 2 (Authenticity) requirements.

## Tools Used

* **Rocket.new (AI Agent):** Used to generate the initial three required screens (Landing Page, Student Dashboard, Challenge Day), the mocked data structure, and later to add the confetti animation, parallax scrolling, and Profile screen.
* **Google Gemini:** Used as a coding assistant to migrate the AI-generated code into a local Next.js 15 environment, fix build/config errors, correct App Router folder structure to match the required route map, debug UI/animation bugs, and prepare deployment.

---

## Part 1: Initial Generation & Structuring (Rocket.new)

**Task:** Generate the base UI for all three required screens plus supporting features.

**Prompt 1 (initial build):**
> "Redesign ABTalks — Reimagine the platform you're standing on... [full hackathon problem statement pasted] ...please make with more creativity and professional and cool animated, you can also 3D animation and other things to make it perfect and best. Give me code."

**Result:** Generated a mobile-first Next.js 15 + Tailwind CSS app with a dark theme, glassmorphism cards, and neon accents:
- Landing Page (`/`) — animated gradient hero, track selection, "how it works", streak wall, testimonials, final CTA
- Student Dashboard (`/student-dashboard`) — streak card, circular progress ring, leaderboard teaser, badges, bottom nav
- Challenge Day (`/challenge-day`) — objectives checklist, resources, GitHub + LinkedIn submission form, midnight countdown
- Thoughtful UX idea: **Streak Shield** system (earn 1 shield per 7-day streak to protect against a missed day)

**Prompt 2 (feature additions):**
> "Trigger a 3D confetti/ribbon explosion with parallax depth when a student successfully submits GitHub + LinkedIn proof, using Three.js particle effects and canvas animation. Implement depth-layered parallax scrolling on the Landing Page... New `/profile` screen where students set avatar, track color theme, notification preferences, and view earned streak shield count."

**Result:** Added `ConfettiExplosion.tsx` (canvas-based particle/ribbon explosion), multi-speed parallax scroll on the landing hero and testimonials, and a `/profile` screen with avatar picker, 6 track color themes, notification toggles, and shield progress.

---

## Part 2: Local Setup, Debugging & Refinement (Google Gemini)

**Task:** Bring the AI-generated code to a local Next.js environment, fix errors, enforce the hackathon's exact route map, and polish the UX.

**Key issues resolved, in order of occurrence:**

1. **Local environment setup** — Since Rocket.new had no ZIP export and the free tier was exhausted, code was manually recreated via `npx create-next-app` and copy-pasted file by file into the correct local structure.
2. **Missing dependencies** — Fixed `lucide-react` and `@heroicons/react` import errors by installing them locally (`npm install <package>`).
3. **Tailwind CSS not applying** — Debugged a missing-styles issue caused by a mismatched CSS import path (`styles/index.css` vs `app/globals.css`) and an `@import` chain between `index.css` and `tailwind.css` that Tailwind's engine wasn't processing correctly. Fixed by consolidating all custom CSS/animations into a single stylesheet and correcting the `tailwind.config` `content` paths.
4. **Config/build errors** — Fixed `ReferenceError: module is not defined` in `postcss.config.mjs` (converted CommonJS `module.exports` to ES Module `export default`) and a malformed `webpack(config, { dev: dev })` destructuring bug in `next.config.mjs`.
5. **Dev server port change** — Added `-p 300` flag guidance for running on a custom port.
6. **Next.js App Router route-map compliance** — The generated app used non-compliant folder names (`/student-dashboard`, `/challenge-day`, and a nested `/day/12/q/page.tsx`). Corrected the folder structure so routes exactly match the required `/`, `/dashboard`, `/day/12`.
7. **404 on `/day/12`** — Diagnosed as a stale dev-server cache after moving `page.tsx`; resolved by restarting `npm run dev` and verifying the file path/casing.
8. **Confetti animation bugs:**
   - Layout-shift bug: the `<canvas className="fixed inset-0">` was being trapped inside an animated parent `div`, breaking `position: fixed`. Fixed using React's `createPortal` to render the canvas directly to `document.body`.
   - Infinite-restart bug: because the form's success state used two separate `return` blocks, the `<ConfettiExplosion />` component was unmounting/remounting on submit, resetting its 5-second timer. Fixed by moving the confetti component outside the conditional JSX so it stays mounted across the `submitted` state change.
9. **Testimonials horizontal-scroll glitch** — Cards were being visually clipped by `overflow-hidden` on the parent `<section>`; removed it and added `overflow-y-hidden` + vertical padding to the scroll container to allow the parallax `translateY` effect without clipping.
10. **Leaderboard navigation without extra pages** — Since only 3 routes are allowed by the hackathon rules, implemented anchor-based navigation (`/dashboard#leaderboard` + `id="leaderboard"` + `scroll-behavior: smooth`) instead of creating a new page.
11. **Profile "Student Proof Record" modal** — Added a themed popup modal (matching the selected track color theme) triggered by clicking the avatar, showing profile completion, active track, and clickable GitHub/LinkedIn proof links opening in a new tab.
12. **Avatar-picker discoverability** — Added a small clickable badge icon on the main avatar and wired the avatar-grid selection to also open the proof modal, so it's visually clear the avatar is interactive.
13. **README formatting fix** — Wrapped the Route Map in a fenced code block (` ```text `) so it renders as separate lines on GitHub instead of one run-on line, per the hackathon's automated-scraping requirement.
14. **Deployment guidance** — Step-by-step help with `git init`/`add`/`commit`/`push`, importing the repo into Vercel as a Next.js project, verifying `npm run build` locally first, and binding the custom domain/subdomain (`abtalks-redesign.<domain>`) via a Vercel CNAME record and matching DNS entry (with the Cloudflare proxy toggled off to avoid SSL redirect loops).
15. **Final commit** — `feat: enhance ProfilePage with interactive proof modal, real URLs, and save redirect`

---

## Reference

Full Gemini conversation (for verification): https://share.gemini.google/Y2eSyV0jzZRp
Full claude.ai conversation (for verification): https://claude.ai/share/f027dc78-5b2a-4315-8f73-9ad1d563cccb


## Summary

Rocket.new was used to generate the initial visual design, component structure, and mocked data for all three required screens plus the bonus Profile screen and confetti/parallax effects. Google Gemini was used throughout as a debugging and refactoring assistant to migrate that generated code into a working local Next.js 15 project, enforce the hackathon's exact route map, fix build/runtime bugs, and prepare the final GitHub + Vercel deployment.