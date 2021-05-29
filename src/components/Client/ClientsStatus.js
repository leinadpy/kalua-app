import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContenedorTabla from "./../../elements/ContenedorTabla";
import Menu from "./../Menu";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Boton from "./../../elements/Boton";
import { Link } from "react-router-dom";
import formatearFecha from "./../../funciones/formatearFecha";
import useGetSales from "./../../hooks/sales/useGetSales";
import convertirAMoneda from "./../../funciones/convertirAMoneda"

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

const { SearchBar } = Search;

const ClientsStatus = () => {
  const [sales] = useGetSales();

  const [clientsStatus, setClientsStatus] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const salesPending = [];
    const clientDeb = [];
    const clientWithSales = [];
    sales.forEach((sale) => {
      if (sale.total !== sale.paidUp) {
        salesPending.push(sale);
        clientDeb.push(sale.client);
      }
    });
    const clientUniqueDeb = clientDeb.filter((item, index) => {
      return clientDeb.indexOf(item) === index;
    });
    clientUniqueDeb.forEach((client, index) => {
      let suma = 0;
      const salesClient = [];
      salesPending.forEach((sale) => {
        suma += sale.client === client ? sale.total - sale.paidUp : 0;
        if (sale.client === client) {
          salesClient.push(sale);
        }
      });
      clientWithSales.push({
        id: index,
        client: client,
        salesCreditPending: salesClient,
        totalDeb: convertirAMoneda(suma),
      });
    });
    setCargando(false);
    setClientsStatus(clientWithSales);
  }, [sales]);

  const columns = [
    { dataField: "client", text: "Cliente" },
    { dataField: "totalDeb", text: "Deuda Total" },
  ];

  const expandRow = {
    renderer: (row) => (
      <div>
        {clientsStatus[row.id].salesCreditPending &&
          clientsStatus[row.id].salesCreditPending.map((sale, index) => (
            <p key={index}>
              <span style={{ marginRight: "50px" }}>
                Factura Nº: {sale.invoiceNumber}
              </span>
              <span style={{ marginRight: "50px" }}>
                Fecha venta: {formatearFecha(sale.dateSale, "dd/MM/yyyy")}
              </span>
              <span style={{ marginRight: "50px" }}>
                Monto pagado: {convertirAMoneda(sale.paidUp)}
              </span>
              <span style={{ marginRight: "50px" }}>
                Total venta: {convertirAMoneda(sale.total)}
              </span>
              <Boton
                to={`/sales/edit/${sale.id}`}
                small="true"
                as={Link}
                style={{ textDecoration: "none", color: "white" }}
              >
                Ir a venta
              </Boton>
            </p>
          ))}
      </div>
    ),
    showExpandColumn: true,
  };

  return (
    <>
      <Helmet>
        <title>Cuentas de clientes</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Estado de cuenta de clientes</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        clientsStatus.length !== 0 ? (
          <ContenedorTabla>
            <ToolkitProvider
              keyField="id"
              data={clientsStatus}
              columns={columns}
              search
            >
              {(props) => (
                <div>
                  <h3>Búsqueda:</h3>
                  <SearchBar
                    {...props.searchProps}
                    className="custome-search-field"
                    style={{ color: "black" }}
                    delay={1000}
                    placeholder="Buscar"
                  />
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    expandRow={expandRow}
                    pagination={paginationFactory()}
                    striped
                    hover
                  />
                </div>
              )}
            </ToolkitProvider>
          </ContenedorTabla>
        ) : (
          <h3>No hay clientes con deuda para mostrar</h3>
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

export default ClientsStatus;
