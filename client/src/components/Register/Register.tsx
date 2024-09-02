import { useEffect, useState } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import './Register.css'

const Register: React.FC =  () =>  {
  const { register, isLogin, errorRegister } = useAuthStore()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [datosRegistro, setDatosRegistro] = useState({
  name : '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

  useEffect(() => {
    if (errorRegister) {
      const cleanedError = errorRegister.replace(/^Error:\s*/, ''); // Remueve "Error:" al principio de la cadena
      setError(cleanedError);
    }
}, [errorRegister]);

useEffect(() => {
  setError('');
  const email = window.localStorage.getItem('email');
  if (email || isLogin) {
    navigate('/dashboard');
  }
}, [isLogin, navigate, setError]);

 useEffect(() => {
    if (isRegistering && !errorRegister) {
      navigate('/');
    }
  }, [isRegistering, errorRegister, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsRegistering(true)
  await register(datosRegistro);
  setIsRegistering(false)
  
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target
    setDatosRegistro( prevState => ({
      ...prevState, 
      [id]: value
    }))
  }

  return (
    <div className="container-principal-registro">
      <div className='container-logo'>
      <h1 style={{color:'white', height:'50px',fontSize:'35px', display:'flex', alignItems:'end'}}><img src='https://icones.pro/wp-content/uploads/2022/07/symbole-d-eclair-orange.png' style={{width:'45px', marginTop:'20px', display:'flex', alignItems:'center'}}/>BOLT<span style={{fontSize:'10px', fontWeight:'100', margin:'7px'}}>REGISTRO</span></h1>
      </div>
      <form className="container-formulario-register" onSubmit={handleSubmit}>
        <div>
          <input
            className="inputs-register"
            placeholder="Nombre"
            type="text"
            id="name"
            value={datosRegistro.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="inputs-register"
            placeholder="Apellido"
            type="text"
            id="lastName"
            value={datosRegistro.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="inputs-register"
            placeholder="Email"
            type="email"
            id="email"
            value={datosRegistro.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="inputs-register"
            placeholder="Contraseña"
            type="password"
            id="password"
            value={datosRegistro.password}
            onChange={handleChange}
            required
          />
        </div>
         <div>
          <input
            className="inputs-register"
            placeholder="Verificar Contraseña"
            type="password"
            id="confirmPassword"
            value={datosRegistro.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <h5 className="error-register">{error}</h5>}
        <button className="button-register" type="submit">Registrarme</button>
        <div className="container-iniciar">
          <span>¿Ya tenés cuenta?</span>
         <h4 style={{cursor:'pointer', color:'#ff6600', fontSize:'14px', textShadow:'1px 1px 2px #ffffff41'} } onClick={() => navigate('/')}> Iniciar sesión</h4>
        </div>

      </form>
    </div>
  )
}

export default Register