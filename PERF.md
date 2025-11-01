Performance Audit & Optimization Notes

Context
- Project: Frontier AI Studio
- Focus: 3D-rich hero, GSAP animations, responsive experience

Immediate goals
- Keep initial load fast: minimize main-thread work, lazy-load heavy 3D assets, and avoid blocking rendering.

Recommendations

1) Lazy-load 3D assets & scenes
- Use dynamic import for heavier scenes/components (already using Next dynamic for `HeroScene`).
- Split large models into smaller chunks and load when needed.

2) Use compressed textures and optimized geometry
- Use KTX2/ BASIS compressed textures for environment and material maps.
- Prefer low-poly geometry or LODs for distant objects.

3) Reduce lights & expensive postprocessing
- Minimize real-time lights; prefer environment maps or baked lighting where possible.
- Only enable postprocessing (SSAO, Bloom) on desktop and allow toggles for low-power devices.

4) Use requestIdleCallback and intersection observers
- Defer non-critical animations and heavy setup using requestIdleCallback.
- Only initialize GSAP ScrollTrigger for sections near the viewport; use IntersectionObserver to gate heavy animations.

5) Avoid synchronous layout thrash
- Batch reads/writes to DOM when measuring (use getBoundingClientRect carefully) and avoid forced reflow.

6) Lighthouse targets
- FCP < 1.2s (mobile baseline)
- TBT < 150ms
- CLS < 0.1

7) Monitoring
- Add RUM (real-user monitoring) to measure LCP/TBT in production and adjust thresholds.

Implementation quick wins
- Convert hero environment to use a single prefiltered environment map.
- Export simplified LODs for the main orb and fallback to a 2D canvas on low-end devices.
- Delay heavy GSAP animations until after first input or when the user scrolls near the section.

