import { useEffect, useState } from "react";
import { useTasksStore } from "../../store/useTasksStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export function Tasks () {
  const { user, userData, addTask, deleteTask, updateCheck } = useTasksStore();
  const {isLogin } = useAuthStore((state) => ({
    logout: state.logout,
    isLogin: state.isLogin,
  }));
    const [newTask, setNewTask] = useState('');
    const [newSubTask, setNewSubTask] = useState('');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTask(user?.id, newTask)
    setNewTask('')
  }
  const handleSubmitSubTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTask(user?.id, newTask)
    setNewSubTask('')
  }
  
  return (
    <div>
      {user ? (
        <div>
          <NavBar/>
          <h3>Tasks</h3>
          <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={newTask} 
            placeholder="Tarea nueva..." 
            onChange={(e) => setNewTask(e.target.value)} 
            required/>
          <button onClick={() => {}}>+</button>
          </form>
          <ul>
            {user.tasks.map((task) => (
              <div key={task.id}>
              <li style={{ display: 'flex'}} key={task._id}>
                <h4 style={task.check ?{ color:'green'} :{ color:'white'} }>{task.title} </h4>
                <h2 onClick={() => updateCheck(user?.id, task.id)}>✔️</h2>
                <h2 onClick={() => deleteTask(user?.id, task.id)}>x</h2>
              </li>
              <div>

                {/* --------------------FORM AGREGAR NUEVEA SUB TASK-------------------- */}
              <form onSubmit={handleSubmitSubTask}>
              <input 
                type="text" 
                value={newSubTask} 
                placeholder="Tarea nueva..." 
                onChange={(e) => setNewSubTask(e.target.value)} 
                required/>
              <button onClick={() => {}}>+</button>
              </form>
                {task.subTasks?.map((subTask) => (
                  <div key={subTask.id}>
                   <li style={{ display: 'flex'}} key={task._id}>
                <h6 style={subTask.subTaskCheck ?{ color:'green'} :{ color:'aqua'} }>{subTask.title} </h6>
                <h4 >✔️</h4>
                <h4 >x</h4>
              </li>
                  </div>
                ))}
              </div>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}