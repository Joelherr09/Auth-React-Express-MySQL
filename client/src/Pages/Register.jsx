import React, { useState } from 'react';
import Navbar from '../Componentes/Navbar';
import './css/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Enviar los datos al backend
          const response = await axios.post('http://localhost:5000/api/register', {
            usuario,
            email,
            password,
          });
    
          // Si el registro es exitoso, redireccionar al usuario
          if (response.data.message === 'Usuario registrado exitosamente') {
            navigate('/login'); // Redireccionar a la página de login
          }
        } catch (err) {
          // Manejar errores
          setError(err.response?.data?.error || 'Error en el registro');
          console.error('Error en el registro:', err);
        }
      };

  return (
    <div>
        <Navbar/>
        <div className='cuerpo-vista-register'>
            <div className='vista-register-header'>
                <h1>Registro</h1>
            </div>
        </div>

        <div className="form-register">
        {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} >
                <div className="casilla-register">
                    <label>Usuario</label>
                    <input type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required />
                </div>
                <div className="casilla-register">
                    <label>E-mail</label>
                    <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
                </div>
                <div className="casilla-register">
                    <label>Contraseña</label>
                    <input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
                </div>
                <div>
                    <input type="submit"  value="Registrarse" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register