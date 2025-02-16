import React, {useContext} from 'react'
import './css/Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import PartidosIcon from '@mui/icons-material/SportsVolleyball';
import TorneoIcon from '@mui/icons-material/EmojiEvents';
import EquiposIcon from '@mui/icons-material/Groups';
import PerfilIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }
    const handleLoginClick = () =>{
        navigate('/login');
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

      

  return (
    <div className='navbar-padre'>
        <div className='contenedor-links-navbar'>
            <h2 className='LogoWeb'  onClick={handleHomeClick}>cuartavoleibol</h2>
            <ul className='links-navbar'>
                <li  onClick={handleHomeClick}><HomeIcon sx={{ fontSize: 40, justifySelf: 'center' }} className='btn-navbar'/><p className='text-btn-navbar'>Inicio</p></li>
                <li onClick={handlePartidosClick}><PartidosIcon sx={{fontSize:40}} className='btn-navbar'/><p className='text-btn-navbar'>Partidos</p></li>
                <li onClick={handleCampeonatosClick}><TorneoIcon sx={{fontSize:40}} className='btn-navbar'/><p className='text-btn-navbar'>Torneos</p></li>
                <li onClick={handleEquiposClick}><EquiposIcon sx={{fontSize:40}} className='btn-navbar'/><p className='text-btn-navbar'>Equipos</p></li>
                {isAuthenticated ? (
                    <>
                    <li onClick={handlePerfilClick}><PerfilIcon sx={{fontSize:40}} className='btn-navbar'/><p className='text-btn-navbar'>Perfil</p></li>
                    </>
                ) : (
                    <>
                        <div className='links-navbar'>
                        <li onClick={handleLoginClick}><PerfilIcon sx={{fontSize:40}} className='btn-navbar'/><p className='text-btn-navbar'>Iniciar Sesión</p></li>
                        </div>
                    </>
                    
                )}
            </ul>
        </div>
    </div>
  )
}

export default Navbar