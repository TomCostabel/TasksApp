import { useAuthStore } from "../../store/useAuthStore"
import { useTasksStore } from "../../store/useTasksStore";
import './NavBar.css'
import Swal from "sweetalert2";

const NavBar: React.FC = () => {
  const { user } = useTasksStore();
  const { logout } = useAuthStore((state) => ({
    logout: state.logout
  }))
  
  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "custom-confirm-button custom-button",
    cancelButton: "custom-cancel-button custom-button"
  },
  buttonsStyling: false
});
  return (
    <div className="container-navBar" >
      <div className="container-inf-logout">
        <div className="inf-user">
          <img style={{ width:'auto', borderRadius:'50%', height:'40px',}} src="https://i.pinimg.com/564x/cd/bb/03/cdbb038a2e8fb80179913c6cebdbde26.jpg" /> 
          <h3 className="navBar-name"> {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}</h3>
        </div>
        <div className="conteiner-logout">
          {user ?<span className="logout" onClick={() => {
            swalWithBootstrapButtons.fire({
              title: "¿Está seguro?",
              text: "Estás a punto de cerrar sesión",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Si",
              cancelButtonText: "Cancelar",
              reverseButtons: true
            }).then((result) => {
              if(result.isConfirmed) {
                logout(user?.email);
                swalWithBootstrapButtons.fire('¡Sesión cerrada correctamente!', '', 'success')
              } else {
                swalWithBootstrapButtons.fire('¡Continúas conectado!')
              }
            });
          }}>➥</span> : 'Error 404 NotFound'}
        </div>
      </div>
    </div>
  )
}

export default NavBar
