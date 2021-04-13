import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetRefunds from "./../../hooks/refunds/useGetRefunds";
import deleteRefund from "./../../firebase/refunds/deleteRefund";
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
import convertirAMoneda from "./../../funciones/convertirAMoneda";
import formatearFecha from "./../../funciones/formatearFecha";

const RefundList = () => {
  const [sales, setSales] = useState("");
  const [cargando, setCargando] = useState(true);

  const [dataRefunds] = useGetRefunds();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        datoFormateado = {
          invoiceNumber: dato.invoiceNumber,
          client: dato.client,
          dateRefund: formatearFecha(dato.dateRefund, "dd/MM/yyyy"),
          total: convertirAMoneda(dato.total),
          abm: (
            <>
              <Boton to={`/refunds/edit/${dato.id}`} small="true" as={Link}>
                <IconoEditar />
              </Boton>
              <Boton small="true" onClick={() => deleteRefund(dato.id)}>
                <IconoBorrar />
              </Boton>
            </>
          ),
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataRefunds);
    setSales(datosFormateados);
    setCargando(false);
  }, [dataRefunds]);

  const data = {
    columns: [
      {
        label: "N° Factura",
        field: "invoiceNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Cliente",
        field: "client",
        sort: "asc",
        width: 150,
      },
      {
        label: "Fecha devolución",
        field: "dateRefund",
        sort: "asc",
        width: 150,
      },
      {
        label: "Total",
        field: "total",
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
    rows: sales,
  };

  return (
    <>
      <Helmet>
        <title>Lista de devoluciones</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de devoluciones</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        dataRefunds.length !== 0 ? (
          <ContenedorTabla>
            <MDBDataTable striped bordered small data={data} />
          </ContenedorTabla>
        ) : (
          <h3>No hay devoluciones para mostrar</h3>
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

export default RefundList;
