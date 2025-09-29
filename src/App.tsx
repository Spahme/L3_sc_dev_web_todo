import "./App.css";
import { tasksCollection as initialTasks } from "./data";
import { useState } from "react";
import { NewTaskPopup} from "./components/Task/Add"; 
import { ChangeStatus } from "./components/Task/ChangeStatus";
import { Update } from "./components/Task/Update";

import type { TaskStatus } from "./Task";

type TaskFilters = "all" | TaskStatus;

const filters: TaskFilters[] = ["all", "todo", "doing", "done"];

export default function Home() {
  const [allTasks, AddNewTask] = useState(initialTasks);
  const [filter, setFilter] = useState<TaskFilters>("all");

  // * modifier le contenu
  function HandleUpdateContent(id: string) {
    Update(id, AddNewTask);
  }

  // * ajouter une tâche
  function handleAddTask(content: string) {
    try {
      const value = content.trim();
      if (!value) return;

      const next = [
        { id: crypto.randomUUID(), content: value, createdAt: new Date(), status: "todo" as const },
        ...allTasks,
      ];
      AddNewTask(next);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  }

  // * status
  function handleChangeStatus(id: string, status:TaskStatus) {
    try {
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
    } catch (error) {
      console.error("Erreur lors du changement de statut :", error);
    }
  }

  // * filtrer
  const filteredTasks = allTasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="container">
      <main className="main">
        <header className="header">
          <h1 className="h1">Todo List</h1>
          <h2 className="h2">nombre de tâches : {filteredTasks.length}</h2>
        </header>

        <div className="addTaskSection">
          <NewTaskPopup onAdd={handleAddTask} />
        </div>

        <select
          className="filterSelect"
          value={filter}
          onChange={e => setFilter(e.target.value as TaskFilters)}
        >

        {
          filters.map(f => (
            <option key={f} value={f}>
              {f === "all" ? "Toutes" : f === "todo" ? "à faire" : f === "doing" ? "en cours" : "terminé"}
            </option>
          ))
        }
        </select>

        <ul className="taskList">
          {filteredTasks.map(task => (
            <li key={task.id}  className="taskItem">
              <span onClick={() => HandleUpdateContent(task.id)}>{task.content}</span>
              <span className={`status ${task.status}`}></span>
              <ChangeStatus task={task} onChange={handleChangeStatus} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}



