import React from "react";
import { Header, Titulo } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioLine from "./FormularioLine";
import { useParams } from "react-router-dom";
import useGetLine from "./../../hooks/lines/useGetLine";
import Menu from "./../Menu"

const EditLine = () => {
  const { id } = useParams();
  const [line] = useGetLine(id);

  return (
    <>
      <Helmet>
        <title>Editar Línea</title>
      </Helmet>
      <Menu />
      <Header>
        <Titulo>Editar Línea</Titulo>
      </Header>
      <FormularioLine line={line} />
    </>
  );
};

export default EditLine;
