# Component Rules

These are the official rules for creating components in this design system. Every component MUST follow this structure.

## 1. Component Folder Structure
Simple components = single file

## 2. TypeScript Rules

- Always extend native HTML element props: `React.ComponentProps<"button">` or `React.ComponentProps<"input">`

## 3. ClassName & Styling Rules

- Every component MUST accept `className`
- MUST merge classes using `cn()`
- NEVER hardcode colors or Typography
- MUST use custom design token via Tailwind classes, if not there use hex arbitrary value

## 4. CVA Variant System (Optional)

All visual variants must use Class Variance Authority (CVA).

- Create a `componentVariants` using `cva()`
- Must define `defaultVariants`
- Must export variant function for external usage
- Accept variant props via `VariantProps<typeof componentVariants>`
- Common variants: `variant: default | outline | subtle | ghost`, `size: sm | md | lg`, `tone: destructive | success | neutral`

## 5. Polymorphic Components (Optional)

Every interactive component MUST support `asChild?: boolean` using `import { Slot } from "@radix-ui/react-slot"` with `const Comp = asChild ? Slot : "button"`

## 6. Stateless UI Components (NO LOGIC)

The component file MUST be purely presentational.

- NO `useState`, `useEffect`, or logic inside
- Only render UI / DOM
- Forward all props (`{...props}`)
- Merge `className`
- Support all ARIA attributes

## 7. Hooks = Behavior Layer (Logic Lives Here)

All interactive or behavioral logic MUST be extracted into hooks.

- Hooks MUST return `{ state, actions }`
- Be reusable
- Contain no JSX

## 8. Composition Pattern

Large components MUST be built from composable subcomponents.

- Each subcomponent is its own function
- Use `data-slot` attribute on each subcomponent
- MUST export all subcomponents

## 9. Data Attributes (Required)

Components MUST use descriptive data attributes for styling, theming, and state.

- slot: `data-slot="button"`
- variant: `data-variant="outline"`
- size: `data-size="sm"`
- state: `data-state="open"`
- disabled: `data-disabled`

## 10. Accessibility Rules (MANDATORY)

Every component MUST be accessible by default.

- Semantic HTML first
- Support all ARIA props
- Add `aria-label` for icon-only buttons
- Keyboard navigation must Just Work
- MUST use visible focus ring: `focus-visible:ring-[3px]`, `focus-visible:ring-ring/50`, `focus-visible:border-ring`
- Required Keyboard Support: Enter, Escape, Space, ArrowUp / ArrowDown, Tab / Shift+Tab

## 11. Error & Validation States
Input-like components MUST support `aria-invalid="true"`, `aria-invalid:border-destructive`, `aria-invalid:ring-destructive/20`

## 12. Disabled State Rules
Disabled components MUST use `disabled:pointer-events-none` and `disabled:opacity-50`. Disabled = no hover, no focus, no keyboard.


## Decision Checklist (ask these BEFORE you create a component)

- Is this a simple visual primitive or a complex pattern? Simple = single file. Complex = folder with parts.
- Will this component have multiple visual modes (size/variant/tone)? Yes = add CVA variants. No = single style.
- Might consumers need to render a different root element (button vs link)? Yes = add asChild/Slot. No = skip.
- Will behavior be shared or reused across multiple components? Yes = create a hook in /hooks. No = keep local.
- Do different parts need to be exported individually (Header, Dropdown menu)? Yes = split into subcomponents & index.ts. No = single file.
- Does the component need interactive states (clickable, navigable)? Yes = support both `href` (link) and `onClick` (button), add keyboard handlers, set proper ARIA roles.
- Does the component display dynamic content (images, lists)? Yes = handle empty states with fallback UI, use proper alt text and ARIA labels.