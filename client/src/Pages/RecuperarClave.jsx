import React from 'react'
import LogoBar from '../Componentes/LogoBar'
import Navbar from '../Componentes/Navbar'
import Footer from '../Componentes/Footer'
import './css/RecuperarClave.css'

const RecuperarClave = () => {

  return (
    <div>
        <LogoBar/>
        <Navbar/>

        <div className="contenedor-vista-recuperar-clave">

            <div className="header-vista-recuperar-clave">
                <h1>Recuperar Clave</h1>
                <p>Contacta a Soporte para que te envíen una contraseña temporal y puedas cambiar tu contraseña.</p>
            </div>

            <div className="cuerpo-vista-recuperar-clave">
                <h3>cuartavoleibolsoporte@gmail.com</h3>
            </div>


        </div>

        <Footer/>
    </div>
  )
}

export default RecuperarClave