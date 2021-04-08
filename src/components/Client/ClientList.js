import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import useGetClients from "../../hooks/clients/useGetClients";
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
import deleteClient from "../../firebase/clients/deleteClient";
import Menu from "./../Menu";

const ClientList = () => {
  const [clients] = useGetClients();
  return (
    <>
      <Helmet>
        <title>Lista de Clientes</title>
      </Helmet>
      <Menu />
      <Header>
        <Titulo>Lista de Clientes</Titulo>
      </Header>
      <Lista>
        {clients.map((client, index) => {
          return (
            <div key={client.id}>
              <ElementoLista key={client.id}>
                <Descripcion>{client.name}</Descripcion>
                <Descripcion>{client.document}</Descripcion>
                <Descripcion>{client.phone}</Descripcion>
                <Descripcion>{client.email}</Descripcion>

                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/clients/edit/${client.id}`}>
                    <IconoEditar />
                  </BotonAccion>
                  <BotonAccion onClick={() => deleteClient(client.id)}>
                    <IconoBorrar />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}
        {clients.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay clientes por mostrar</Subtitulo>
            <Boton as={Link} to="/clients/new-client">
              Agregar Cliente
            </Boton>
          </ContenedorSubtitulo>
        )}
      </Lista>
    </>
  );
};

export default ClientList;
