---
name: Codebase Patterns
description: Recurring patterns, anti-patterns, conventions, and architectural notes found during code review
type: project
---

## Patterns & Conventions

- Category list is duplicated as a module-level const in both TransactionForm.jsx and TransactionList.jsx — no shared constants file exists
- CSS variables are defined in index.css :root and used throughout App.css — consistent token system
- All CSS is split between index.css (globals/tokens) and App.css (component styles) — no CSS modules or styled-components
- Inline styles used in SpendingChart.jsx (CustomTooltip) while everything else uses class-based CSS — inconsistency
- `Date.now()` used as transaction ID generator in TransactionForm — not collision-safe if transactions are added rapidly

## Anti-Patterns Found

- `handleAddTransaction` in App.jsx uses stale closure pattern: spreads `transactions` directly instead of using functional updater `setTransactions(prev => [...prev, transaction])`
- `handleDeleteTransaction` in App.jsx has same stale closure issue with `.filter` on `transactions` directly
- No input labels on TransactionForm — all form fields are inputs with only placeholder text, no <label> elements
- The empty `<th></th>` for the Delete column in TransactionList has no accessible text
- `Date.now()` IDs are numeric but seed data uses small integers (1–8) — type inconsistency in the id field (all numbers, but semantically different ranges)
- Balance can go negative but the balance-amount class always applies --balance-blue color — no visual distinction for negative balance
- `toLocaleString()` called without locale/options args — formatting varies by user's browser locale, not consistently currency-formatted
- `SpendingChart` returns null when there are no expenses — silent disappearance with no empty state message
- Modal in TransactionList has no keyboard trap or focus management — Escape key does not close it; focus is not moved into modal on open
- `prefers-reduced-motion` not respected — multiple CSS animations run unconditionally

## Style Conventions

- Functional components, no class components
- Named exports at bottom: `export default ComponentName`
- CSS class names: kebab-case
- State hooks at top of component body
- Callback props named `onXxx` (onAddTransaction, onDeleteTransaction)
