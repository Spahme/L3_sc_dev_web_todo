import { useState } from "react";

export type NewTaskProps = { onAdd: (content: string) => void };

// TODO ajouter une tâche
// ? si le contenu est vide ou annulé, ne rien faire
// ? sinon ajouter la tâche en tête de liste avec le status "todo" et la date de création
export function AddNewTask({ onAdd }:NewTaskProps ) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState<string>("");
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // * reset le formulaire après ajout
  function resetForm() {
    setNewTask("");
  }

  // * gère l'ajout de la tâche
  // ? si le contenu est vide ou annulé, ne rien faire
  // ? sinon ajouter la tâche en tête de liste avec le status "todo" et la date de création
  function handleAddTask() {
    if (!newTask.trim()) return;
    onAdd(newTask);
    togglePopup();
    resetForm();
  }

  
  // ? au clic sur le bouton "Ajouter une tâche", ouvrir/fermer le popup
  // ? dans le popup, un input pour entrer le contenu de la tâche
  // ? un bouton "Ajouter" pour ajouter la tâche
  return (
    <div className="newTaskPopup">
      <button onClick={togglePopup} className="addTaskButton">
        {isPopupOpen ? "Fermer" : "Ajouter une tâche"}
      </button>

      {isPopupOpen && (
        <div className="addTaskContainer">
            <input
              type="text"
              value={newTask}
              onChange={(e)=>setNewTask(e.target.value)}
              placeholder="Nouvelle tâche"
              className="taskInput"
            />
            <button
              onClick={handleAddTask}
              className="addButton"
            >
              Ajouter
            </button>
          </div>
      )}
    </div>
  );
}
