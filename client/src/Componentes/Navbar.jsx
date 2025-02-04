import React, {useContext} from 'react'
import './css/Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }
    const handleLoginClick = () =>{
        navigate('/login');
    }
    const handleRegisterClick = () => {
        navigate('/register');
    }
    const handlePartidosClick = () => {
        navigate('/partidos');
    }
    const handleCampeonatosClick = () => {
        navigate('/campeonatos');
    }
    const handleEquiposClick = () => {
        navigate('/equipos');
    }
    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
          setIsAuthenticated(false); // Actualizar el estado de autenticación
          navigate('/'); // Redireccionar a la página principal
        } catch (err) {
          console.error('Error en el logout:', err);
        }
      };

  return (
    <div className='navbar-padre'>
        <div onClick={handleHomeClick}>
            <h1>Inicio</h1>
        </div>
        <div>
            <ul className='links-navbar'>
                <li onClick={handlePartidosClick}>Partidos</li>
                <li onClick={handleCampeonatosClick}>Campeonatos</li>
                <li onClick={handleEquiposClick}>Equipos</li>
            </ul>
        </div>
        <div>
            <ul className='links-auth'>
                {isAuthenticated ? (
                    <li className='auth-hover-nav' onClick={handleLogout}>Cerrar Sesión</li>
                ) : (
                    <><li className='auth-hover-nav' onClick={handleLoginClick}>Iniciar Sesión</li><li className='auth-hover-nav' onClick={handleRegisterClick}>Registrarse</li></>
                    
                )}


            </ul>
        </div>
    </div>
  )
}

export default Navbar