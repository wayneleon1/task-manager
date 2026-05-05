# Backlog & Sprint Plans

## Product Vision

> **SprintBoard** is a lightweight Kanban task manager that lets individuals track work across To Do, In Progress, and Done columns — making Agile task management visual, fast, and distraction-free.

---

## Definition of Done (DoD)

A backlog item is considered **Done** when ALL of the following are true:

- [ ] Feature is implemented and working correctly in the browser
- [ ] Code is readable, commented where necessary, and follows project conventions
- [ ] At least one unit or integration test covers the new behaviour
- [ ] All existing tests continue to pass
- [ ] The CI pipeline runs green (tests + build succeed)
- [ ] Changes are committed with a meaningful commit message
- [ ] The feature is visible/demonstrable via a screenshot or short write-up

---

## Product Backlog

| # | User Story | Priority | Estimate | Status |
|---|------------|----------|----------|--------|
| US-01 | As a user, I want to see tasks organised in columns (To Do / In Progress / Done) so I can understand the state of my work at a glance. | High | 3 pts | ✅ Done |
| US-02 | As a user, I want to add a new task (title + description) to any column so I can capture work items quickly. | High | 2 pts | ✅ Done |
| US-03 | As a user, I want to move a task forward or backward between columns so I can reflect the current state of each task. | High | 3 pts | ✅ Done |
| US-04 | As a user, I want to delete a task I no longer need so the board stays clean. | Medium | 1 pt  | ✅ Done |
| US-05 | As a user, I want to filter/search tasks by keyword so I can quickly find a specific item on a busy board. | Medium | 2 pts | ✅ Done |
| US-06 | As a user, I want to see a live count of tasks in each column so I can monitor overall progress at a glance. | Low | 1 pt  | ✅ Done |

---

## Sprint 0 — Planning

**Goal:** Set up repository, define standards, plan sprints.

**Artefacts produced:**
- Product Vision ✅
- Product Backlog with estimates ✅
- Definition of Done ✅
- Sprint 1 Plan ✅
- Sprint 2 Plan ✅

---

## Sprint 1 Plan

**Sprint Goal:** Deliver a working Kanban board where users can view, add, and move tasks.

| Story | Tasks |
|-------|-------|
| US-01 | Scaffold Vite + React project; build `Column` component with static layout |
| US-02 | Build `AddTaskForm` component; wire up `addTask` handler in `App` state |
| US-03 | Build `TaskCard` with move buttons; wire up `moveTask` handler |

**Acceptance Criteria Summary:**
- Three columns render with correct headings
- A task can be added via the form (title required)
- Tasks can be moved left/right between adjacent columns
- All tests pass; CI pipeline is green

---

## Sprint 2 Plan

**Sprint Goal:** Add delete, search/filter, and monitoring features; apply Sprint 1 retro improvements.

| Story | Tasks |
|-------|-------|
| US-04 | Add delete button to `TaskCard`; wire up `deleteTask` handler |
| US-05 | Build `SearchBar` component; implement real-time filtering in `App` |
| US-06 | Build `StatusBar` component showing live task counts per column |

**Acceptance Criteria Summary:**
- Tasks can be deleted from any column
- Typing in the search bar filters cards in real time; a clear button resets the filter
- Live counts update immediately as tasks are added, moved, or deleted
- Console logging on every state-changing action
- All tests pass; CI pipeline is green
