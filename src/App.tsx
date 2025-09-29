import "./App.css";
import { tasksCollection as initialTasks } from "./data";
import { useState } from "react";
import { NewTaskPopup, ChangeStatus} from "./components/Task_modules"; 


export default function Home() {
  const [AllTasks, AddNewTask] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "todo" | "doing" | "done">("all");


  function ChangeContent(id: string) {
    const newContent = prompt("Entrez le nouveau contenu de la tâche :");
    if (newContent !== null) {
      AddNewTask(prev =>
        prev.map(task =>
          task.id === id ? { ...task, content: newContent, updatedAt: new Date(), status: "todo" } : task
        )
      );
      console.log(`Tâche ${id} mise à jour avec le contenu : ${newContent}`);

    }
  }


  function handleAddTask(content: string) {
    try {
      const value = content.trim();
      if (!value) return;

      const next = [
        { id: crypto.randomUUID(), content: value, createdAt: new Date(), status: "todo" as const },
        ...AllTasks,
      ];
      AddNewTask(next);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  }

  function handleChangeStatus(id: string, status: "todo" | "doing" | "done") {
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

  // application du filtre
  const filteredTasks = AllTasks.filter(task => {
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
          onChange={e => setFilter(e.target.value as "all" | "todo" | "doing" | "done")}
        >
          <option value="all">Toutes</option>
          <option value="todo">à faire</option>
          <option value="doing">en cours</option>
          <option value="done">terminé</option>
        </select>

        <ul className="taskList">
          {filteredTasks.map(task => (
            <li key={task.id}  className="taskItem">
              <span onClick={() => ChangeContent(task.id)}>{task.content}</span>
              <span className={`status ${task.status}`}></span>
              <ChangeStatus task={task} onChange={handleChangeStatus} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}



