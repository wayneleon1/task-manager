import React from "react";

const STATUS_ORDER = ["todo", "inprogress", "done"];

const STATUS_LABELS = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

// const MOVE_ARROWS = {
//   todo: "→",
//   inprogress: null,
//   done: "←",
// };

export default function TaskCard({ task, columnId, onMove, onDelete }) {
  const currentIndex = STATUS_ORDER.indexOf(columnId);
  const prevStatus = currentIndex > 0 ? STATUS_ORDER[currentIndex - 1] : null;
  const nextStatus =
    currentIndex < STATUS_ORDER.length - 1
      ? STATUS_ORDER[currentIndex + 1]
      : null;

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return (
    <article className="task-card" aria-label={`Task: ${task.title}`}>
      <div className="task-top">
        <h3 className="task-title">{task.title}</h3>
        <button
          className="task-delete"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.title}`}
          title="Delete task"
        >
          ×
        </button>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-footer">
        <span className="task-date">{formattedDate}</span>

        <div className="task-actions">
          {prevStatus && (
            <button
              className="move-btn"
              onClick={() => onMove(task.id, prevStatus)}
              aria-label={`Move to ${STATUS_LABELS[prevStatus]}`}
              title={`Move to ${STATUS_LABELS[prevStatus]}`}
            >
              ← {STATUS_LABELS[prevStatus]}
            </button>
          )}
          {nextStatus && (
            <button
              className="move-btn"
              onClick={() => onMove(task.id, nextStatus)}
              aria-label={`Move to ${STATUS_LABELS[nextStatus]}`}
              title={`Move to ${STATUS_LABELS[nextStatus]}`}
            >
              {STATUS_LABELS[nextStatus]} →
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
