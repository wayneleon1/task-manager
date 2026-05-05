import { useState } from "react";

export default function AddTaskForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDesc("");
  }

  return (
    <form
      className="add-task-form"
      onSubmit={handleSubmit}
      aria-label="Add new task"
    >
      <input
        className="form-input"
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        autoFocus
        aria-label="Task title"
        required
      />
      <textarea
        className="form-textarea"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        maxLength={300}
        rows={2}
        aria-label="Task description"
      />
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-add" disabled={!title.trim()}>
          Add Task
        </button>
      </div>
    </form>
  );
}
