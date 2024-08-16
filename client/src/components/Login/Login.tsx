import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore'; 
import { useNavigate } from 'react-router-dom'; 

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

  useEffect(() => {
    if (isLogin) {
      navigate('/dashboard'); 
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
