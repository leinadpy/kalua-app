import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioReceipt from "./FormularioReceipt";
import Menu from "./../Menu";
import { useParams } from "react-router-dom";
import useGetReceipt from "./../../hooks/receipts/useGetReceipt";

const EditReceipt = () => {
  const { id } = useParams();
  const [receipt] = useGetReceipt(id);

  return (
    <>
      <Menu />
      <Helmet>
        <title>Editar Recibo</title>
      </Helmet>
      <Header>
        <Titulo>Editar Recibo</Titulo>
      </Header>
      <FormularioReceipt receipt={receipt} />
    </>
  );
};

export default EditReceipt;
