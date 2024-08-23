//--------------------------------------Store------------------------------------------------------------//
export interface SubTask {
  title: string;
  subTaskCheck: boolean;
  id: string;
  _id: string;
}
export interface Task {
  title: string;
  check: boolean;
  id: string;
  _id: string;
  subTasks: SubTask[]
}

export interface User {
  id: string;
  email: string;
  name: string;
  tasks: Task[];
}

export interface tasksState {
  user: User | null;
  userData: (email: string) => Promise<void>;
  addTask: (id: string | undefined, title: string) => Promise<void>;
  deleteTask: (userId: string | undefined, taskId: string) => Promise<void>;
  updateCheck: (taskId: string, userId: string) => Promise<void>;
  addSubTask: (taskId: string, userId: string, title: string) => Promise<void>;
  deleteSubTask: (userId: string, taskId: string, subTaskId: string) => Promise<void>;
  updateCheckSubTask: (userId: string, taskId: string, subTaskId: string) => Promise<void>
}
//------------------------------------------TaskItem--------------------------------------------------------//
export type TaskItemProps = {
  task: Task;
  userId: string;
  newSubTask: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => void;
  handleSubmitSubTask: (e: React.FormEvent<HTMLFormElement>, taskId: string) => void;
  updateCheck: (userId: string, taskId: string) => void;
  deleteTask: (userId: string, taskId: string) => void;
  updateCheckSubTask: (userId: string, taskId: string, subTaskId: string) => void;
  deleteSubTask: (userId: string, taskId: string, subTaskId: string) => void;
};
//--------------------------------------SubTaskItem------------------------------------------------------------//

export type SubTaskItemProps = {
  subTask: SubTask;
  taskId: string;
  userId: string;
  updateCheckSubTask: (userId: string, taskId: string, subTaskId: string) => void;
  deleteSubTask: (userId: string, taskId: string, subTaskId: string) => void;
};