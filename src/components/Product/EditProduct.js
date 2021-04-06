import React from "react";
import { Header, Titulo } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioProduct from "./FormularioProduct";
import { useParams } from "react-router-dom";
import useGetProduct from "./../../hooks/products/useGetProduct";

const EditProduct = () => {
  const { id } = useParams();
  const [product] = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title>Editar Producto</title>
      </Helmet>
      <Header>
        <Titulo>Editar Producto</Titulo>
      </Header>
      <FormularioProduct product={product} />
    </>
  );
};

export default EditProduct;
