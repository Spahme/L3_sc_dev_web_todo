import type { Task } from "../../Task";

export function Update(
  id: string,
  AddNewTask: React.Dispatch<React.SetStateAction<Task[]>>
) {
  const newContent = prompt("Entrez le nouveau contenu de la tâche :");
  if (!newContent) return;

  AddNewTask(prev =>
    prev.map(task =>
      task.id === id
        ? { ...task, content: newContent.trim(), updatedAt: new Date(), status: "todo" }
        : task
    )
  );
}
