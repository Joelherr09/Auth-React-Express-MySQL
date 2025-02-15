import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import './index.css';
import App from './App';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Partidos from './Pages/Partidos';
import Campeonatos from './Pages/Campeonatos';
import Equipos from './Pages/Equipos';
import Perfil from './Pages/Perfil';
import EditarPerfil from './Pages/EditarPerfil';
import PanelAdminEquipos from './Pages/PanelAdminEquipos';
import PanelAdminPartidos from './Pages/PanelAdminPartidos';
import PanelAdminCampeonatos from './Pages/PanelAdminCampeonatos';
import PanelAdminUsuarios from './Pages/PanelAdminUsuarios';
import CambiarClave from './Pages/CambiarClave';
import VistaContacto from './Pages/VistaContacto';
import RecuperarClave from './Pages/RecuperarClave';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/partidos",
    element: <Partidos/>
  },
  {
    path: "/campeonatos",
    element: <Campeonatos/>
  },
  {
    path: "/equipos",
    element: <Equipos/>
  },
  {
    path: "/perfil/:id", // Ruta dinámica para el perfil
    element: <Perfil/>,
  },
  {
    path: "/editar-perfil/:id",
    element: <EditarPerfil/>
  },
  {
    path: "/editar-perfil/cambiar-clave",
    element: <CambiarClave/>
  },
  {
    path: "/panel-admin/usuarios",
    element: <PanelAdminUsuarios />
  },
  {
    path: "/panel-admin/usuarios/:id",
    element: <PanelAdminUsuarios />
  },
  {
    path: "/panel-admin/equipos",
    element: <PanelAdminEquipos />
  },
  {
    path: "/panel-admin/partidos",
    element: <PanelAdminPartidos />
  },
  {
    path: "/panel-admin/campeonatos",
    element: <PanelAdminCampeonatos />
  },
  {
    path: "/contacto",
    element: <VistaContacto/>
  },
  {
    path: "/recuperar-clave",
    element: <RecuperarClave/>
  }
])


root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
