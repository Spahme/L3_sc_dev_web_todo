export function ChangeStatus({
  task,
  onChange,
}: {
  task: { id: string; status: "todo" | "doing" | "done" };
  onChange: (id: string, status: "todo" | "doing" | "done") => void;
}) {
  return (
    <select
      value={task.status}
      onChange={(e) => onChange(task.id, e.target.value as "todo" | "doing" | "done")}
      className="statusSelect"
    >
      <option value="todo">à faire</option>
      <option value="doing">en cours</option>
      <option value="done">terminé</option>
    </select>
  );
}