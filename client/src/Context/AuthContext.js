import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Verificar la autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/check-auth', {
          withCredentials: true,
        });
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Actualizar el usuario
        } else {
          setIsAuthenticated(false);
          setUser(null); // Limpiar el usuario si no está autenticado
        }
      } catch (err) {
        console.error('Error verificando autenticación:', err);
      }
    };

    checkAuth();
  }, []);

    // Función para cerrar sesión
    const logout = async () => {
      try {
        await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
        setIsAuthenticated(false);
        setUser(null); // Limpiar el usuario al cerrar sesión
      } catch (err) {
        console.error('Error en el logout:', err);
      }
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};