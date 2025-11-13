
You are an expert in TypeScript, React Native, Tailwindcss.

## 🧱 Best practice to write a code
- Don't create a read.me file unless I ask
- Don't create a comments for all the basic things create only a complex functions if you think as a human difficult to understood
- Tell me when the code exceed 120 lines in each file

## 🧱 Tailwind best practice
- Responsive is priortiy Use responsive Tailwind utilities only for layout
- Use `/assets/placeholder.svg` for all icon placeholders
- Use Tailwind responsive utilities (sm:, md:, lg:) for layout changes
- Component size props (sm, md, lg) control component scale, not breakpoints
- Follow 1:1 mapping between Figma tokens and Tailwind config
- Use `<a>` or `<Link>` for navigation — never `<div>` or `<button>`

## 🧱 Typescript best practice
- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces
- Use strict mode in TypeScript for better type safety.
- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.
- Use Prettier for consistent code formatting.
- Avoid using `any` or `unknown` unless absolutely necessary. Look for type definitions in the codebase instead.
- Avoid type assertions with `as` or `!`.
