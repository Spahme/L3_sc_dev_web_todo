import { v4 as uuidv4 } from "uuid";
import type { Task } from "./Task";

export const tasksCollection: Task[] = [
  {
    id: uuidv4(),
    content: "Install VS Code, Bun et Git",
    createdAt: new Date(),
    status: "done",
    completedAt: new Date(),
  },
  {
    id: uuidv4(),
    content: "Apprendre TypeScript",
    createdAt: new Date(),
    status: "doing",
  },
  {
    id: uuidv4(),
    content: "Apprendre React",
    createdAt: new Date(),
    status: "doing",
  },
  {
    id: uuidv4(),
    content: "Faire mon TD Todo List",
    createdAt: new Date(),
    status: "doing",
  },
  {
    id: uuidv4(),
    content: "Saire mon prenom dans le fichier README.md",
    createdAt: new Date(),
    status: "todo",
  },
];
