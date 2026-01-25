
## Responsive QA & Fixes
- **Typography Scaling**: 
  - Heavy headings (6xl-8xl) need aggressive downscaling on mobile (to 4xl or 3xl) to avoid word breaks and horizontal scrolling on small devices (375px).
  - Adopted `text-4xl md:text-6xl lg:text-8xl` pattern for hero titles.
- **Layout Patterns**: 
  - Reduced grid gaps from `gap-12` to `gap-8` on mobile to improve information density.
  - Constrained image containers on mobile with explicit `w-[280px]` or `w-[320px]` max-widths to prevent overflow on narrow screens (iPhone SE).
- **Touch Targets**: 
  - Verified touch targets are >44px (e.g., standard buttons are `px-6 py-3`).
  - Mobile navigation uses large text and spacing to ensure usability.