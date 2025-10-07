import type { Task } from "../../Task";

// TODO modifier le contenu
// ? au clic sur le contenu, demander le nouveau contenu
// ? si le contenu est vide ou annulé, ne rien faire
// ? sinon mettre à jour la tâche avec le nouveau contenu, la date de mise à jour et remettre le status à "todo"
export function UpdateTask(
  id: string,
  setTasks: (updater: (prev: Task[]) => Task[]) => void
) {
  const updatedContent = prompt("Entrez le nouveau contenu de la tâche :");
  // ? si le contenu est vide ou annulé, ne rien faire
  if (!updatedContent || updatedContent.trim() === "") return;

  // ? sinon mettre à jour la tâche avec le nouveau contenu, la date de mise à jour et remettre le status à "todo"
  setTasks(prev =>
    prev.map(task =>
      task.id === id
        ? { ...task, content: updatedContent.trim(), updatedAt: new Date(), status: "todo" }
        : task
    )
  );
}
