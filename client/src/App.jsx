import "./App.css";
import LogoBar from "./Componentes/LogoBar";
import Navbar from "./Componentes/Navbar";
import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Componentes/Footer";

function App() {
  const { isAuthenticated, user } = useContext(AuthContext); // Obtener el estado de autenticación y el usuario logueado

  const navigate = useNavigate();

  const handlePanelClick = () => {
    navigate("/panel-admin/usuarios");
  };

  return (
    <div className="body-app">
      <LogoBar />
      <Navbar />
      <div className="texto-header">
        {/* Mostrar el botón solo si el usuario logueado es el dueño del perfil */}
        {isAuthenticated && user && user.rol === 9 && (
          <div className="btn-admin-home">
            <ul>
              <li onClick={handlePanelClick}>Panel de Administrador</li>
            </ul>
          </div>
        )}

        <div className="seccion-uno-home">
          <div className="header-seccion-uno-home">
            <h3>Bienvenido a cuartavoleibol!</h3>
          </div>
          {/* Aquí Inicia lo que debería ser el componente <CuadroPartidoSiguienteHome/> */}
          <div className="cuerpo-seccion-uno-home">
            <div className="partidos-siguientes-home">
              <h4>Partidos Siguientes</h4>
              <ul>
                {/* En realidad este es el componente: La etiqueta <li><li/> */ } 
                <li>
                  <div className="partidos-siguientes-home-cuadro-equipo-head">
                    <h6>Torneo</h6>
                    <h6>05-02-2025</h6>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 1</p>
                    <p>2</p>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 2</p>
                    <p>0</p>
                  </div>
                </li>
                {/* En realidad este es el componente: La etiqueta <li><li/> */ } 

                <li>
                  <div className="partidos-siguientes-home-cuadro-equipo-head">
                    <h6>Torneo</h6>
                    <h6>05-02-2025</h6>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 1</p>
                    <p>2</p>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 2</p>
                    <p>0</p>
                  </div>
                </li>

                <li>
                  <div className="partidos-siguientes-home-cuadro-equipo-head">
                    <h6>Torneo</h6>
                    <h6>05-02-2025</h6>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 1</p>
                    <p>2</p>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 2</p>
                    <p>0</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Aquí Termina lo que debería ser el componente <CuadroPartidoSiguienteHome/> */}


            {/* Aquí Inicia lo que debería ser el componente <CuadroPartidoTerminadoHome/> */}
            <div className="partidos-terminados-home">
              <h4>Partidos Terminados</h4>
              <ul>
                {/* En realidad este es el componente: La etiqueta <li><li/> */ } 
                <li>
                  <div className="partidos-siguientes-home-cuadro-equipo-head">
                    <h6>Torneo</h6>
                    <h6>05-02-2025</h6>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 1</p>
                    <p>2</p>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 2</p>
                    <p>0</p>
                  </div>
                </li>
                {/* En realidad este es el componente: La etiqueta <li><li/> */ } 
                <li>
                  <div className="partidos-siguientes-home-cuadro-equipo-head">
                    <h6>Torneo</h6>
                    <h6>05-02-2025</h6>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 1</p>
                    <p>2</p>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 2</p>
                    <p>0</p>
                  </div>
                </li>

                <li>
                  <div className="partidos-siguientes-home-cuadro-equipo-head">
                    <h6>Torneo</h6>
                    <h6>05-02-2025</h6>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 1</p>
                    <p>2</p>
                  </div>
                  <div className="partidos-siguientes-home-cuadro-equipo">
                    <p>Equipo 2</p>
                    <p>0</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Aquí Termina lo que debería ser el componente <CuadroPartidoTerminadoHome/> */}


          </div>
        </div>

        {/* Acá abajo debería ir Sección 2 el cuadro más grande, quizás un video de Youtube, o una foto con acceso rápido a una nota periodística */ } 
        <div>

        </div>

        {/* Acá termina */ }

        {/* Acá debería ir la Sección 3 que serían los Campeonatos Siguientes y terminados */ }  
        <div>

        </div>
        {/* Acá termina */ } 

        {/* Acá debería ir Sección 4. Un cuadro para conseguir feedback de los Usuarios */ } 
        <div>
          
        </div>
        {/* Acá termina */ } 

      </div>
      <Footer/>
    </div>
  );
}

export default App;
