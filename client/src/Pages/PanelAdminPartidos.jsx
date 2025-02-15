import React from 'react'
import Navbar from '../Componentes/Navbar'
import LogoBar from '../Componentes/LogoBar'
import './css/PanelAdmin.css'
import FotoPerfilDefault from '../Media/user-logo.png'
import { useNavigate } from 'react-router-dom'
import Footer from '../Componentes/Footer'

const PanelAdminPartidos = () => {

    const navigate = useNavigate();

    const handleAdminUsuarios = () => {
        navigate("/panel-admin/usuarios")
    }
    const handleAdminEquipos = () => {
        navigate("/panel-admin/equipos")
    }
    const handleAdminCampeonatos = () => {
        navigate("/panel-admin/campeonatos")
    }

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
                        <li onClick={handleAdminUsuarios}>Usuarios</li>
                        <li onClick={handleAdminEquipos}>Equipos</li>
                        <li>Partidos</li>
                        <li onClick={handleAdminCampeonatos}>Torneos</li>
                    </ul>
                </div>
            </div>
            <div className="usuarios-vista-admin">
                <div className="usuarios-vista-admin-header">
                    <h3>Partidos</h3>
                </div>

                <div className="lista-usuarios">
                    {/* Aquí cargar la lista de usuarios en una tabla con sus datos */}
                    {/* <CuadroUsuarioPanelAdmin /> */}
                    <div className="cuadro-usuario-lista">
                        <div className='cuadro-usuario-lista-izq'>
                            <div className='foto-perfil-cuadro-usuario'>
                                <img src={FotoPerfilDefault} alt="" />
                            </div>
                            <div>
                                <h3>Nombre Completo</h3>
                                <h4>Ciudad</h4>
                                <h5>Administrador</h5>
                            </div>
                        </div>
                        <div className="cuadro-usuario-lista-der">
                            <h5>Editar Perfil</h5>
                        </div>
                    </div>
                    {/* Fin Cuadro Usuario en Lista Admin */}

                    <div className="cuadro-usuario-lista">
                        <div className='cuadro-usuario-lista-izq'>
                            <div className='foto-perfil-cuadro-usuario'>
                                <img src={FotoPerfilDefault} alt="" />
                            </div>
                            <div>
                                <h3>Nombre Completo</h3>
                                <h4>Ciudad</h4>
                                <h5>Usuario</h5>
                            </div>
                        </div>
                        <div className="cuadro-usuario-lista-der">
                            <h5>Editar Perfil</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

export default PanelAdminPartidos