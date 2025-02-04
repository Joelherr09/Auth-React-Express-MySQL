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
    const { setIsAuthenticated } = useContext(AuthContext);
  
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
            navigate('/'); // Redireccionar a la página principal
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
                <h1>Inicia Sesión</h1>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-login">
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