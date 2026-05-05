import { useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";

export default function Column({
  column,
  tasks,
  allStatuses,
  onAddTask,
  onMoveTask,
  onDeleteTask,
  isFiltering,
}) {
  const [showForm, setShowForm] = useState(false);

  function handleAdd(title, description) {
    onAddTask(title, description, column.id);
    setShowForm(false);
  }

  const colClass = `column col-${column.id}`;

  return (
    <section className={colClass} aria-label={`${column.label} column`}>
      {/* Column header */}
      <div className="column-header">
        <div className="column-title-group">
          <div className="column-accent" aria-hidden="true" />
          <h2 className="column-title">{column.label}</h2>
        </div>
        <span className="column-count" aria-label={`${tasks.length} tasks`}>
          {tasks.length}
        </span>
      </div>

      {/* Task cards */}
      <div className="column-body">
        {tasks.length === 0 ? (
          <div className="empty-column" aria-label="No tasks">
            {isFiltering ? "No matches" : "Empty"}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              allStatuses={allStatuses}
              onMove={onMoveTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>

      {/* Add task area */}
      {!isFiltering && (
        <div className="add-task-area">
          {showForm ? (
            <AddTaskForm
              onAdd={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <button
              className="add-task-toggle"
              onClick={() => setShowForm(true)}
              aria-label={`Add task to ${column.label}`}
            >
              + Add task
            </button>
          )}
        </div>
      )}
    </section>
  );
}
