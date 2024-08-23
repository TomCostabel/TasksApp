import { TaskItemProps } from "../../types/types";
import SubTaskItem from "../SubTaskItem/SubTaskItem";

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