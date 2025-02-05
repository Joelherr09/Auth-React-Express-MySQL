import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/Navbar';
import { AuthContext } from '../Context/AuthContext';
import './css/EditarPerfil.css';
import LogoBar from '../Componentes/LogoBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditarPerfil = () => {
  const { id } = useParams(); // Obtener el ID del perfil desde la URL
  const { isAuthenticated, user, logout } = useContext(AuthContext); // Obtener el estado de autenticación y el usuario logueado
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [bio, setBio] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoActual, setFotoActual] = useState(''); // Estado para la foto actual
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificar si el usuario tiene permisos para editar el perfil
  useEffect(() => {
    if (!isAuthenticated || user.id !== parseInt(id)) {
      navigate('/'); // Redireccionar a la página principal si no tiene permisos
    }
  }, [isAuthenticated, user, id, navigate]);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/perfil/${id}`);
        setNombreCompleto(response.data.nombre_completo || '');
        setCiudad(response.data.ciudad || '');
        setBio(response.data.bio || '');
        setFotoActual(response.data.foto_perfil || ''); // Guardar la foto actual
      } catch (err) {
        setError('Error cargando el perfil');
        console.error('Error obteniendo el perfil:', err);
      }
    };

    obtenerPerfil();
  }, [id]);

  const handleAtrasBoton = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (nombreCompleto) formData.append('nombre_completo', nombreCompleto);
    if (ciudad) formData.append('ciudad', ciudad);
    if (bio) formData.append('bio', bio);
    if (fotoPerfil) formData.append('foto_perfil', fotoPerfil);

    try {
      await axios.put(`http://localhost:5000/api/perfil/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      navigate(`/perfil/${id}`); // Redireccionar al perfil después de guardar los cambios
    } catch (err) {
      setError('Error actualizando el perfil');
      console.error('Error actualizando el perfil:', err);
    }
  };

  const handleEliminarCuenta = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      try {
        await axios.delete(`http://localhost:5000/api/perfil/${id}`, {
          withCredentials: true,
        });
        logout(); // Cerrar sesión
        navigate('/'); // Redireccionar a la página principal
      } catch (err) {
        setError('Error eliminando la cuenta');
        console.error('Error eliminando la cuenta:', err);
      }
    }
  };

  return (
    <div>
      <LogoBar/>
      <Navbar />
      <div className="editar-perfil-container">
        <h3 className='volver-atras' onClick={handleAtrasBoton}><ArrowBackIcon />Volver atrás</h3>
        <h1 className='header-editar-perfil'>Editar Perfil</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className='form-editar-perfil' onSubmit={handleSubmit}>
          <div className='casilla-editar-perfil'>
            <label>Nombre Completo</label>
            <input
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          </div>
          <div className='casilla-editar-perfil'>
            <label>Ciudad</label>
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>
          <div className='casilla-editar-perfil'>
            <label>Biografía</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
            />
          </div>
          <div className='casilla-editar-perfil'>
            <label>Foto de Perfil</label>
            {fotoActual && (
              <img
                src={`http://localhost:5000${fotoActual}`}
                alt="Foto de perfil actual"
                className="foto-perfil-actual"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFotoPerfil(e.target.files[0])}
            />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>


        <button onClick={handleEliminarCuenta} className="eliminar-cuenta-btn">
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default EditarPerfil;