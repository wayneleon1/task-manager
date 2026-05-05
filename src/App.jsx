import { useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Column from "./components/Column";
import StatusBar from "./components/StatusBar";
import "./App.css";
import { log } from "./helper/logger";

const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Set up project repository",
    description: "Initialise Git repo, create README, add .gitignore.",
    status: "done",
    createdAt: new Date("2025-06-01T09:00:00").toISOString(),
  },
  {
    id: "task-2",
    title: "Design Kanban board UI",
    description: "Wireframe columns, cards, and add-task form.",
    status: "done",
    createdAt: new Date("2025-06-02T10:30:00").toISOString(),
  },
  {
    id: "task-3",
    title: "Implement task movement",
    description: "Allow cards to move between To Do → In Progress → Done.",
    status: "inprogress",
    createdAt: new Date("2025-06-03T08:00:00").toISOString(),
  },
  {
    id: "task-4",
    title: "Write unit tests",
    description: "Cover task add, move, delete and filter logic.",
    status: "inprogress",
    createdAt: new Date("2025-06-03T14:00:00").toISOString(),
  },
  {
    id: "task-5",
    title: "Set up GitHub Actions CI",
    description: "Pipeline runs linting + tests on every push.",
    status: "todo",
    createdAt: new Date("2025-06-04T09:00:00").toISOString(),
  },
  {
    id: "task-6",
    title: "Add search / filter feature",
    description: "Real-time filtering of tasks by keyword (Sprint 2).",
    status: "todo",
    createdAt: new Date("2025-06-04T11:00:00").toISOString(),
  },
];

const COLUMNS = [
  { id: "todo", label: "To Do" },
  { id: "inprogress", label: "In Progress" },
  { id: "done", label: "Done" },
];

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Add task ────────────────────────────────────────────────────────────────
  const addTask = useCallback((title, description, status) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    log("TASK_ADDED", { id: newTask.id, status });
  }, []);

  // ── Move task ───────────────────────────────────────────────────────────────
  const moveTask = useCallback((taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    log("TASK_MOVED", { id: taskId, newStatus });
  }, []);

  // ── Delete task ─────────────────────────────────────────────────────────────
  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    log("TASK_DELETED", { id: taskId });
  }, []);

  // ── Filter tasks ────────────────────────────────────────────────────────────
  const filteredTasks = searchQuery.trim()
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tasks;

  const hasResults = filteredTasks.length > 0;

  return (
    <div className="app">
      <Header>
        <StatusBar tasks={tasks} />
      </Header>

      <div className="toolbar">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredTasks.length}
          totalCount={tasks.length}
        />
        {searchQuery && (
          <span className="toolbar-info">
            {filteredTasks.length} of {tasks.length} tasks
          </span>
        )}
      </div>

      <main className="board">
        {!hasResults && searchQuery ? (
          <div className="no-results">
            <strong>No tasks found</strong>
            No results for &quot;{searchQuery}&quot; — try a different keyword.
          </div>
        ) : (
          COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={filteredTasks.filter((t) => t.status === col.id)}
              allStatuses={COLUMNS.map((c) => c.id)}
              onAddTask={addTask}
              onMoveTask={moveTask}
              onDeleteTask={deleteTask}
              isFiltering={!!searchQuery}
            />
          ))
        )}
      </main>
    </div>
  );
}
