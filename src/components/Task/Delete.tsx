export function DeleteTask (id: string, onDelete: () => void) {
  if (window.confirm(`Êtes-vous sûr de vouloir supprimer cette tâche (id : ${id})?`)) {
    onDelete();
  }
}
