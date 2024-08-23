import { useEffect, useState } from "react";
import { useTasksStore } from "../../store/useTasksStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import TaskItem from "../TaskItem/TaskItem";


type NewSubTasksState = {
  [taskId: string]: string;
};

export function Tasks () {

  const navigate = useNavigate();
  const [newTask, setNewTask] = useState('');
  const [newSubTask, setNewSubTask] = useState<NewSubTasksState>({});
  const { user, userData, addTask, deleteTask, updateCheck, addSubTask, deleteSubTask, updateCheckSubTask } = useTasksStore();
  const {isLogin } = useAuthStore((state) => ({logout: state.logout, isLogin: state.isLogin}));

  useEffect(() => {
  if (!isLogin) {
    window.localStorage.removeItem('email')
    navigate('/'); 
  }
  }, [isLogin, navigate]);

  useEffect(() => {
      const emailStorage = localStorage.getItem('email');
      if (emailStorage) {
        userData(emailStorage);
      }
  }, [userData]);
  
  // ------------Actualiza solo la sub-tarea correspondiente al taskId------------>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, taskId:string) => {
    setNewSubTask((prevState) => ({
      ...prevState,
      [taskId]: e.target.value
    }));
  };

  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTask(user?.id, newTask)
    setNewTask('')
  }
  const handleSubmitSubTask = async (e: React.FormEvent<HTMLFormElement>, taskId: string) => {
    e.preventDefault()
    const subTask = newSubTask[taskId]
    if (!subTask) return;
    if (!user || !taskId) return;
    await addSubTask(user?.id, taskId, subTask)
    setNewSubTask(prev => ({
    ...prev,
    [taskId]: ''
  }))
  }
  
  
  return (
    <div>
      {user ? (
        <div>
          <NavBar/>
          <h3>Tasks</h3>
          <form onSubmit={handleSubmitTask}>
          <input 
            type="text" 
            value={newTask} 
            placeholder="Tarea nueva..." 
            onChange={(e) => setNewTask(e.target.value)} 
            required/>
          <button >+</button>
          </form>
          <ul>
          {user.tasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                userId={user.id}
                newSubTask={newSubTask[task.id] || ''}
                handleChange={handleChange}
                handleSubmitSubTask={handleSubmitSubTask}
                updateCheck={updateCheck}
                deleteTask={deleteTask}
                updateCheckSubTask={updateCheckSubTask}
                deleteSubTask={deleteSubTask}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}