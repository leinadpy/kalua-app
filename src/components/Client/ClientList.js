import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetClients from "./../../hooks/clients/useGetClients";
import deleteClient from "./../../firebase/clients/deleteClient";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContenedorTabla from "./../../elements/ContenedorTabla";
import Menu from "./../Menu";
import { ReactComponent as IconoEditar } from "./../../imagenes/editar.svg";
import { ReactComponent as IconoBorrar } from "./../../imagenes/borrar.svg";
import { MDBDataTable } from "mdbreact";
import Boton from "./../../elements/Boton";
import { Link } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState("");
  const [cargando, setCargando] = useState(true);

  const [dataClients] = useGetClients();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        if (dato !== undefined) {
          datoFormateado = {
            name: dato.name,
            document: dato.document,
            phone: dato.phone,
            email: dato.email,
            typeOfClient: dato.typeOfClient,
            abm: (
              <>
                <Boton to={`/clients/edit/${dato.id}`} small="true" as={Link}>
                  <IconoEditar />
                </Boton>
                <Boton small="true" onClick={() => deleteClient(dato.id)}>
                  <IconoBorrar />
                </Boton>
              </>
            ),
          };
          datosFormateados.push(datoFormateado);
        }
      });
    };
    formatData(dataClients);
    setClients(datosFormateados);
  }, [dataClients]);

  useEffect(() => {
    if (clients.length !== 0) {
      setCargando(false);
    }
  }, [clients]);

  const data = {
    columns: [
      {
        label: "Nombre",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Documento",
        field: "document",
        sort: "asc",
        width: 150,
      },
      {
        label: "Teléfono",
        field: "phone",
        sort: "asc",
        width: 150,
      },
      {
        label: "E-mail",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Tipo de Cliente",
        field: "typeOfClient",
        sort: "asc",
        width: 150,
      },
      {
        label: "ABM",
        field: "abm",
        sort: "asc",
        width: 100,
      },
    ],
    rows: clients,
  };

  return (
    <>
      <Helmet>
        <title>Lista de clientes</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de clientes</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando && clients.length !== 0 ? (
        <ContenedorTabla>
          <MDBDataTable striped bordered small data={data} />
        </ContenedorTabla>
      ) : (
        <h3>No hay clientes para mostrar</h3>
      )}
    </>
  );
};

export default ClientList;
