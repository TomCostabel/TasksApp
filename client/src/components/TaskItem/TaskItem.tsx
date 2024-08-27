import { TaskItemProps } from "../../types/types";
import SubTaskItem from "../SubTaskItem/SubTaskItem";
import './TaskItem.css'


const TaskItem = ({ task, userId, newSubTask, handleChange, handleSubmitSubTask, updateCheck, deleteTask, updateCheckSubTask, deleteSubTask }: TaskItemProps) => {

  
  return (
    <div className="container-principal-taskItem" >
      <div>
        <li className="tarea"  key={task._id}>
          <h4  style={task.check ? { color: '#6dce13' } : { color: 'white' }}>{task.title}</h4>
          <div className="container-check-delete">
            <h5 className="button-check"  onClick={() => updateCheck(userId, task.id)}>✓</h5>
            <h5 className="button-delete" onClick={() => deleteTask(userId, task.id)}>✗</h5>
          </div>
        </li>
        <div >
          <form className="form-subTarea"  onSubmit={(e) => handleSubmitSubTask(e, task.id)}>
            <input 
            className="input-subTarea"
            type="text" 
            value={newSubTask} 
            placeholder="SubTarea nueva..." 
            onChange={(e) => handleChange(e, task.id)} 
            required />
            <button className="button-subTarea">+</button>
            <span className="input-border-subTarea"></span>
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
    </div>
  );
};

export default TaskItem