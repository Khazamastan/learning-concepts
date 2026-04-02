# Accessibility Grade Rubric (A-, A, A+)

## Mapping to WCAG Levels
- **A-**: Meets WCAG 2.2 Level A success criteria with minor AA gaps. Key checkpoints:
  - Use semantic HTML landmarks (`<header>`, `<main>`, `<nav>`).
  - Provide text alternatives for non-text content.
  - Ensure keyboard-only navigation without traps.
  - Manage focus order using `tabindex="0"` sparingly.
- **A**: Fully conforms to WCAG 2.2 Level AA.
  - Contrast ratio of 4.5:1 for text under 18pt / 24px.
  - Visible focus indicators (`:focus-visible`) across interactive elements.
  - Accessible form patterns: labels via `for`/`id`, `aria-invalid` on errors.
  - Media captions plus live-region announcements for async updates.
- **A+**: Approaches Level AAA and adds inclusive enhancements.
  - Contrast ratio ≥ 7:1 (or provide theme toggle).
  - Style alternate for reduced motion (`@media (prefers-reduced-motion: reduce)`).
  - Offer sign-language video or extended audio descriptions for critical media.
  - Include personalization (font size controls, skip links to subsections).

## Implementation Checklist
1. **Automated Audits** – Run axe-core, Lighthouse accessibility, and integrate into CI.
2. **Manual Testing** – Screen reader smoke tests (NVDA + Firefox, VoiceOver + Safari), keyboard-only walkthrough, color-blind simulators.
3. **Documentation** – Track findings in an accessibility backlog, align grade to last audit date.
4. **Regression Prevention** – Add lint rules (eslint-plugin-jsx-a11y), component library guardrails, and accessibility unit tests where feasible.
