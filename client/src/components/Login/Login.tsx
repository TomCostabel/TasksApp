import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore'; 
import { useNavigate } from 'react-router-dom'; 
import './Login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [activatedError, setActivatedError] = useState(false);


  const { login,errorLogin, isLogin } = useAuthStore((state) => ({
    login: state.login,
    errorLogin: state.errorLogin,
    isLogin: state.isLogin,
  }));
 
 
  const navigate = useNavigate();
  
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await login(email, password)
  //   if(!errorLogin) {
  //     setError('');
  //     setActivatedError(false)
  //     window.localStorage.setItem('email', email)
  //      navigate('/dashboard'); 
  //   }
  //   setActivatedError(true)
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await login(email, password);

  // En lugar de redirigir aquí, espera al efecto que escucha cambios en isLogin
};

  useEffect(() => {
  if (isLogin) {
    // Limpiamos cualquier error y redirigimos al dashboard
    setError('');
    window.localStorage.setItem('email', email);
    console.log(window.localStorage.getItem('email'))
    navigate('/dashboard');
  } else if (errorLogin) {
    // Si hay un error, limpiamos el prefijo "Error:" y lo establecemos
    const cleanedError = errorLogin.replace(/^Error:\s*/, '');
    setError(cleanedError);
  }
}, [isLogin, errorLogin, email, navigate]);

useEffect(() => {
  // Si el usuario ha iniciado sesión, limpiamos cualquier error previo
  if (isLogin) {
    setError('');
  }
}, [isLogin]);
  
//   useEffect(() => {
//   if (isLogin && !errorLogin) {
//     navigate('/dashboard');
//   }
// }, [isLogin, errorLogin]);
  // useEffect(() => {
  //   if (errorLogin) {
  //     const cleanedError = errorLogin.replace(/^Error:\s*/, '')
  //     setError(cleanedError);
  //   }
  // }, [errorLogin, setError, activatedError]);

  // useEffect(() => {
  //   setError('');
  // }, [setError, isLogin]);

  return (
    <div className='container-principal-login'>
      <div className='container-logo'>
      <h1 style={{color:'white', height:'50px',fontSize:'35px', display:'flex', alignItems:'end'}}><img src='https://icones.pro/wp-content/uploads/2022/07/symbole-d-eclair-orange.png' style={{width:'45px', marginTop:'20px', display:'flex', alignItems:'center'}}/>BOLT</h1>
      </div>
      <form className='container-formulario' onSubmit={handleSubmit}>
        <div className='container-input'>
          <input
            className='inputs'
            placeholder='Email'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='container-input'>
          <input
            className='inputs'
            placeholder='Contraseña'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button className='button-login' type="submit">Login</button>
      </form>
      <div className='container-reg'>
        <span style={{fontSize:'15px'}}>¿No tenés cuenta?</span>
        <h4 style={{cursor:'pointer', color:'#ff6600', fontSize:'14px', textShadow:'1px 1px 2px #ffffff41'}}  onClick={() => navigate('/register')} >Regístrate</h4>
      </div>
    </div>
  );
};

export default Login;
