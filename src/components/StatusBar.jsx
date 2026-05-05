export default function StatusBar({ tasks }) {
  const counts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inprogress: tasks.filter((t) => t.status === "inprogress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="status-bar" role="status" aria-label="Task counts">
      <div className="status-item">
        <span className="status-dot todo" />
        To Do <span className="status-count">{counts.todo}</span>
      </div>
      <div className="status-item">
        <span className="status-dot inprog" />
        In Progress <span className="status-count">{counts.inprogress}</span>
      </div>
      <div className="status-item">
        <span className="status-dot done" />
        Done <span className="status-count">{counts.done}</span>
      </div>
    </div>
  );
}
