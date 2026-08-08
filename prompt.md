# AI Usage Log 🤖

This file documents the AI tools and prompts used during the development of the ABTalks Redesign project to ensure full transparency for the Hackathon evaluation.

## Tools Used

- **Rocket.new (AI Agent):** Used for generating the initial UI components, layout structures, animations, and mock data based on the hackathon requirements.
- **Google Gemini:** Used as an expert coding assistant for debugging, resolving Next.js routing constraints, fixing build errors, and solving complex React state/CSS issues.

---

## Prompts & AI Assistance History

### Part 1: Initial Generation & Structuring (Using Rocket.new)

- **Task:** Creating the base layout, dashboard design, Streak Shield logic, and core components.
- **Main Prompts Used:**
  1. _"Redesign ABTalks Reimagine the platform... [Pasted Hackathon Prompt]... please make with more creativity and professional and cool animated you can also 3d animation and other thing to make it perfect and best give me code"_
     - **Result:** Generated the initial dark theme UI, glassmorphism cards, mocked JSON data, and the "Streak Shield" UX concept for the 3 required routes.
  2. _"Trigger a 3D confetti/ribbon explosion with parallax depth when a student successfully submits... Implement depth-layered parallax scrolling on Landing Page... New `/profile` screen where students set avatar..."_
     - **Result:** Added the `<ConfettiExplosion />` canvas component, parallax scrolling, and the profile customization screen.

### Part 2: Debugging, Routing & Refining (Using Google Gemini)

- **Task:** Fixing environment/build issues, routing constraints, and component rendering bugs after bringing the code to the local Next.js 15 environment.
- **Issues Fixed & Context:**
  - **Config & Build Errors:** Solved ES module errors in `postcss.config.mjs` (switching from CommonJS to `export default`) and fixed `next.config.mjs` webpack destructuring syntax.
  - **Tailwind CSS Compilation:** Debugged missing styles by manually creating the `tailwind.config.ts` content paths and consolidating the core CSS directives into `index.css`.
  - **Next.js App Router Constraints:** Fixed a 404 routing error by migrating the challenge day component from a nested `q` folder directly to the exact `/day/12` path required by the hackathon. Also implemented hash routing for the Leaderboard (`/dashboard#leaderboard`).
  - **React Render Logic (Confetti Fix):** Fixed a critical layout shift bug where the confetti canvas pushed the DOM down. Used `createPortal` to mount it to the `document.body` and resolved infinite re-renders by restructuring the JSX conditional returns inside `SubmissionForm.tsx`.
  - **Deployment:** Guided the GitHub push process and Vercel deployment, including binding the custom domain (`edubox.sbs`).
