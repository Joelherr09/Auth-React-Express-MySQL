import React from 'react'
import LogoBar from '../Componentes/LogoBar'
import Navbar from '../Componentes/Navbar'
import Footer from '../Componentes/Footer'
import './css/VistaContacto.css'

const VistaContacto = () => {
  return (
    <div>
        <LogoBar/>
        <Navbar/>

        <div className='contenedor-contacto'>
            <div className="header-contacto">
              <h1>Nosotros</h1>
            </div>

            <div className="cuerpo-contacto">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quaerat natus ipsam quisquam repellendus voluptate asperiores illum repudiandae dolores, sed culpa exercitationem nemo a tempora dolore magnam? Delectus, nam mollitia.</p>

              <p className='contacto-email'>email@email.com</p>

              <ul className='lista-links-contacto'>
                <li>Instagram</li>
                <li>X</li>
                <li>Facebook</li>
              </ul>
            </div>
            <div className="hero-contacto">

            </div>
            

          <Footer/>
        </div>

        
    </div>
  )
}

export default VistaContacto