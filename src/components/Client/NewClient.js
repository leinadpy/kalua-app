import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioClient from "./FormularioClient";
import Menu from "./../Menu";

const NewClient = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nuevo Cliente</title>
      </Helmet>
      <Header>
        <Titulo>Nuevo Cliente</Titulo>
      </Header>
      <FormularioClient />
    </>
  );
};

export default NewClient;
