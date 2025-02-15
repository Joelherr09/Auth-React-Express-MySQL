import React, {useState, useContext} from 'react'
import Navbar from '../Componentes/Navbar'
import axios from 'axios'
import './css/Login.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useContext(AuthContext);


    const handleRegistrarCuenta = () => {
      navigate("/register")
    }
    const handleRecuperarClave = () => {
      navigate("/recuperar-clave")
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            'http://localhost:5000/api/login',
            { email, password },
            { withCredentials: true }
          );
    
          if (response.data.message === 'Login exitoso') {
            setIsAuthenticated(true); // Actualizar el estado de autenticación
            setUser(response.data.user); // Actualizar el objeto user
            navigate(`/perfil/${response.data.user.id}`); // Redirigir al perfil del usuario
          }
        } catch (err) {
          setError('Email o contraseña incorrectos');
          console.error('Error en el login:', err);
        }
      };

  return (
    <div>
        <Navbar/>
        <div className='cuerpo-vista-login'>
            <div className='vista-login-header'>
                <h1>cuartavoleibol</h1>
            </div>
            
            <div className="form-login">
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <form  onSubmit={handleSubmit}>
                    <div className='casilla-login'>
                        <label>E-mail</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    </div>
                    <div className='casilla-login'>
                        <label>Contraseña</label>
                        <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
                    </div>
                    <div>
                        <input className='btn-entrar' value="Iniciar Sesión" type="submit" />
                    </div>
                </form>

            </div>

            <div className='footer-form-login'>
              <p>¿Olvidaste tu contraseña?</p>
              <h6 className='btn-registrate-vista-login' onClick={handleRecuperarClave}>Recupera tu contraseña</h6>
            </div>

        </div>
        <div className="footer-vista-login">
          <p>¿No tienes cuenta?</p>
          <h4 className='btn-registrate-vista-login' onClick={handleRegistrarCuenta} >Regístrate</h4>
        </div>
    </div>
  )
}

export default Login