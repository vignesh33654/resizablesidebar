---
trigger: model_decision
---

we use jotai for client and Tenstack for server side

## 📖 Jotai Rules

1. Types first - Always define interfaces
2. One atom, one job - Split state into focused atoms
3. Derive, don't duplicate - Compute values with derived atoms
4. Logic in actions - Business logic belongs in action atoms
5. Dumb components - UI only, no logic
