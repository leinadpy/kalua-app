import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import useGetProducts from "../../hooks/products/useGetProducts";
import {
  Lista,
  ElementoLista,
  Descripcion,
  ContenedorBotones,
  BotonAccion,
  ContenedorSubtitulo,
  Subtitulo,
} from "../../elements/ElementosDeLista";
import { ReactComponent as IconoEditar } from "./../../imagenes/editar.svg";
import { ReactComponent as IconoBorrar } from "./../../imagenes/borrar.svg";
import { Link } from "react-router-dom";
import Boton from "../../elements/Boton";
import deleteProduct from "../../firebase/products/deleteProduct";
import Menu from "./../Menu";

const ProductList = () => {
  const [products] = useGetProducts();
  return (
    <>
      <Helmet>
        <title>Lista de Productos</title>
      </Helmet>
      <Menu />
      <Header>
        <Titulo>Lista de Productos</Titulo>
      </Header>
      <Lista>
        {products.map((product, index) => {
          return (
            <div key={product.id}>
              <ElementoLista key={product.id}>
                <Descripcion>{product.description}</Descripcion>
                <Descripcion>{product.line}</Descripcion>
                <Descripcion>{product.category}</Descripcion>
                <Descripcion>{product.basicPrice}</Descripcion>

                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/products/edit/${product.id}`}>
                    <IconoEditar />
                  </BotonAccion>
                  <BotonAccion onClick={() => deleteProduct(product.id)}>
                    <IconoBorrar />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}
        {products.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay productos por mostrar</Subtitulo>
            <Boton as={Link} to="/products/new-product">
              Agregar Producto
            </Boton>
          </ContenedorSubtitulo>
        )}
      </Lista>
    </>
  );
};

export default ProductList;
