---
name: Project: Expense Tracker
description: Overview of the expense tracker course project — architecture, known bugs, and review history
type: project
---

React 19 + Vite 7 SPA (no backend, no routing, no external state management). Course starter project intentionally containing bugs and code smells for students to fix. All state is in-memory via useState.

**Why:** Course exercise project — bugs are intentional teaching material, not accidents.

**How to apply:** When reviewing, distinguish between intentional course bugs (like the seed data type mismatch) and genuine issues the student should catch. Flag both, but note which ones are documented known issues.

## Components
- App.jsx — root, owns transactions array state + seed data
- Summary.jsx — derived totals display
- TransactionForm.jsx — controlled form, calls onAddTransaction callback
- TransactionList.jsx — filter state + table + delete confirmation modal
- SpendingChart.jsx — recharts BarChart, expenses only

## Known bugs documented in CLAUDE.md
- "Freelance Work" seed entry has type "expense" instead of "income" (App.jsx line 13)
