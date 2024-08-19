import { useAuthStore } from "../../store/useAuthStore"
import { useTasksStore } from "../../store/useTasksStore";

const NavBar: React.FC = () => {
  const { user } = useTasksStore();

  const { logout } = useAuthStore((state) => ({
    logout: state.logout
    
  }))
  
  return (
    <div>
      {user ?<button onClick={() => logout(user?.email)}>Logout</button> : 'Error 404 NotFound'}
    </div>
  )
}

export default NavBar
