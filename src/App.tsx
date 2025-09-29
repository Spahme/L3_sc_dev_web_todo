import "./App.css";
import { tasksCollection as initialTasks } from "./data";
import { useState } from "react";

export default function Home() {
  const [AllTasks, AddNewTask] = useState(initialTasks);


  function handleAddTask(content: string) {
    const value = content.trim();
    if (!value) return;

    const next = [
      { id: crypto.randomUUID(), content: value, createdAt: new Date(), status: "todo" as const },
      ...AllTasks,
    ];
    AddNewTask(next);
  }
  function handleChangeStatus(id: string, status: "todo" | "doing" | "done") {
    AddNewTask(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              status,
              completedAt: status === "done" ? new Date() : undefined,
            }
          : t
      )
    );
  }


  return (
    <div className="container">
      <main className="main">
        <header className="header">
          <h1 className="h1">Todo List</h1>
          <h2 className="h2">nombre de tâches : {AllTasks.length}</h2>
        </header>

        <div className="addTaskSection">
          <NewTaskPopup onAdd={handleAddTask} />
        </div>

        <ul className="taskList">
          {AllTasks.map((task) => (
            <li key={task.id} className="taskItem">
              <span>{task.content}</span>
              <span className={`status ${task.status}`}></span>
              <ChangeStatus task={task} onChange={handleChangeStatus} />
            </li>
          ))}
        </ul>

      </main>
    </div>
  );
}

function NewTaskPopup({ onAdd }: { onAdd: (content: string) => void }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="newTaskPopup">
      <button onClick={togglePopup} className="addTaskButton">
        {isPopupOpen ? "Fermer" : "Ajouter une tâche"}
      </button>
      {isPopupOpen && <AddNewTask onAdd={(c) => { onAdd(c); togglePopup(); }} />}
    </div>
  );
}

function AddNewTask({ onAdd }: { onAdd: (content: string) => void }) {
  const [newTask, setNewTaskContent] = useState("");

  return (
    <div className="addTaskContainer">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTaskContent(e.target.value)}
        placeholder="Nouvelle tâche"
        className="taskInput"
      />
      <button
        onClick={() => {
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

function ChangeStatus({
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