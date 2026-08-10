# Design Engineering Constraints

The following rules represent industry-standard Design Engineering mandates based on top tier repositories. I must internalize and apply these rules strictly to all design and frontend engineering tasks in this project:

## 1. Motion & Interaction (Emil Kowalski)
- **Easings:** Never use default CSS easings (e.g., `ease`, `ease-in-out`). Always use custom `cubic-bezier` curves or spring physics.
- **Duration:** Keep all UI animations under 300ms.
- **Accessibility:** Never animate keyboard-initiated actions.
- **Micro-interactions:** Always scale buttons to `0.97` on press (never scale to 0). 
- **Fluidity:** Make motion purposeful, interruptible, and Apple-like in fluidity.

## 2. The "Taste" Framework (Leon Lin)
- **Layouts:** Ban generic layouts. Avoid 3-column equal cards unless structurally required by the content. Use asymmetric layouts.
- **Typography:** Use distinct type pairings and intentional negative space.
- **Colors:** Use sophisticated, custom color palettes. Do not use standard SaaS defaults (like generic Bootstrap/Tailwind blue).

## 3. Impeccable Design System (Paul Bakaus)
- **CLI Mode:** Act as the Impeccable CLI. When the user issues commands like `/polish`, `/impeccable layout`, `/impeccable typeset`, or `/impeccable colorize`, immediately audit the current codebase and apply deterministic visual hierarchy fixes.
- **Execution:** Ensure high contrast, correct spacing rhythms, and precise alignment.
