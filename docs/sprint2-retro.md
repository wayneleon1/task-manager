# Sprint 2 — Final Retrospective

**Date:** 2025-06-08

---

## Did We Apply the Sprint 1 Improvements?

| Improvement | Outcome |
|-------------|---------|
| Commit granularity | ✅ Every component/test committed separately with consistent prefixes |
| Logging from the start | ✅ `log()` utility was the first thing added in Sprint 2 |

Both improvements were successfully applied and felt noticeably beneficial during development.

---

## What Went Well

- **Real-time filtering** was simpler to implement than expected because all task data lived in one `tasks` array in `App`. The `filteredTasks` derived value slotted in cleanly without restructuring any components.
- **Structured logging** proved useful immediately — during manual testing it was easy to trace the sequence of actions in the console and confirm the correct task IDs were being passed.
- **Test-first mindset** carried over from Sprint 1. Writing the `SearchBar` tests before the component helped clarify the exact prop contract needed.

---

## What Could Be Improved

### 1 — No Persistent Storage
Tasks are lost on page refresh. A real application would use `localStorage` or a backend API to persist state. This was out of scope for the sprint but is the most significant limitation of the current prototype.

**Future action:** Wrap `useState` with a custom `useLocalStorage` hook, or introduce a lightweight backend.

### 2 — Accessibility Could Be Stronger
While `aria-label` attributes are used on key elements, keyboard navigation for the move buttons hasn't been fully tested, and focus management after form submission could be improved.

**Future action:** Run an automated accessibility audit (e.g., `axe-core`) as part of the CI pipeline.

---

## Key Lessons Learned

1. **Keep state as high as needed, but no higher.** Centralising all task state in `App` with pure prop-passing made testing trivial and avoided prop-drilling problems because the component tree was shallow.

2. **Iterative commits build a story.** The cleaner commit history in Sprint 2 made it easy to see exactly what changed and why — this is the point of version control, and it pays off during review.

3. **Logging is cheap to add early, expensive to add late.** Adding the `log()` utility at the very start of Sprint 2 (as planned in the retro) meant every subsequent feature automatically got instrumentation. Retrofitting it after the fact would have been tedious.

4. **Definition of Done prevents "almost done" drift.** Having a concrete DoD checklist stopped features being declared complete before their tests were written.

---

## Overall Process Assessment

The two-sprint Agile structure worked well for a project of this size. Sprint 0 planning overhead was minimal but paid off — having prioritised user stories meant there was never any ambiguity about what to build next. The CI pipeline added confidence throughout: if the pipeline was green, the deliverable was genuinely working, not just "working on my machine."
