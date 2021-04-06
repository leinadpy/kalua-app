import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioProduct from "./FormularioProduct";
import Menu from "./../Menu";

const NewProduct = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nuevo Producto</title>
      </Helmet>
      <Header>
        <Titulo>Nuevo Producto</Titulo>
      </Header>
      <FormularioProduct />
    </>
  );
};

export default NewProduct;
