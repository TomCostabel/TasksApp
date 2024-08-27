import { SubTaskItemProps } from "../../types/types";
import './SubTaskItem.css'

const SubTaskItem = ({ subTask, taskId, userId, updateCheckSubTask, deleteSubTask }: SubTaskItemProps) => {
  return (
    <li style={{ display: 'flex' }}>
      <h6 style={subTask.subTaskCheck ? { color: 'green' } : { color: 'white' }}>{subTask.title}</h6>
      <h6 onClick={() => updateCheckSubTask(userId, taskId, subTask.id)}>✓</h6>
      <h6 onClick={() => deleteSubTask(userId, taskId, subTask.id)}>✗</h6>
    </li>
  );
};


export default SubTaskItem