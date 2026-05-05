# SprintBoard

A lightweight Kanban task manager built with React.js, developed across two simulated Agile sprints.

## Quick Start

```bash
npm install
npm run dev       # Development server → http://localhost:5173
npm test          # Run all unit tests
npm run build     # Production build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx        # App title + health indicator
│   ├── Column.jsx        # Kanban column container
│   ├── TaskCard.jsx      # Individual task card with move/delete
│   ├── AddTaskForm.jsx   # Inline form for adding tasks
│   ├── SearchBar.jsx     # Real-time keyword filter (Sprint 2)
│   └── StatusBar.jsx     # Live task counts per column (Sprint 2)
├── tests/
│   └── App.test.jsx      # All unit & integration tests
├── App.jsx               # Root component + state management
├── App.css               # Global styles
└── main.jsx              # React entry point
docs/
├── backlog.md            # Product backlog, sprints, DoD
├── sprint1-review.md     # Sprint 1 demo write-up
├── sprint1-retro.md      # Sprint 1 retrospective
├── sprint2-review.md     # Sprint 2 demo write-up
└── sprint2-retro.md      # Final retrospective
.github/
└── workflows/
    └── main.yml          # GitHub Actions CI/CD pipeline
```

## Features

- **Kanban Board** — Three columns: To Do, In Progress, Done
- **Add Tasks** — Inline form per column with title + description
- **Move Tasks** — Forward/back buttons on each card
- **Delete Tasks** — One-click removal with visual confirmation
- **Search/Filter** — Real-time keyword filtering across all columns
- **Status Bar** — Live task count per column
- **Monitoring** — Structured console logging on every state change

## CI/CD

GitHub Actions pipeline (`.github/workflows/main.yml`):

1. **Unit Tests** — runs `vitest` on every push and PR
2. **Production Build** — runs `vite build` only after tests pass
