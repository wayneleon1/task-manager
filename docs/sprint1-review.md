# Sprint 1 Review

**Sprint Duration:** 2025-06-01 → 2025-06-04  
**Sprint Goal:** Deliver a working Kanban board where users can view, add, and move tasks.

---

## Stories Delivered

| Story | Description | Status |
|-------|-------------|--------|
| US-01 | View tasks in three Kanban columns | ✅ Complete |
| US-02 | Add a task (title + description) to any column | ✅ Complete |
| US-03 | Move tasks between columns | ✅ Complete |

All three planned stories meet the Definition of Done:
- Working in browser ✓
- Unit tests written and passing ✓
- CI pipeline green ✓
- Committed incrementally ✓

---

## What Was Built

### Board Layout (US-01)
The app renders three columns — **To Do**, **In Progress**, and **Done** — each with a colour-coded header, a task count badge, and an empty-state placeholder when no tasks exist.

### Add Task Form (US-02)
Clicking **+ Add Task** in any column opens an inline form. The **Add Task** button stays disabled until the user types a title, preventing empty submissions. On submit, the task appears instantly in the column without a page reload.

### Task Movement (US-03)
Each `TaskCard` shows directional move buttons appropriate for its current column:
- **To Do** → "In Progress →"
- **In Progress** → "← To Do" and "Done →"
- **Done** → "← In Progress"

Clicking a button updates the task's `status` in central `App` state, which re-renders the relevant columns immediately.

---

## Demo Screenshots

> *(In a real submission, insert screenshots here of the running application.)*
>
> **Screenshot 1:** Initial board with seed tasks across all three columns.  
> **Screenshot 2:** Add Task form open in the "To Do" column.  
> **Screenshot 3:** A task after being moved from "To Do" to "In Progress".

---

## CI Pipeline

- GitHub Actions workflow created at `.github/workflows/main.yml`
- Pipeline runs on every push to `main` or `develop`, and on pull requests
- Two jobs: **Unit Tests** → **Production Build** (build only runs if tests pass)
- All 20 unit tests passing ✓

---

## Test Coverage

Tests written for:
- `App` — renders, adds task, moves task integration flow
- `TaskCard` — move and delete callbacks, button visibility rules
- `AddTaskForm` — validation, submit, cancel
- `Column` — empty state, task rendering, form toggle
- `SearchBar` — input, clear button
- `StatusBar` — label rendering
