import Navbar from "../Componentes/Navbar";
import LogoBar from "../Componentes/LogoBar";
import Footer from "../Componentes/Footer";
import "./css/Equipos.css";
import FotoPerfilDefault from "../Media/user-logo.png";

import * as React from "react";
import Button from "@mui/material/Button";

const Equipos = () => {
  return (
    <div className="body-app">
      <LogoBar />
      <Navbar />

      <div className="cuerpo-vista-lista-equipos">

        <div className="contenedor-vista-lista-equipos">
          <div className="panel-izq">
            <h1>Mi Equipo</h1>

            <div className="contenedor-btn-crear-equipo">
              <Button
                variant="contained"
                disableElevation
                className="btn-crear-equipo"
              >
                Crear Equipo
              </Button>
            </div>

            <div className="contenedor-equipo-actual-vista-lista-equipos">
              <h3>Equipo Actual</h3>
              {/* Aquí iría el componente con el cuadro del Equipo */}
              <div className="equipo-actual-vista-lista-equipos">
                <div className="img-foto-equipo">
                  <img src={FotoPerfilDefault} width={50} alt="" />
                </div>
                <div className="info-equipo">
                  <div className="nombre-equipo-cuadro">
                    <p>Nombre Equipo</p>
                    <p>Ciudad</p>
                  </div>

                  <p>TC</p>
                </div>
              </div>
              {/* Aquí iría el componente con el cuadro del Equipo */}
            </div>

            <div className="contenedor-equipo-actual-vista-lista-equipos">
              <h3>Equipos Pasados</h3>
              {/* Aquí iría el componente con el cuadro del Equipo */}
              <div className="equipo-actual-vista-lista-equipos">
                <div className="img-foto-equipo">
                  <img src={FotoPerfilDefault} width={50} alt="" />
                </div>
                <div className="info-equipo">
                  <div className="nombre-equipo-cuadro">
                    <p>Nombre Equipo</p>
                    <p>Ciudad</p>
                  </div>

                  <p>TC</p>
                </div>
              </div>
              {/* Aquí iría el componente con el cuadro del Equipo */}
              <div className="equipo-actual-vista-lista-equipos">
                <div className="img-foto-equipo">
                  <img src={FotoPerfilDefault} width={50} alt="" />
                </div>
                <div className="info-equipo">
                  <div className="nombre-equipo-cuadro">
                    <p>Nombre Equipo</p>
                    <p>Ciudad</p>
                  </div>

                  <p>TC</p>
                </div>
              </div>
              <div className="equipo-actual-vista-lista-equipos">
                <div className="img-foto-equipo">
                  <img src={FotoPerfilDefault} width={50} alt="" />
                </div>
                <div className="info-equipo">
                  <div className="nombre-equipo-cuadro">
                    <p>Nombre Equipo</p>
                    <p>Ciudad</p>
                  </div>

                  <p>TC</p>
                </div>
              </div>
            </div>
          </div>



          <div className="panel-der">
            <h1>Lista de Equipos</h1>

            <div className="contenedor-lista-equipos">
              <h3>Equipos</h3>
              <div className="equipo-actual-vista-lista-equipos">
                <div className="img-foto-equipo">
                  <img src={FotoPerfilDefault} width={50} alt="" />
                </div>
                <div className="info-equipo">
                  <div className="nombre-equipo-cuadro">
                    <p>Nombre Equipo</p>
                    <p>Ciudad</p>
                  </div>

                  <p>TC</p>
                </div>
              </div>

              <div className="equipo-actual-vista-lista-equipos">
                <div className="img-foto-equipo">
                  <img src={FotoPerfilDefault} width={50} alt="" />
                </div>
                <div className="info-equipo">
                  <div className="nombre-equipo-cuadro">
                    <p>Nombre Equipo</p>
                    <p>Ciudad</p>
                  </div>

                  <p>TC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Equipos;
