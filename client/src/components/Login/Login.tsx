import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore'; 
import { useNavigate } from 'react-router-dom'; 
import './Login.css'

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
    await login(email, password);
    window.localStorage.setItem('email', email)
  };


  useEffect(() => {
    const email = window.localStorage.getItem('email')
    if (email) {
      navigate('/dashboard'); 
    }
  }, [isLogin, navigate]);

  return (
    <div className='container-principal'>
      <h1>Login</h1>
      <form className='container-formulario' onSubmit={handleSubmit}>
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
      <div>
        <h6>No tenes cuenta ?</h6>
        <button onClick={() => navigate('register')} >Registrate</button>
      </div>
    </div>
  );
};

export default Login;
