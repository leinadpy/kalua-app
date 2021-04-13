import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioSale from "./FormularioSale";
import Menu from "./../Menu";

const NewSale = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nueva Venta</title>
      </Helmet>
      <Header>
        <Titulo>Nueva Venta</Titulo>
      </Header>
      <FormularioSale />
    </>
  );
};

export default NewSale;
