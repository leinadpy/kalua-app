import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "./../elements/Header";
import Boton from "./../elements/Boton";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "./../elements/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "./../imagenes/login.svg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Alerta from "./../elements/Alerta";
import { auth } from "./../firebase/firebaseConfig";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 7rem; 
  margin-bottom: 1rem; /* 20px */
`;

const InicioSesion = () => {
  const history = useHistory();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setCorreo(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    // Comprobamos del lado del cliente que el correo sea válido.
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(correo)) {
      setAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa un correo válido",
      });
      setEstadoAlerta(true);
      return;
    }

    if (correo === "" || password === "") {
      setAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los datos",
      });
      setEstadoAlerta(true);
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(correo, password);
      history.push("/");
    } catch (error) {
      setEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case "auth/wrong-password":
          mensaje = "La contraseña no es correcta";
          break;
        case "auth/user-not-found":
          mensaje =
            "No se encontró ninguna cuenta con este correco electrónico";
          break;

        default:
          mensaje = "Hubo un error al intentar iniciar sesión.";
          break;
      }
      setAlerta({
        tipo: "error",
        mensaje: mensaje,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Iniciar Sesión
          </Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </>
  );
};

export default InicioSesion;
