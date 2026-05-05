export function log(action, detail = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    action,
    ...detail,
  };
  console.log("[SprintBoard]", JSON.stringify(entry));
}
