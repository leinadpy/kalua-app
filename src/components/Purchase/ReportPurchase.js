import React, { useState } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetPurchases from "./../../hooks/purchases/useGetPurchases";
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

const ReportPurchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [totalSuma, setTotalSuma] = useState(0);
  const [initDate, setInitDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

  const [dataPurchases] = useGetPurchases();

  const handleSubmit = (e) => {
    e.preventDefault();
    var datosFormateados = [];
    var datoFormateado = {};
    var totalSumado = 0;
    const formatData = (datos) => {
      datos.forEach((dato) => {
        if (
          getUnixTime(initDate) <= dato.datePurchase &&
          getUnixTime(finalDate) >= dato.datePurchase
        ) {
          datoFormateado = {
            invoiceNumber: dato.invoiceNumber,
            datePurchase: formatearFecha(dato.datePurchase, "dd/MM/yyyy"),
            total: convertirAMoneda(dato.total),
          };
          totalSumado += Number(dato.total);
          datosFormateados.push(datoFormateado);
        }
      });
      setTotalSuma(convertirAMoneda(totalSumado));
    };
    formatData(dataPurchases);
    setPurchases(datosFormateados);
  };

  const resetDates = () => {
    setInitDate(new Date());
    setFinalDate(new Date());
    setPurchases([]);
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
    ],
    rows: purchases,
  };

  return (
    <>
      <Helmet>
        <title>Reporte de compras</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Reporte de compras</Titulo>
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
                Obtener Compras
              </Boton>
              <Boton as="button" onClick={() => resetDates()}>
                Resetear Fechas
              </Boton>
            </ContenedorBoton>
          </Form.Group>
        </Form.Row>
      </Form>

      {purchases.length !== 0 ? (
        <ContenedorTabla>
          <MDBDataTable striped bordered small data={data} />
        </ContenedorTabla>
      ) : (
        <h3>No hay ventas para mostrar</h3>
      )}
    </>
  );
};

export default ReportPurchase;
