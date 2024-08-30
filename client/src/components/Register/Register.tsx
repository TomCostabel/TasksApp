import { useEffect, useState } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import './Register.css'

const Register: React.FC =  () =>  {
  const { register, isLogin } = useAuthStore()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [datosRegistro, setDatosRegistro] = useState({
  name : '',
  lastName: '',
  email: '',
  password: '',
  verificacionPassword: ''
})

  useEffect(() => {
    const email = window.localStorage.getItem('email')
    if (email || isLogin) {
      navigate('/dashboard'); 
    }
  }, [isLogin, navigate])

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(datosRegistro.password !== datosRegistro.verificacionPassword) {
      setError('Las contraseñas no coinciden')
      throw new Error('Las contraseñas no coinciden')
    }
    setError('')
    register(datosRegistro)
    navigate('/')
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
      <h1 style={{color:'white', height:'50px',fontSize:'35px', display:'flex', alignItems:'end'}}><img src='https://icones.pro/wp-content/uploads/2022/07/symbole-d-eclair-orange.png' style={{width:'45px', marginTop:'20px', display:'flex', alignItems:'center'}}/>BLITZ<span style={{fontSize:'10px', fontWeight:'100', margin:'7px'}}>REGISTRO</span></h1>
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
            id="verificacionPassword"
            value={datosRegistro.verificacionPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error ? <h5 className="error-register" >Las contraseñas no coinciden</h5>: null }
        <button className="button-register" type="submit">Registrarme</button>

      </form>
    </div>
  )
}

export default Register