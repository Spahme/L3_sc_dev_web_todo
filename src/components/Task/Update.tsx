import type { Task } from "../../Task";

export function UpdateTask(
  id: string,
  setTasks: (updater: (prev: Task[]) => Task[]) => void
) {
  const updatedContent = prompt("Entrez le nouveau contenu de la tâche :");
  if (!updatedContent || updatedContent.trim() === "") return;

  setTasks(prev =>
    prev.map(task =>
      task.id === id
        ? { ...task, content: updatedContent.trim(), updatedAt: new Date(), status: "todo" }
        : task
    )
  );
}
