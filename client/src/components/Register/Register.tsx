import { useEffect, useState } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useNavigate } from "react-router-dom"

const Register: React.FC =  () =>  {
  const { register, isLogin } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const email = window.localStorage.getItem('email')
    if (email || isLogin) {
      navigate('/dashboard'); 
    }
  }, [isLogin, navigate])
  const [datosRegistro, setDatosRegistro] = useState({
  name : '',
  lastName: '',
  email: '',
  password: ''
})

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register(datosRegistro)
    navigate('/login')
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
        <button type="submit">Register</button>

      </form>
    </div>
  )
}

export default Register