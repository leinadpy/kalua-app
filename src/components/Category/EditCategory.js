import React from "react";
import { Header, Titulo } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioCategoria from "./FormularioCategoria";
import { useParams } from "react-router-dom";
import useGetCategory from "./../../hooks/categories/useGetCategory";
import Menu from "./../Menu";

const EditCategory = () => {
  const { id } = useParams();
  const [category] = useGetCategory(id);

  return (
    <>
      <Helmet>
        <title>Editar Categoría</title>
      </Helmet>
      <Menu />
      <Header>
        <Titulo>Editar Categoría</Titulo>
      </Header>
      <FormularioCategoria category={category} />
    </>
  );
};

export default EditCategory;
