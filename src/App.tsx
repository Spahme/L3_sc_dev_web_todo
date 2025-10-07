import "./App.css";
import { tasksCollection as initialTasks } from "./data";
import { useState } from "react";
import { AddNewTask } from "./components/Task/Add"; 
import { ChangeTaskStatus } from "./components/Task/ChangeStatus";
import { UpdateTask } from "./components/Task/Update";
import { DeleteTask } from "./components/Task/Delete";
import type { Task, TaskStatus } from "./Task";

// * types des filtres
type TaskFilters = "all" | TaskStatus;
const filters: TaskFilters[] = ["all", "todo", "doing", "done"];


export default function Home() {
  const [allTasks, Tasks] = useState<Array<Task>>(initialTasks);
  const [filter, setFilter] = useState<TaskFilters>("all");
  
  // * filtrer
  const filteredTasks = allTasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  // * modifier le contenu
  function HandleUpdateContent(id: string) {
    UpdateTask(id, setTasks => Tasks(setTasks));
  }

  // * ajouter une tâche
  function handleAddTask(content: string) {
    try {
      const value = content.trim();
      if (!value) return;

      const newTask = [
        { id: crypto.randomUUID(), content: value, createdAt: new Date(), status: "todo" as const },
        ...allTasks,
      ];
      Tasks(newTask);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  }

  // * change le status
  function handleChangeStatus(id: string, status:TaskStatus) {
    try {
      Tasks(prev =>
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

  // * supprimer une tâche
  function handleDeleteTask(id: string) {
    DeleteTask(id, () => {
      Tasks(prev => prev.filter(task => task.id !== id));
    });
  }

  return (      
    
    <div className="container">
      <main className="main">
        <header className="header">
          <h1 className="h1">Todo List</h1>
          <h2 className="h2">{filteredTasks.length > 0 ? `nombre de tâches : ${filteredTasks.length}` : "Aucune tâche à afficher"}</h2>
        </header>

        <div className="addTaskSection">
          <AddNewTask onAdd={handleAddTask} />
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
              <span className="taskContent" onClick={() => HandleUpdateContent(task.id)}>{task.content}</span>
              <span className={`status ${task.status}`}></span>
              <ChangeTaskStatus task={task} onChange={handleChangeStatus} />
              <button className="deleteButton" onClick={() => handleDeleteTask(task.id)}></button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}



