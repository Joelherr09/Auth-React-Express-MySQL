import React, {useState} from 'react'
import Navbar from '../Componentes/Navbar'
import LogoBar from '../Componentes/LogoBar'
import './css/CambiarClave.css'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const CambiarClave = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [nuevaClave, setNuevaClave] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

     // Obtener el token temporal de la URL
    const token = new URLSearchParams(location.search).get('token');

    const handleSoporteClick = () =>{
        navigate("/contacto");
    }

    const handleSubmit = async (e) => { // Marcar la función como async
      e.preventDefault();
  
      if (!nuevaClave) {
        setError('Por favor, ingresa una nueva contraseña.');
        return;
      }
  
      try {
        const endpoint = token ? '/api/cambiar-clave-temp' : '/api/cambiar-clave';
        const data = token ? { nuevaClave, token } : { nuevaClave };
  
        const response = await axios.post(
          `http://localhost:5000${endpoint}`,
          data,
          { withCredentials: !token } // Enviar cookies solo si no hay token temporal
        );
  
        setMensaje(response.data.mensaje);
        setError('');
        setNuevaClave('');
        navigate('/login'); // Redirigir al usuario al login
      } catch (error) {
        setError(error.response?.data?.mensaje || 'Error al cambiar la contraseña');
        setMensaje('');
      }
    };

  return (
    <div>
        <Navbar/>
        <LogoBar/>

        <div className='contenedor-vista-cambiar-clave'>
            <div className="header-vista-cambiar-clave">
                <h1>Cambiar Contraseña</h1>
            </div>
            <div className="cuerpo-vista-cambiar-clave">
                <form onSubmit={handleSubmit}>
                    <div className="input-cambiar-clave">
                        <label >Ingresa la contraseña nueva</label>
                        <input type="password"
                        value={nuevaClave}
                        onChange={(e) => setNuevaClave(e.target.value)}
                        />
                    </div>

                    <div className='contenedor-btn-submit-cambiar-clave'>
                        <input type="submit" className='btn-submit-cambiar-clave' value="Cambiar contraseña" />
                    </div>
                </form>

                {mensaje && <p className="mensaje-exito">{mensaje}</p>}
                {error && <p className="mensaje-error">{error}</p>}

            </div>
            <div className="footer-vista-cambiar-clave">
                <p>¿Necesitas ayuda?</p>
                <h6 onClick={handleSoporteClick} className='btn-contacto' >Contacta a soporte</h6>
            </div>
        </div>

    </div>
  )
}

export default CambiarClave