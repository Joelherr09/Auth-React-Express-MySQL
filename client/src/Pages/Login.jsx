import React, {useState, useContext} from 'react'
import Navbar from '../Componentes/Navbar'
import axios from 'axios'
import './css/Login.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import LogoBar from '../Componentes/LogoBar'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
  
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
        <LogoBar/>
        <Navbar/>
        <div className='cuerpo-vista-login'>
            <div className='vista-login-header'>
                <h1>Inicia Sesión</h1>
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
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login