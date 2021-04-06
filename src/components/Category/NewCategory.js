import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioCategoria from "./FormularioCategoria";
import Menu from "./../Menu"

const NewCategory = () => {

  return (
    <>
      <Menu />
      <Helmet>
        <title>Nueva Categoría</title>
      </Helmet>
      <Header>
        <Titulo>Nueva Categoría</Titulo>
      </Header>
      <FormularioCategoria />
    </>
  );
};

export default NewCategory;
