import type { Task } from "../../Task";

export function Update(
  id: string,
  UpdateTask: React.Dispatch<React.SetStateAction<Task[]>>
) {
  const updatedContent = prompt("Entrez le nouveau contenu de la tâche :");
  if (!updatedContent) return;

  UpdateTask(prev =>
    prev.map(task =>
      task.id === id ? { ...task, content: updatedContent.trim(), updatedAt: new Date(), status: "todo" } : task
    )
  );
}
