import { useState } from "react";

export function AddNewTask({ onAdd }: { onAdd: (content: string) => void }) {
  const [newTask, setNewTaskContent] = useState("");

  return (
    <div className="addTaskContainer">
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTaskContent(e.target.value)}
        placeholder="Nouvelle tâche"
        className="taskInput"
      />
      <button
        onClick={() => {
          if (!newTask.trim()) return;
          onAdd(newTask);
          setNewTaskContent("");
        }}
        className="addButton"
      >
        Ajouter
      </button>
    </div>
  );
}

export function NewTaskPopup({ onAdd }: { onAdd: (content: string) => void }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="newTaskPopup">
      <button onClick={togglePopup} className="addTaskButton">
        {isPopupOpen ? "Fermer" : "Ajouter une tâche"}
      </button>
      {isPopupOpen && (
        <AddNewTask
          onAdd={(c) => {
            onAdd(c);
            togglePopup();
          }}
        />
      )}
    </div>
  );
}




export function ChangeStatus({
  task,
  onChange,
}: {
  task: { id: string; status: "todo" | "doing" | "done" };
  onChange: (id: string, status: "todo" | "doing" | "done") => void;
}) {
  return (
    <select
      value={task.status}
      onChange={(e) => onChange(task.id, e.target.value as "todo" | "doing" | "done")}
      className="statusSelect"
    >
      <option value="todo">à faire</option>
      <option value="doing">en cours</option>
      <option value="done">terminé</option>
    </select>
  );
}
