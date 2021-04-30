import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetReceipts from "./../../hooks/receipts/useGetReceipts";
import deleteReceipt from "./../../firebase/receipts/deleteReceipt";
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

const ReceiptList = () => {
  const [receipts, setReceipts] = useState("");
  const [cargando, setCargando] = useState(true);

  const [dataReceipts] = useGetReceipts();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        datoFormateado = {
          invoiceReceipt: dato.invoiceReceipt,
          client: dato.client,
          dateReceipt: formatearFecha(dato.dateReceipt, "dd/MM/yyyy"),
          total: convertirAMoneda(dato.total),
          abm: (
            <>
              <Boton to={`/receipts/edit/${dato.id}`} small="true" as={Link}>
                <IconoEditar />
              </Boton>
              <Boton small="true" onClick={() => deleteReceipt(dato.id)}>
                <IconoBorrar />
              </Boton>
            </>
          ),
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataReceipts);
    setReceipts(datosFormateados);
    setCargando(false);
  }, [dataReceipts]);

  const data = {
    columns: [
      {
        label: "N° Recibo",
        field: "invoiceReceipt",
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
        label: "Fecha recibo",
        field: "dateSale",
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
    rows: receipts,
  };

  return (
    <>
      <Helmet>
        <title>Lista de recibos</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de recibos</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        dataReceipts.length !== 0 ? (
          <ContenedorTabla>
            <MDBDataTable striped bordered small data={data} />
          </ContenedorTabla>
        ) : (
          <h3>No hay recibos para mostrar</h3>
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

export default ReceiptList;
