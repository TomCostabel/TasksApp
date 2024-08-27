import { useEffect, useState } from "react";
import { useTasksStore } from "../../store/useTasksStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import TaskItem from "../TaskItem/TaskItem";
import './tasks.css'

type NewSubTasksState = {
  [taskId: string]: string;
};


export function Tasks () {


  

  const { user, userData, addTask, deleteTask, updateCheck, addSubTask, deleteSubTask, updateCheckSubTask } = useTasksStore();
  const {isLogin } = useAuthStore((state) => ({logout: state.logout, isLogin: state.isLogin}));
  const [newSubTask, setNewSubTask] = useState<NewSubTasksState>({});
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, taskId:string)   => {
    setNewSubTask((prevState) => ({
      ...prevState,
      [taskId]: e.target.value
    }));
  };

  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>)  => {
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
    <div >
      <NavBar/>
      {user ? (
        <div  className="container">
          <header className="container-header">
            <h3>Tasks</h3>
            <form className="form"  onSubmit={handleSubmitTask}>
              <input 
              className="input"
                type="text" 
                value={newTask} 
                placeholder="Tarea nueva..." 
                onChange={(e) => setNewTask(e.target.value)} 
                required/>

              <button className="button-tarea">+</button>
              <span className="input-border"></span>
            </form>
          </header>
          { user?.tasks?.map((task) => (
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
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}