import { SubTask } from "../../store/useTasksStore";

type SubTaskItemProps = {
  subTask: SubTask; //----> arreglar
  taskId: string;
  userId: string;
  updateCheckSubTask: (userId: string, taskId: string, subTaskId: string) => void;
  deleteSubTask: (userId: string, taskId: string, subTaskId: string) => void;
};

const SubTaskItem = ({ subTask, taskId, userId, updateCheckSubTask, deleteSubTask }: SubTaskItemProps) => {
  return (
    <li style={{ display: 'flex' }}>
      <h6 style={subTask.subTaskCheck ? { color: 'green' } : { color: 'aqua' }}>{subTask.title}</h6>
      <h4 onClick={() => updateCheckSubTask(userId, taskId, subTask.id)}>✔️</h4>
      <h4 onClick={() => deleteSubTask(userId, taskId, subTask.id)}>x</h4>
    </li>
  );
};

export default SubTaskItem