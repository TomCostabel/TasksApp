import { TaskItemProps } from "../../types/types";
import SubTaskItem from "../SubTaskItem/SubTaskItem";
import './TaskItem.css'


const TaskItem = ({ task, userId, newSubTask, handleChange, handleSubmitSubTask, updateCheck, deleteTask, updateCheckSubTask, deleteSubTask }: TaskItemProps) => {

  
  return (
    <div className="container-principal-taskItem" >
      <div style={{ width: '400px'}}>
        <li className="tarea"  key={task._id}>
          <h4   style={{color: task.check ? '#ce5813' : 'white', textDecoration: task.check ?'line-through' : 'none', fontSize:'28px', width: '450px'
  }}><span style={{ color:'#ce5813', fontSize:'28px', textDecoration:task.check ? 'none' : 'none'}}>ϟ </span>{task.title}</h4>
          <div className="container-check-delete">
            <h5 className="button-check"  onClick={() => updateCheck(userId, task.id)}>✓</h5>
            <h5 className="button-delete" onClick={() => deleteTask(userId, task.id)}>✗</h5>
          </div>
        </li>
        <div className="container-form-and-subTask" >
          <form className="form-subTarea"  onSubmit={(e) => handleSubmitSubTask(e, task.id)}>
            <input 
            className="input-subTarea"
            maxLength={155}
            disabled={task.check ? true : false}
            type="text" 
            value={newSubTask} 
            placeholder="SubTarea nueva..." 
            onChange={(e) => handleChange(e, task.id)} 
            required />
            <button className="button-subTarea">+</button>
            <span className="input-border-subTarea"></span>
          </form>
          
          { task.subTasks?.map((subTask) => (
            <SubTaskItem
              key={subTask.id}
              subTask={subTask}
              taskId={task.id}
              userId={userId}
              updateCheckSubTask={updateCheckSubTask}
              deleteSubTask={deleteSubTask}
              />
            )) }
          </div>
        </div>
    </div>
  );
};

export default TaskItem