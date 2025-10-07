import type { TaskStatus } from "../../Task";

// TODO modifier le contenu
// ? au clic sur le contenu, demander le nouveau contenu
// ? si le contenu est vide ou annulé, ne rien faire
// ? sinon mettre à jour la tâche avec le nouveau contenu, la date de mise à jour et remettre le status à "todo"
export function ChangeTaskStatus({
  task,
  onChange,
}: {
  task: { id: string; status: TaskStatus };
  onChange: (id: string, status: TaskStatus) => void;
}) {
  // ? generation des options pour les status en fonction de Taskstatus typé dans Task.ts
  return (
    <select
      value={task.status}
      onChange={(e) => onChange(task.id, e.target.value as TaskStatus)}
      className="statusSelect"
    >
      {["todo", "doing", "done"].map((status) => (
        <option key={status} value={status}>
          {status === "todo" ? "À faire" : status === "doing" ? "En cours" : "Terminé"}
        </option>
      ))}
    </select>
  );
}