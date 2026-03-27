# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Expense/finance tracker starter app built with React 19 + Vite 7. Single-page app with no backend — all state is in-memory. This is a course starter project that intentionally contains bugs, poor UI, and messy code to be fixed as exercises.

## Commands

- `npm run dev` — Start dev server (http://localhost:5173)
- `npm run build` — Production build to `dist/`
- `npm run lint` — ESLint check
- No test framework is configured.

## Architecture

React SPA with no routing or external state management. All state is managed via `useState` hooks. Styles are split between `src/App.css` (component styles) and `src/index.css` (global styles).

- **App** (`src/App.jsx`) — Root component, owns the `transactions` array state and seed data.
- **Summary** (`src/Summary.jsx`) — Computes and displays `totalIncome`, `totalExpenses`, and `balance` from the transactions prop.
- **TransactionForm** (`src/TransactionForm.jsx`) — Owns form state, calls `onAddTransaction` callback to add new transactions.
- **TransactionList** (`src/TransactionList.jsx`) — Owns filter state, renders filtered transaction table.

Categories are defined locally in both `TransactionForm` and `TransactionList`.

## Known Issues

- "Freelance Work" seed data is typed as "expense" instead of "income".

## Lint Rules

- `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).
- Uses `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
