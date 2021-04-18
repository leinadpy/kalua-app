import React, { useState } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetSales from "./../../hooks/sales/useGetSales";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContenedorTabla from "./../../elements/ContenedorTabla";
import Menu from "./../Menu";
import { MDBDataTable } from "mdbreact";
import Boton from "./../../elements/Boton";
import convertirAMoneda from "./../../funciones/convertirAMoneda";
import formatearFecha from "./../../funciones/formatearFecha";
import { getUnixTime } from "date-fns";
import DatePicker from "./../DatePicker";
import { Form, Col } from "react-bootstrap";
import { ContenedorBoton } from "../../elements/ElementosDeFormulario";
import Select from "./../Select";

const typesOfSales = [
  { id: "Ambos", description: "Ambos" },
  { id: "Crédito", description: "Crédito" },
  { id: "Contado", description: "Contado" },
];

const ReportSale = () => {
  const [sales, setSales] = useState([]);
  const [totalSuma, setTotalSuma] = useState(0);
  const [initDate, setInitDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [typeOfSale, setTypeOfSale] = useState("Ambos");

  const [dataSales] = useGetSales();

  const handleSubmit = (e) => {
    e.preventDefault();
    var datosFormateados = [];
    var datoFormateado = {};
    var totalSumado = 0;
    const formatData = (datos) => {
      datos.forEach((dato) => {
        if (typeOfSale !== "Ambos") {
          if (
            getUnixTime(initDate) <= dato.dateSale &&
            getUnixTime(finalDate) >= dato.dateSale &&
            typeOfSale === dato.typeOfSale
          ) {
            datoFormateado = {
              invoiceNumber: dato.invoiceNumber,
              client: dato.client,
              typeOfClient: dato.typeOfClient,
              dateSale: formatearFecha(dato.dateSale, "dd/MM/yyyy"),
              typeOfSale: dato.typeOfSale,
              total: convertirAMoneda(dato.total),
            };
            totalSumado += Number(dato.total);
            datosFormateados.push(datoFormateado);
          }
        } else {
          if (
            getUnixTime(initDate) <= dato.dateSale &&
            getUnixTime(finalDate) >= dato.dateSale
          ) {
            datoFormateado = {
              invoiceNumber: dato.invoiceNumber,
              client: dato.client,
              typeOfClient: dato.typeOfClient,
              dateSale: formatearFecha(dato.dateSale, "dd/MM/yyyy"),
              typeOfSale: dato.typeOfSale,
              total: convertirAMoneda(dato.total),
            };
            totalSumado += Number(dato.total);
            datosFormateados.push(datoFormateado);
          }
        }
      });
      setTotalSuma(convertirAMoneda(totalSumado));
    };
    formatData(dataSales);
    setSales(datosFormateados);
  };

  const resetDates = () => {
    setInitDate(new Date());
    setFinalDate(new Date());
    setSales([]);
    setTypeOfSale("Ambos");
    setTotalSuma(0);
  };

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
    ],
    rows: sales,
  };

  return (
    <>
      <Helmet>
        <title>Reporte de ventas</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Reporte de ventas</Titulo>
        </ContenedorHeader>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridInitDate">
            <Form.Label>Fecha inicial</Form.Label>
            <DatePicker fecha={initDate} setFecha={setInitDate} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridInitDate">
            <Form.Label>Fecha final</Form.Label>
            <DatePicker fecha={finalDate} setFecha={setFinalDate} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTypeOfDate">
            <Form.Label>Tipo de Venta</Form.Label>
            <Select
              estado={typeOfSale}
              setEstado={setTypeOfSale}
              data={typesOfSales}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridTotal">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="text"
              name="totalSuma"
              value={totalSuma}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridBoton">
            <ContenedorBoton>
              <Boton as="button" primario type="submit">
                Obtener Ventas
              </Boton>
              <Boton as="button" onClick={() => resetDates()}>
                Resetear Fechas
              </Boton>
            </ContenedorBoton>
          </Form.Group>
        </Form.Row>
      </Form>

      {sales.length !== 0 ? (
        <ContenedorTabla>
          <MDBDataTable striped bordered small data={data} />
        </ContenedorTabla>
      ) : (
        <h3>No hay ventas para mostrar</h3>
      )}
    </>
  );
};

export default ReportSale;
