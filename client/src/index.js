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
  }
])


root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
