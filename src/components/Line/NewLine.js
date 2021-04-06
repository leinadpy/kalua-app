import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioLine from "./FormularioLine";
import Menu from "./../Menu";

const NewLine = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nueva Línea</title>
      </Helmet>
      <Header>
        <Titulo>Nueva Línea</Titulo>
      </Header>
      <FormularioLine />
    </>
  );
};

export default NewLine;
