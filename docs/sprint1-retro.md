# Sprint 1 Retrospective

**Date:** 2025-06-04

---

## What Went Well

- **Component decomposition** was clear from the start. Splitting state into `App` and keeping components "dumb" made each piece easy to test in isolation.
- **Testing discipline** — writing tests alongside each component (not at the end) caught a bug in the `AddTaskForm` validation early.
- **CI pipeline** was straightforward to set up with GitHub Actions; the two-job structure (test → build) gave clear separation of concerns.

---

## What Could Be Improved

### Improvement 1 — Commit Granularity
In Sprint 1, some commits bundled multiple changes together (e.g., "Add Column + TaskCard + CSS"). This made the Git history harder to read and the review harder to follow.

**Action for Sprint 2:** Make one commit per logical unit of work — one commit per component, one commit per test file. Use the format: `feat(component): description` or `test(component): description`.

### Improvement 2 — Missing Logging / Observability
During Sprint 1, no logging was added, making it difficult to trace which actions were being taken during manual testing.

**Action for Sprint 2:** Add a `log()` utility at the start of Sprint 2 and call it from every state-changing handler (`addTask`, `moveTask`, `deleteTask`) before writing new features. This doubles as the monitoring requirement.

---

## Process Notes

- Story point estimates felt accurate — US-01 and US-03 both took roughly 3× longer than US-02, matching their relative sizing.
- The Definition of Done was useful as a checklist; it caught a case where a test was missing before a feature was considered complete.
