import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioReceipt from "./FormularioReceipt";
import Menu from "./../Menu";

const NewReceipt = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nuevo Recibo</title>
      </Helmet>
      <Header>
        <Titulo>Nuevo Recibo</Titulo>
      </Header>
      <FormularioReceipt />
    </>
  );
};

export default NewReceipt;
