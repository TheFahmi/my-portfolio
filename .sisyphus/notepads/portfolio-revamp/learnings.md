# Learnings - Portfolio Revamp

## Conventions & Patterns
_Accumulated knowledge about code patterns and conventions used in this project_

---

### Design System Implementation (Task 1)
- **Tailwind CSS 4 @theme Strategy**:
  - We use the `@theme` directive in `globals.css` to define project-wide tokens.
  - CSS Variables defined inside `@theme` (e.g., `--color-cyan-400`) automatically generate Tailwind utility classes (`text-cyan-400`, `bg-cyan-400`).
  - Animation utilities are created by mapping CSS variables to keyframe definitions (e.g., `--animate-fade-in-up: fadeInUp 0.7s...`).

- **Bold Black & White Aesthetic**:
  - **Base**: Strict adherence to Pure Black (#000000) and Pure White (#ffffff) for maximum contrast.
  - **Accent**: Cyan-400 (#22d3ee) selected for its high visibility and "electric" feel against dark backgrounds.
  - **Neutrals**: Slate scale used for subtle depth to prevent flat UI, but kept minimal.

- **Animation Library**:
  - Added standard entry animations: `fadeInUp`, `fadeInLeft`, `scaleIn`, `slideReveal`.
  - These are exposed as Tailwind utilities: `animate-fade-in-up`, `animate-scale-in`, etc.

- **Glassmorphism**:
  - `.glass-light` and `.glass-dark` utilities added for context-aware transparency.
  - Uses `backdrop-filter: blur(12px)` for a premium feel.

### UI/UX Improvements (Task 2)
- **Theme Toggle Animation**:
  - Implemented a "morph" effect using `framer-motion`'s `AnimatePresence`.
  - Icons rotate (-90deg to 0deg) and scale (0 to 1) during transition.
  - `mode="wait"` ensures one icon clears before the other appears, preventing layout shifts, though we used absolute positioning for overlap.
- **Global Transitions**:
  - Updated `globals.css` to use `ease-in-out` for smoother background and color transitions (300ms).
  - Included `border-color` in transitions to prevent jarring border changes in dark mode.
