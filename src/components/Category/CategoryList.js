import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import useGetCategories from "../../hooks/categories/useGetCategories";
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
import deleteCategory from "../../firebase/categories/deleteCategory";
import Menu from "./../Menu";

const CategoryList = () => {
  const [categories] = useGetCategories();
  return (
    <>
      <Helmet>
        <title>Lista de Categorías</title>
      </Helmet>
      <Menu />
      <Header>
        <Titulo>Lista de Categorías</Titulo>
      </Header>
      <Lista>
        {categories.map((category, index) => {
          return (
            <div key={category.id}>
              <ElementoLista key={category.id}>
                <Descripcion>{category.description}</Descripcion>

                <ContenedorBotones>
                  <BotonAccion
                    as={Link}
                    to={`/categories/edit/${category.id}`}
                  >
                    <IconoEditar />
                  </BotonAccion>
                  <BotonAccion onClick={() => deleteCategory(category.id)}>
                    <IconoBorrar />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}
        {categories.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay categorías por mostrar</Subtitulo>
            <Boton as={Link} to="/categories/new-category">
              Agregar Categoría
            </Boton>
          </ContenedorSubtitulo>
        )}
      </Lista>
    </>
  );
};

export default CategoryList;
