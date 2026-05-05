# Sprint 2 Review

**Sprint Duration:** 2025-06-05 → 2025-06-08  
**Sprint Goal:** Add delete, search/filter, and monitoring; apply Sprint 1 retrospective improvements.

---

## Retrospective Improvements Applied

| Improvement | Action Taken |
|-------------|--------------|
| Commit granularity | Each component and test file committed separately with `feat()`/`test()` prefix |
| Logging / observability | `log()` utility added to `App.jsx` and called in every state mutation |

---

## Stories Delivered

| Story | Description | Status |
|-------|-------------|--------|
| US-04 | Delete a task from any column | ✅ Complete |
| US-05 | Filter/search tasks by keyword | ✅ Complete |
| US-06 | Live task count per column | ✅ Complete |

All three stories meet the Definition of Done.

---

## What Was Built

### Delete Task (US-04)
A subtle `×` button appears in the top-right corner of each `TaskCard`. Clicking it calls `deleteTask(id)` in `App`, which filters the task out of state. The card animates out immediately. The delete button uses a danger colour on hover as a visual affordance.

### Search / Filter (US-05)
A `SearchBar` component sits in a toolbar below the header. As the user types, `filteredTasks` is computed from the full task list using a case-insensitive substring match on both title and description. The three columns re-render with only matching cards. A clear (`×`) button resets the filter. When filtering is active, the **+ Add Task** buttons are hidden to prevent confusion.

A "No tasks found" full-board message appears when no tasks match the current query.

### Status Bar / Monitoring (US-06)
A `StatusBar` in the header displays live counts for each status column, updating in real time as tasks are added, moved, or deleted.

Additionally, a `log()` utility emits a structured JSON object to the browser console on every state change:
```
[SprintBoard] {"timestamp":"2025-06-07T10:32:11.204Z","action":"TASK_ADDED","id":"task-1717756331204","status":"todo"}
[SprintBoard] {"timestamp":"2025-06-07T10:32:45.801Z","action":"TASK_MOVED","id":"task-1717756331204","newStatus":"inprogress"}
[SprintBoard] {"timestamp":"2025-06-07T10:33:02.115Z","action":"TASK_DELETED","id":"task-1717756331204"}
```

---

## Demo Screenshots

> *(In a real submission, insert screenshots here.)*
>
> **Screenshot 1:** Search bar with "github" typed — only the GitHub Actions card is visible.  
> **Screenshot 2:** "No tasks found" screen with a nonsense search query.  
> **Screenshot 3:** Browser console showing structured log entries.  
> **Screenshot 4:** Task being deleted — board updates instantly.

---

## Final Test Run

All **30+ unit and integration tests** pass across both sprints. CI pipeline runs clean on every push.
