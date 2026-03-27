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

The entire app lives in a single `App` component (`src/App.jsx`) with all state managed via `useState` hooks. There are no child components, no routing, and no external state management. Styles are split between `src/App.css` (component styles) and `src/index.css` (global styles).

## Known Issues

- Transaction amounts are stored as strings, causing summary calculations (totalIncome, totalExpenses, balance) to concatenate instead of sum.
- "Freelance Work" seed data is typed as "expense" instead of "income".

## Lint Rules

- `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).
- Uses `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
