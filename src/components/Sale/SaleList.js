import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetSales from "./../../hooks/sales/useGetSales";
import deleteSale from "./../../firebase/sales/deleteSale";
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

const SaleList = () => {
  const [sales, setSales] = useState("");
  const [cargando, setCargando] = useState(true);

  const [dataSales] = useGetSales();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        datoFormateado = {
          invoiceNumber: dato.invoiceNumber,
          client: dato.client,
          typeOfClient: dato.typeOfClient,
          dateSale: formatearFecha(dato.dateSale, "dd/MM/yyyy"),
          typeOfSale: dato.typeOfSale,
          total: convertirAMoneda(dato.total),
          abm: (
            <>
              <Boton to={`/sales/edit/${dato.id}`} small="true" as={Link}>
                <IconoEditar />
              </Boton>
              <Boton small="true" onClick={() => deleteSale(dato.id)}>
                <IconoBorrar />
              </Boton>
            </>
          ),
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataSales);
    setSales(datosFormateados);
    setCargando(false);
  }, [dataSales]);

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
        label: "Tipo Cliente",
        field: "typeOfClient",
        sort: "asc",
        width: 150,
      },
      {
        label: "Fecha venta",
        field: "dateSale",
        sort: "asc",
        width: 150,
      },
      {
        label: "Tipo venta",
        field: "typeOfSale",
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
        <title>Lista de ventas</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de ventas</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        dataSales.length !== 0 ? (
          <ContenedorTabla>
            <MDBDataTable striped bordered small data={data} />
          </ContenedorTabla>
        ) : (
          <h3>No hay ventas para mostrar</h3>
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

export default SaleList;
