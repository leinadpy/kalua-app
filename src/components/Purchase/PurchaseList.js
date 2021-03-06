import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetPurchases from "./../../hooks/purchases/useGetPurchases";
import deletePurchase from "./../../firebase/purchases/deletePurchase";
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

const PurchaseList = () => {
  const [purchases, setPurchases] = useState("");
  const [cargando, setCargando] = useState(true);

  const [dataPurchases] = useGetPurchases();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        datoFormateado = {
          invoiceNumber: dato.invoiceNumber,
          datePurchase: formatearFecha(dato.datePurchase, "dd/MM/yyyy"),
          total: convertirAMoneda(dato.total),
          abm: (
            <>
              <Boton to={`/purchases/edit/${dato.id}`} small="true" as={Link}>
                <IconoEditar />
              </Boton>
              <Boton small="true" onClick={() => deletePurchase(dato.id)}>
                <IconoBorrar />
              </Boton>
            </>
          ),
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataPurchases);
    setPurchases(datosFormateados);
    setCargando(false);
  }, [dataPurchases]);

  const data = {
    columns: [
      {
        label: "N° Factura",
        field: "invoiceNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Fecha compra",
        field: "datePurchase",
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
    rows: purchases,
  };

  return (
    <>
      <Helmet>
        <title>Lista de compras</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de compras</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        dataPurchases.length !== 0 ? (
          <ContenedorTabla>
            <MDBDataTable striped bordered small data={data} />
          </ContenedorTabla>
        ) : (
          <h3>No hay compras para mostrar</h3>
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

export default PurchaseList;
