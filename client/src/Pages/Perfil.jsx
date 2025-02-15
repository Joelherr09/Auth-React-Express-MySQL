import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/Navbar';
import { AuthContext } from '../Context/AuthContext';
import './css/Perfil.css';
import FotoPerfilDefault from '../Media/user-logo.png'
import LogoBar from '../Componentes/LogoBar';
import Footer from '../Componentes/Footer';

const Perfil = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const { isAuthenticated, user } = useContext(AuthContext); // Obtener el estado de autenticación y el usuario logueado
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/perfil/${id}`);
        setPerfil(response.data);
      } catch (err) {
        setError('Error cargando el perfil');
        console.error('Error obteniendo el perfil:', err);
      }
    };

    obtenerPerfil();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!perfil) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <LogoBar />
      <Navbar />
      <div className="perfil-container">
        <div className="perfil-header">

          {/* Foto de Perfil y Usuario */}

          <div className='contenedor-foto-perfil'>
            <div className='cuadro-foto-perfil'>
              {perfil.foto_perfil ? (<img src={`http://localhost:5000${perfil.foto_perfil}`} alt="Foto de perfil" className='foto-perfil' />) : (<img src={FotoPerfilDefault} alt="Foto de perfil" className='foto-perfil' />)}
            </div>
          </div>
          <div className='nombre-perfil'>
            <div>
              <h1>{perfil.usuario}</h1>
              <p><strong>Nombre:</strong> {perfil.nombre_completo}</p>
              <p><strong>Ciudad:</strong> {perfil.ciudad}</p>
              <p className='bio-perfil'>{perfil.bio}</p>
            </div>
            <div>
                        {/* Mostrar el botón solo si el usuario logueado es el dueño del perfil */}
              {isAuthenticated && user && user.id === parseInt(id) &&  (
                <div>
                  <h3 onClick={() => navigate(`/editar-perfil/${id}`)}>Editar Perfil</h3>
                </div>
              )}
            </div>

          </div>

          {/* Fin Foto de Perfil */}

        </div>

        <hr />
        
      </div>

      <Footer/>
    </div>
  );
};

export default Perfil;