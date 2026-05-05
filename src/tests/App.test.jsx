// eslint-disable-next-line no-unused-vars
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import Column from "../components/Column";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import SearchBar from "../components/SearchBar";
import StatusBar from "../components/StatusBar";

// ── Helpers ────────────────────────────────────────────────────────────────────

const ALL_STATUSES = ["todo", "inprogress", "done"];

function makeTask(overrides = {}) {
  return {
    id: "task-test-1",
    title: "Sample Task",
    description: "A test description",
    status: "todo",
    createdAt: new Date("2025-06-01").toISOString(),
    ...overrides,
  };
}

function makeColumn(overrides = {}) {
  return {
    id: "todo",
    label: "To Do",
    ...overrides,
  };
}

// ── App (integration) ─────────────────────────────────────────────────────────

describe("App", () => {
  it("renders the board title", () => {
    render(<App />);
    // Title is split across elements ("Sprint" + <span>Board</span>)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders all three columns", () => {
    render(<App />);
    expect(
      screen.getByRole("region", { name: /to do column/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /in progress column/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /done column/i }),
    ).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/filter tasks/i)).toBeInTheDocument();
  });

  it("shows the health indicator", () => {
    render(<App />);
    expect(screen.getByText(/live/i)).toBeInTheDocument();
  });

  it("adds a new task when the form is submitted", () => {
    render(<App />);

    // Open add-task form in "To Do" column
    const addButtons = screen.getAllByText(/\+ add task/i);
    fireEvent.click(addButtons[0]);

    const titleInput = screen.getByLabelText(/task title/i);
    fireEvent.change(titleInput, { target: { value: "Brand New Task" } });

    // Use the exact btn-add label to avoid matching the toggle buttons
    const submitButton = screen.getByRole("button", { name: /^add task$/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Brand New Task")).toBeInTheDocument();
  });

  it("filters tasks by search query", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/filter tasks/i);
    fireEvent.change(searchInput, { target: { value: "GitHub Actions" } });

    // Only the GitHub Actions task should remain visible in cards
    expect(screen.getByText(/Set up GitHub Actions CI/i)).toBeInTheDocument();
    // An unrelated task title should NOT be visible as a card heading
    expect(
      screen.queryByRole("heading", { name: /Design Kanban board UI/i }),
    ).not.toBeInTheDocument();
  });

  it("clears search and shows all tasks", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/filter tasks/i);
    fireEvent.change(searchInput, { target: { value: "xyz_no_match" } });
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "" } });
    expect(screen.queryByText(/no tasks found/i)).not.toBeInTheDocument();
  });

  it("shows no-results message when no tasks match", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/filter tasks/i);
    fireEvent.change(searchInput, { target: { value: "zzznomatch999" } });

    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });
});

// ── TaskCard ──────────────────────────────────────────────────────────────────

describe("TaskCard", () => {
  it("renders task title and description", () => {
    const task = makeTask();
    render(
      <TaskCard
        task={task}
        columnId="todo"
        allStatuses={ALL_STATUSES}
        onMove={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Sample Task")).toBeInTheDocument();
    expect(screen.getByText("A test description")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    const task = makeTask();
    render(
      <TaskCard
        task={task}
        columnId="todo"
        allStatuses={ALL_STATUSES}
        onMove={vi.fn()}
        onDelete={onDelete}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /delete task/i }));
    expect(onDelete).toHaveBeenCalledWith("task-test-1");
  });

  it("calls onMove with next status when forward button clicked", () => {
    const onMove = vi.fn();
    const task = makeTask({ status: "todo" });
    render(
      <TaskCard
        task={task}
        columnId="todo"
        allStatuses={ALL_STATUSES}
        onMove={onMove}
        onDelete={vi.fn()}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /move to in progress/i }),
    );
    expect(onMove).toHaveBeenCalledWith("task-test-1", "inprogress");
  });

  it("calls onMove with previous status when back button clicked", () => {
    const onMove = vi.fn();
    const task = makeTask({ status: "done" });
    render(
      <TaskCard
        task={task}
        columnId="done"
        allStatuses={ALL_STATUSES}
        onMove={onMove}
        onDelete={vi.fn()}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /move to in progress/i }),
    );
    expect(onMove).toHaveBeenCalledWith("task-test-1", "inprogress");
  });

  it("shows no back button in the first column", () => {
    render(
      <TaskCard
        task={makeTask()}
        columnId="todo"
        allStatuses={ALL_STATUSES}
        onMove={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /move to to do/i }),
    ).not.toBeInTheDocument();
  });

  it("shows no forward button in the last column", () => {
    render(
      <TaskCard
        task={makeTask({ status: "done" })}
        columnId="done"
        allStatuses={ALL_STATUSES}
        onMove={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /move to done/i }),
    ).not.toBeInTheDocument();
  });
});

// ── AddTaskForm ───────────────────────────────────────────────────────────────

describe("AddTaskForm", () => {
  it("renders the title input", () => {
    render(<AddTaskForm onAdd={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
  });

  it("disables Add button when title is empty", () => {
    render(<AddTaskForm onAdd={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByRole("button", { name: /add task/i })).toBeDisabled();
  });

  it("enables Add button when title has content", () => {
    render(<AddTaskForm onAdd={vi.fn()} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: "Hello" },
    });
    expect(
      screen.getByRole("button", { name: /add task/i }),
    ).not.toBeDisabled();
  });

  it("calls onAdd with title and description on submit", () => {
    const onAdd = vi.fn();
    render(<AddTaskForm onAdd={onAdd} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: "My Task" },
    });
    fireEvent.change(screen.getByLabelText(/task description/i), {
      target: { value: "My Desc" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAdd).toHaveBeenCalledWith("My Task", "My Desc");
  });

  it("does not submit when title is whitespace only", () => {
    const onAdd = vi.fn();
    render(<AddTaskForm onAdd={onAdd} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("calls onCancel when Cancel is clicked", () => {
    const onCancel = vi.fn();
    render(<AddTaskForm onAdd={vi.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});

// ── Column ────────────────────────────────────────────────────────────────────

describe("Column", () => {
  const defaultProps = {
    column: makeColumn(),
    tasks: [],
    allStatuses: ALL_STATUSES,
    onAddTask: vi.fn(),
    onMoveTask: vi.fn(),
    onDeleteTask: vi.fn(),
    isFiltering: false,
  };

  it("renders column title", () => {
    render(<Column {...defaultProps} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
  });

  it("shows empty state when no tasks", () => {
    render(<Column {...defaultProps} />);
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  it("shows task cards when tasks are provided", () => {
    const tasks = [makeTask({ id: "t1", title: "First Task" })];
    render(<Column {...defaultProps} tasks={tasks} />);
    expect(screen.getByText("First Task")).toBeInTheDocument();
  });

  it("shows add task button when not filtering", () => {
    render(<Column {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /add task to to do/i }),
    ).toBeInTheDocument();
  });

  it("hides add task button when filtering", () => {
    render(<Column {...defaultProps} isFiltering={true} />);
    expect(
      screen.queryByRole("button", { name: /add task to to do/i }),
    ).not.toBeInTheDocument();
  });

  it("shows form on add-task button click", () => {
    render(<Column {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /add task to to do/i }));
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
  });

  it("displays the task count badge", () => {
    const tasks = [
      makeTask({ id: "t1", title: "Task A" }),
      makeTask({ id: "t2", title: "Task B" }),
    ];
    render(<Column {...defaultProps} tasks={tasks} />);
    expect(screen.getByLabelText(/2 tasks/i)).toBeInTheDocument();
  });
});

// ── SearchBar ─────────────────────────────────────────────────────────────────

describe("SearchBar", () => {
  it("renders input", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText(/filter tasks/i)).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText(/filter tasks/i), {
      target: { value: "hello" },
    });
    expect(onChange).toHaveBeenCalledWith("hello");
  });

  it("shows clear button when value is not empty", () => {
    render(<SearchBar value="abc" onChange={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /clear search/i }),
    ).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(
      screen.queryByRole("button", { name: /clear search/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onChange with empty string on clear", () => {
    const onChange = vi.fn();
    render(<SearchBar value="abc" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /clear search/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });
});

// ── StatusBar ─────────────────────────────────────────────────────────────────

describe("StatusBar", () => {
  it("renders counts for each status", () => {
    const tasks = [
      makeTask({ id: "1", status: "todo" }),
      makeTask({ id: "2", status: "todo" }),
      makeTask({ id: "3", status: "inprogress" }),
      makeTask({ id: "4", status: "done" }),
    ];
    render(<StatusBar tasks={tasks} />);

    // We can verify individual numbers appear in the document
    const allText = document.body.textContent;
    expect(allText).toMatch("2");
    expect(allText).toMatch("1");
  });

  it("renders all three status labels", () => {
    render(<StatusBar tasks={[]} />);
    expect(screen.getByText(/to do/i)).toBeInTheDocument();
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/done/i)).toBeInTheDocument();
  });
});
