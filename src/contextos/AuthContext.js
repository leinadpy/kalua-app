import React, { useState, useEffect, useContext } from "react";
import { auth } from "./../firebase/firebaseConfig";

// Creamos el contexto
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();
  // Creamos un state para saber cuando termina de cargar la comprobación de onAuthStateChanged
  const [cargando, setCargando] = useState(true);

  // Efecto para ejecutar la comprobación una sola vez
  useEffect(() => {
    // Comprobamos si hay un usuario
    const cancelarSuscripcion = auth.onAuthStateChanged((usuario) => {
      setUsuario(usuario);
      setCargando(false);
    });

    return cancelarSuscripcion;
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: usuario }}>
      {/**
       * Solamente retornamos los elementos hijos cuando no esté cargando. De esta forma nos aseguramos
       * de no cargar el resto de la app hasta que el usuario haya sido establecido.
       *
       * Si no hacemos esto al refrescar la página el componente children intenta cargar inmediatamente
       * antes de haber comprobado que existe un usuario. */}
      {!cargando && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
