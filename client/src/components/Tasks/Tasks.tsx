import { useEffect, useState } from "react";
import { useTasksStore } from "../../store/useTasksStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


type NewSubTasksState = {
  [taskId: string]: string;
};

export function Tasks () {

  const navigate = useNavigate();
  const [newTask, setNewTask] = useState('');
  const [newSubTask, setNewSubTask] = useState<NewSubTasksState>({});
  const { user, userData, addTask, deleteTask, updateCheck, addSubTask } = useTasksStore();
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
  const handleChange = (e:any, taskId:string) => {
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
    setNewSubTask({})
  }
  
  return (
    <div>
      {user ? (
        <div>
          <NavBar/>
          <h3>Tasks</h3>

          {/* --------------------FORM AGREGAR NUEVA TASK-------------------- */}
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
            {user.tasks.map((task) => (
              <div key={task.id}>
              <li style={{ display: 'flex'}} key={task._id}>
                <h4 style={task.check ?{ color:'green'} :{ color:'white'} }>{task.title} </h4>
                <h2 onClick={() => updateCheck(user?.id, task.id)}>✔️</h2>
                <h2 onClick={() => deleteTask(user?.id, task.id)}>x</h2>
              </li>
              <div>

                {/* --------------------FORM AGREGAR NUEVA SUB TASK-------------------- */}
              <form onSubmit={(e) => handleSubmitSubTask(e, task.id)}>
              <input 
                type="text" 
                value={newSubTask[task.id] || ''} 
                placeholder="SubTarea nueva..." 
                onChange={(e) => handleChange(e, task.id)} 
                required/>
              <button>+</button>
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