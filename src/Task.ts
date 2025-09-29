export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string; 
  content: string;
  createdAt: Date;
  completedAt?: Date;
  status: TaskStatus;
}
