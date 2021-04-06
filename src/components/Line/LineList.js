import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import useGetLines from "../../hooks/lines/useGetLines";
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
import deleteLine from "../../firebase/lines/deleteLine";
import Menu from "./../Menu";

const LineList = () => {
  const [lines] = useGetLines();
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
        {lines.map((line, index) => {
          return (
            <div key={line.id}>
              <ElementoLista key={line.id}>
                <Descripcion>{line.description}</Descripcion>

                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/lines/edit/${line.id}`}>
                    <IconoEditar />
                  </BotonAccion>
                  <BotonAccion onClick={() => deleteLine(line.id)}>
                    <IconoBorrar />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}
        {lines.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay líneas por mostrar</Subtitulo>
            <Boton as={Link} to="/lines/new-line">
              Agregar Línea
            </Boton>
          </ContenedorSubtitulo>
        )}
      </Lista>
    </>
  );
};

export default LineList;
