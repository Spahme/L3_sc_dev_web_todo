import { useState } from "react";

export type NewTaskProps = { onAdd: (content: string) => void };

export function AddNewTask({ onAdd }:NewTaskProps ) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState<string>("");
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);


  function resetForm() {
    setNewTask("");
  }

  function handleAddTask() {
    if (!newTask.trim()) return;
    onAdd(newTask);
    togglePopup();
    resetForm();
  }
  
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
