import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioClient from "./FormularioClient";
import Menu from "./../Menu";
import { useParams } from "react-router-dom";
import useGetClient from "./../../hooks/clients/useGetClient";

const EditClient = () => {
  const { id } = useParams();
  const [client] = useGetClient(id);

  return (
    <>
      <Menu />
      <Helmet>
        <title>Editar Cliente</title>
      </Helmet>
      <Header>
        <Titulo>Editar Cliente</Titulo>
      </Header>
      <FormularioClient client={client} />
    </>
  );
};

export default EditClient;
