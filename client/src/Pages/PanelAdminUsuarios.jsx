import React, {useState, useContext, useEffect} from 'react'
import Navbar from '../Componentes/Navbar'
import LogoBar from '../Componentes/LogoBar'
import './css/PanelAdmin.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'
import CuadroUsuarioPanelAdmin from '../Componentes/CuadroUsuarioPanelAdmin'
import Footer from '../Componentes/Footer'



const PanelAdminUsuarios = () => {

    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({
      usuario: '',
      email: '',
      password: '',
      rol: '',
      nombre_completo: '',
      ciudad: '',
    });
    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdminEquipos = () => {
        navigate("/panel-admin/equipos")
    }
    const handleAdminPartidos = () => {
        navigate("/panel-admin/partidos")
    }
    const handleAdminCampeonatos = () => {
        navigate("/panel-admin/campeonatos")
    }

    // Verificar si el usuario es administrador
  useEffect(() => {
    if (!isAuthenticated || user.rol !== 9) {
      navigate('/'); // Redireccionar si no es administrador
    }
  }, [isAuthenticated, user, navigate]);

  // Obtener la lista de usuarios
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios', {
          withCredentials: true,
        });
        setUsuarios(response.data);
      } catch (err) {
        console.error('Error obteniendo los usuarios:', err);
        console.error('Respuesta del servidor:', err.response); // Imprimir la respuesta del servidor
      }
    };

    obtenerUsuarios();
  }, []);

    // Obtener los datos del usuario
    useEffect(() => {
        const obtenerUsuario = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`, {
              withCredentials: true,
            });
            setUsuario(response.data);
          } catch (err) {
            console.error('Error obteniendo el usuario:', err);
          }
        };
    
        obtenerUsuario();
      }, [id]);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await axios.put(`http://localhost:5000/api/usuarios/${id}`, usuario, {
            withCredentials: true,
          });
          navigate('/panel-admin/usuarios'); // Redireccionar al panel de administración
        } catch (err) {
          console.error('Error actualizando el usuario:', err);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
      };
    

  return (
    <div className='contenedor-vista-admin'>
        <LogoBar/>
        <Navbar/>

        <div className='contenedor-cuerpo-admin'>
            <div className='header-vista-admin'>
                <h1>Panel Admin</h1>
            </div>
            <div className="cuerpo-vista-admin">
                <div className="nav-admin">
                    <ul>
                        <li>Usuarios</li>
                        <li onClick={handleAdminEquipos}>Equipos</li>
                        <li onClick={handleAdminPartidos}>Partidos</li>
                        <li onClick={handleAdminCampeonatos}>Torneos</li>
                    </ul>
                </div>
            </div>
            <div className="usuarios-vista-admin">
                <div className="usuarios-vista-admin-header">
                    <h3>Usuarios</h3>
                </div>


                {/* Aquí debería ir el Formulario para alterar datos de usuarios */}
                <div className='contenedor-form-panel-admin'>
                    <form  onSubmit={handleSubmit}>

                        <div className="col-form-panel-admin">
                            <div className='fila-form-panel-admin-uno'>
                                <label >Usuario</label>
                                <input
                                type="text"
                                name="usuario"
                                className='input-form-panel-admin'
                                value={usuario.usuario}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='fila-form-panel-admin-dos'>
                                <label >E-mail</label>
                                <input type="email"
                                className='input-form-panel-admin'
                                name="email"
                                value={usuario.email}
                                onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-form-panel-admin">
                            <div className='fila-form-panel-admin-uno'>
                                <label >Contraseña</label>
                                <input type="password" 
                                className='input-form-panel-admin'
                                name="password"
                                value={usuario.password}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='fila-form-panel-admin-dos'>
                                <label >Rol</label>
                                <input type="text"
                                className='input-form-panel-admin'
                                name="rol"
                                value={usuario.rol}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-form-panel-admin">
                            <div className='fila-form-panel-admin-uno'>
                                <label >Nombre Completo</label>
                                <input type="text"
                                name="nombre_completo"
                                className='input-form-panel-admin'
                                value={usuario.nombre_completo}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='fila-form-panel-admin-dos'>
                                <label >Ciudad</label>
                                <input type="text"
                                className='input-form-panel-admin'
                                name="ciudad"
                                value={usuario.ciudad}
                                onChange={handleChange}
                                />
                            </div>
                        </div>


                        <div className='btm-submit-form-panel-admin'>

                            <input type="submit" className='btn-panel-admin'/>

                            {!usuario ? (
                              <input type="submit" value="Eliminar" className='btn-panel-admin'/>
                            ): (
                              <></>
                            )}



                        </div>

                    </form>

                    <hr />
                </div>
                {/* Fin Formulario Panel Admin */}


                <div className="lista-usuarios">
                    {/* Aquí cargar la lista de usuarios */}
                    {usuarios.map((usuario) => (
                        <CuadroUsuarioPanelAdmin
                        key={usuario.id} // Usar el ID como clave única
                        usuario={usuario} // Pasar los datos del usuario como prop
                        />
                    ))}
                    {/* Fin Cuadro Usuario en Lista Admin */}
                    

                </div>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

export default PanelAdminUsuarios