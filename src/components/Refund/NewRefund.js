import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioRefund from "./FormularioRefund";
import Menu from "./../Menu";

const NewRefund = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nueva Devolución</title>
      </Helmet>
      <Header>
        <Titulo>Nueva Devolución</Titulo>
      </Header>
      <FormularioRefund />
    </>
  );
};

export default NewRefund;
