import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioRefund from "./FormularioRefund";
import Menu from "./../Menu";
import { useParams } from "react-router-dom";
import useGetRefund from "./../../hooks/refunds/useGetRefund";

const EditRefund = () => {
  const { id } = useParams();
  const [refund] = useGetRefund(id);

  return (
    <>
      <Menu />
      <Helmet>
        <title>Editar Devolución</title>
      </Helmet>
      <Header>
        <Titulo>Editar Devolución</Titulo>
      </Header>
      <FormularioRefund refund={refund} />
    </>
  );
};

export default EditRefund;
