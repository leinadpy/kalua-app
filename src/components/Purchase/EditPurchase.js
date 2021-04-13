import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioPurchase from "./FormularioPurchase";
import Menu from "./../Menu";
import { useParams } from "react-router-dom";
import useGetPurchase from "./../../hooks/purchases/useGetPurchase";

const EditPurchase = () => {
  const { id } = useParams();
  const [purchase] = useGetPurchase(id);

  return (
    <>
      <Menu />
      <Helmet>
        <title>Editar Compra</title>
      </Helmet>
      <Header>
        <Titulo>Editar Compra</Titulo>
      </Header>
      <FormularioPurchase purchase={purchase} />
    </>
  );
};

export default EditPurchase;
