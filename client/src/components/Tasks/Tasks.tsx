import { useEffect, useState } from "react";
import { useTasksStore } from "../../store/useTasksStore";

export function Tasks () {
  const { user, userData, addTask, deleteTask } = useTasksStore();
    const [newTask, setNewTask] = useState('');

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
  
  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
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
              <li key={task._id}>
                {task.title} - {task.check ? 'Completed' : 'Pending'}
                <button onClick={() => deleteTask(user?.id, task.id)}>x</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}