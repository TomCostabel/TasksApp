import { SubTaskItemProps } from '../../types/types';
import './SubTaskItem.css';

const SubTaskItem = ({ subTask, taskId, userId, updateCheckSubTask, deleteSubTask }: SubTaskItemProps) => {
  return (
    <li className='subTasks' >
      <h6 style={{color: subTask.subTaskCheck ? '#ff6600' : 'white', textDecoration: subTask.subTaskCheck ?'line-through' : 'none' , fontSize:'13px', width:'380px', fontWeight:'500'
      }}>- {subTask.title}</h6>
      <div className='container-subtask-check-delete'>
        <h6 className='button-checkSubTask' onClick={() => updateCheckSubTask(userId, taskId, subTask.id)}>✓</h6>
        <h6 className='button-deleteSubTask' onClick={() => deleteSubTask(userId, taskId, subTask.id)}>✗</h6>
      </div>
    </li>
  );
};

export default SubTaskItem;