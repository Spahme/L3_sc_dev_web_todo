// TODO supprimer une tâche
// ? au clic sur le bouton de suppression, supprimer la tâche
// ? demander une confirmation avant de supprimer
export function DeleteTask (id: string, onDelete: () => void) {
  if (window.confirm(`Êtes-vous sûr de vouloir supprimer cette tâche (id : ${id})?`)) {
    onDelete();
  }
}
