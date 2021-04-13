import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetLines from "./../../hooks/lines/useGetLines";
import deleteLine from "./../../firebase/lines/deleteLine";
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

const LineList = () => {
  const [lines, setLines] = useState("");
  const [cargando, setCargando] = useState(true);

  const [dataLines] = useGetLines();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        datoFormateado = {
          description: dato.description,
          abm: (
            <>
              <Boton to={`/lines/edit/${dato.id}`} small="true" as={Link}>
                <IconoEditar />
              </Boton>
              <Boton small="true" onClick={() => deleteLine(dato.id)}>
                <IconoBorrar />
              </Boton>
            </>
          ),
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataLines);
    setLines(datosFormateados);
    setCargando(false);
  }, [dataLines]);

  const data = {
    columns: [
      {
        label: "Descripción",
        field: "description",
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
    rows: lines,
  };

  return (
    <>
      <Helmet>
        <title>Lista de líneas</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de líneas</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        dataLines.length !== 0 ? (
          <ContenedorTabla>
            <MDBDataTable striped bordered small data={data} />
          </ContenedorTabla>
        ) : (
          <h3>No hay líneas para mostrar</h3>
        )
      ) : (
        <div
          className="spinner-grow text-primary w-50 text-center mx-auto p-3 mt-2 h-100"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

export default LineList;
