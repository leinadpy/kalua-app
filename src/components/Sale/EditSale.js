import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioSale from "./FormularioSale";
import Menu from "./../Menu";
import { useParams } from "react-router-dom";
import useGetSale from "./../../hooks/sales/useGetSale";

const EditSale = () => {
  const { id } = useParams();
  const [sale] = useGetSale(id);

  return (
    <>
      <Menu />
      <Helmet>
        <title>Editar Venta</title>
      </Helmet>
      <Header>
        <Titulo>Editar Venta</Titulo>
      </Header>
      <FormularioSale sale={sale} />
    </>
  );
};

export default EditSale;
