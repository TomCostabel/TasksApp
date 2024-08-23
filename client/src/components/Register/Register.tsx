import { useEffect, useState } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useNavigate } from "react-router-dom"

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
    <div>
      <h1>register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Nombre:</label>
          <input
            type="text"
            id="name"
            value={datosRegistro.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            value={datosRegistro.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={datosRegistro.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={datosRegistro.password}
            onChange={handleChange}
            required
          />
        </div>
         <div>
          <label htmlFor="password">Verificar Contraseña:</label>
          <input
            type="password"
            id="verificacionPassword"
            value={datosRegistro.verificacionPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error ? <h5 style={{color: 'red'}}>Las contraseñas no coinciden</h5>: null }
        <button type="submit">Register</button>

      </form>
    </div>
  )
}

export default Register