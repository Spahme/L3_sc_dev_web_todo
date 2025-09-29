import { useState } from "react";

type AddNewTaskProps = { onAdd: (content: string) => void };



export function NewTaskPopup({ onAdd }:AddNewTaskProps ) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [newTask, setNewTask] = useState("");

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  function handleAdd(content: string) {
    onAdd(content);
    togglePopup();
  }

  function handleAddTask() {
    if (!newTask.trim()) return;
    handleAdd(newTask);
    setNewTask("");
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
