import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioPurchase from "./FormularioPurchase";
import Menu from "./../Menu";

const NewPurchase = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nueva Compra</title>
      </Helmet>
      <Header>
        <Titulo>Nueva Compra</Titulo>
      </Header>
      <FormularioPurchase />
    </>
  );
};

export default NewPurchase;
