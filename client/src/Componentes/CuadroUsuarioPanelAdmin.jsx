import React, { useContext} from 'react'
import FotoPerfilDefault from '../Media/user-logo.png'
import './css/CuadroUsuarioPanelAdmin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'

const CuadroUsuarioPanelAdmin = ({usuario}) => {

    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);

    const handleEditarClick = () => {
        navigate(`/panel-admin/usuarios/${usuario.id}`); // Redirigir a la URL con el ID del usuario
      };
    
      const handleEliminarClick = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cuenta? Esta acción no se puede deshacer.')) {
          try {
            await axios.delete(`http://localhost:5000/api/usuarios/${usuario.id}`, {
              withCredentials: true, // Enviar cookies automáticamente
            });
      
            // Si el usuario eliminado es el mismo que está logueado, cerrar sesión
            if (usuario.id === parseInt(localStorage.getItem('userId'))) {
              logout(); // Cerrar sesión
              navigate('/'); // Redireccionar a la página principal
            } else {
              // Recargar la página o actualizar la lista de usuarios
              window.location.reload();
            }
          } catch (err) {
            console.error('Error eliminando la cuenta:', err);
          }
        }
      };
    

  return (
    <div>
        <div className="cuadro-usuario-lista">
            <div className='cuadro-usuario-lista-izq'>
                <div className='foto-perfil-cuadro-usuario'>
                {usuario.foto_perfil ? (
          <img
            src={`http://localhost:5000${usuario.foto_perfil}`}
            alt="Foto de perfil actual"
            className="foto-perfil-actual"
          />
        ) : (
          <img
            src={FotoPerfilDefault} // Ruta a la imagen predeterminada
            alt="Foto de perfil predeterminada"
            className="foto-perfil-actual"
          />
        )}
                </div>
                <div>
                    <h3>{usuario.nombre_completo}</h3>
                    <h4>{usuario.ciudad}</h4>
                    <h5>{usuario.rol === 9 ? 'Administrador' : 'Usuario'}</h5>
                </div>
            </div>
            <div className="cuadro-usuario-lista-der">
                <h5 className='hover-btn-cuadro-usuario'  onClick={handleEditarClick}>Editar</h5>
                <h5  className=' hover-btn-cuadro-usuario hover-btn-cuadro-usuario-eliminar' onClick={handleEliminarClick}>Eliminar</h5>

            </div>
        </div>
    </div>
  )
}

export default CuadroUsuarioPanelAdmin