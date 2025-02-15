import React, {useContext} from 'react'
import './css/Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import PartidosIcon from '@mui/icons-material/SportsVolleyball';
import TorneoIcon from '@mui/icons-material/EmojiEvents';
import EquiposIcon from '@mui/icons-material/Groups';
import PerfilIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
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
    const handlePerfilClick = () => {
        if (isAuthenticated && user) {
          navigate(`/perfil/${user.id}`); // Redirigir al perfil del usuario logueado
        } else {
          navigate('/login'); // Redirigir al login si no está autenticado
        }
      };
      const handleLogoutClick = () => {
        logout(); // Cerrar sesión
        navigate('/'); // Redirigir a la página principal
      };

      

  return (
    <div className='navbar-padre'>
        <div>
            <ul className='links-navbar'>
                <li  onClick={handleHomeClick}><HomeIcon sx={{ fontSize: 40 }} className='btn-navbar'/></li>
                <li onClick={handlePartidosClick}><PartidosIcon sx={{fontSize:40}} className='btn-navbar'/></li>
                <li onClick={handleCampeonatosClick}><TorneoIcon sx={{fontSize:40}} className='btn-navbar'/></li>
                <li onClick={handleEquiposClick}><EquiposIcon sx={{fontSize:40}} className='btn-navbar'/></li>
                {isAuthenticated ? (
                    <>
                    <li onClick={handlePerfilClick}><PerfilIcon sx={{fontSize:40}} className='btn-navbar'/></li>
                    <li className='btn-navbar' onClick={handleLogoutClick}><LogoutIcon sx={{fontSize:40}} /></li>
                    </>
                ) : (
                    <>
                        <div className='links-auth'>
                            <li className='auth-hover-nav' onClick={handleLoginClick}>Iniciar Sesión</li>
                            <li className='auth-hover-nav' onClick={handleRegisterClick}>Registrarse</li>
                        </div>
                    </>
                    
                )}
            </ul>
        </div>
    </div>
  )
}

export default Navbar