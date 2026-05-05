export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        placeholder="Filter tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
