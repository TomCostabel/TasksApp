import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore'; // Ajusta la ruta según tu estructura
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLogin } = useAuthStore((state) => ({
    login: state.login,
    error: state.error,
    isLogin: state.isLogin,
  }));
 
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.localStorage.setItem('email', email)
    await login(email, password);
  };

  // Redirige al usuario si está autenticado
  useEffect(() => {
    if (isLogin) {
      navigate('/dashboard'); // Ajusta la ruta de redirección según tu aplicación
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
