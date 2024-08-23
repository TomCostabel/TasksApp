import { Task } from "../../store/useTasksStore";
import SubTaskItem from "../SubTaskItem/SubTaskItem";

type TaskItemProps = {
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

const TaskItem = ({ task, userId, newSubTask, handleChange, handleSubmitSubTask, updateCheck, deleteTask, updateCheckSubTask, deleteSubTask }: TaskItemProps) => {
  return (
    <div>
      <li style={{ display: 'flex' }} key={task._id}>
        <h4 style={task.check ? { color: 'green' } : { color: 'white' }}>{task.title}</h4>
        <h2 onClick={() => updateCheck(userId, task.id)}>✔️</h2>
        <h2 onClick={() => deleteTask(userId, task.id)}>x</h2>
      </li>
      <div>
        <form onSubmit={(e) => handleSubmitSubTask(e, task.id)}>
          <input 
            type="text" 
            value={newSubTask} 
            placeholder="SubTarea nueva..." 
            onChange={(e) => handleChange(e, task.id)} 
            required />
          <button>+</button>
        </form>
        {task.subTasks?.map((subTask) => (
          <SubTaskItem
            key={subTask.id}
            subTask={subTask}
            taskId={task.id}
            userId={userId}
            updateCheckSubTask={updateCheckSubTask}
            deleteSubTask={deleteSubTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskItem