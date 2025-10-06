export function Delete (id: string, onDelete: () => void) {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
    onDelete();
  }
}
