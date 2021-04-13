import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import { ContenedorBoton } from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editSale from "../../firebase/sales/editSale";
import addSale from "./../../firebase/sales/addSale";
import { useHistory } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import DatePicker from "./../DatePicker";
import { getUnixTime } from "date-fns";
import FormularioDetailSale from "./FormularioDetailSale";
import DetailSaleList from "./DetailSaleList";
import { fromUnixTime } from "date-fns";

const FormularioSale = ({ sale }) => {
  const [inputInvoiceNumber, setInputInvoiceNumber] = useState("");
  const [inputClient, setInputClient] = useState("");
  const [dateSale, setDateSale] = useState(new Date());
  const [total, setTotal] = useState(0);
  const [detailsSales, setDetailsSales] = useState([]);

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay alguna compra.
    // De ser así establecemos todo el state con los valores de la compra.
    if (sale) {
      setInputInvoiceNumber(sale.data().invoiceNumber);
      setInputClient(sale.data().client);
      setDateSale(fromUnixTime(sale.data().dateSale));
      setTotal(sale.data().total);
      setDetailsSales(sale.data().detailsSales);
    }
  }, [sale]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "invoiceNumber":
        setInputInvoiceNumber(e.target.value);
        break;
      case "client":
        setInputClient(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});
    // Comprobamos que haya una venta
    if (
      inputInvoiceNumber !== "" &&
      inputClient !== "" &&
      detailsSales.length !== 0
    ) {
      if (sale) {
        editSale({
          id: sale.id,
          invoiceNumber: inputInvoiceNumber,
          client: inputClient,
          dateSale: getUnixTime(dateSale),
          total: total,
          detailsSales: detailsSales,
        })
          .then(() => {
            history.push("/sales");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addSale({
          invoiceNumber: inputInvoiceNumber,
          client: inputClient,
          dateSale: getUnixTime(dateSale),
          total: total,
          detailsSales: detailsSales,
        })
          .then(() => {
            setInputInvoiceNumber("");
            setInputClient("");
            setDateSale(new Date());
            setTotal("");
            setDetailsSales([]);

            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "La venta fue agregada correctamente",
            });
          })
          .catch((error) => {
            setEstadoAlerta(true);
            setAlerta({
              tipo: "error",
              mensaje: "El valor ingresado no es el correcto",
            });
          });
      }
    } else {
      setEstadoAlerta(true);
      setAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridInvoiceNumber">
            <Form.Label>N° de Factura</Form.Label>
            <Form.Control
              type="text"
              placeholder="N° de Factura"
              name="invoiceNumber"
              value={inputInvoiceNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridClient">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cliente"
              name="client"
              value={inputClient}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGriddateSale">
            <Form.Label>Fecha de compra</Form.Label>
            <DatePicker fecha={dateSale} setFecha={setDateSale} />
          </Form.Group>
        </Form.Row>
        <FormularioDetailSale
          detailsSales={detailsSales}
          setDetailsSales={setDetailsSales}
          setTotal={setTotal}
        />
        <DetailSaleList
          detailsSales={detailsSales}
          setDetailsSales={setDetailsSales}
          total={total}
          setTotal={setTotal}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {sale ? "Editar Venta" : "Agregar Venta"}
          </Boton>
        </ContenedorBoton>
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          estadoAlerta={estadoAlerta}
          setEstadoAlerta={setEstadoAlerta}
        />
      </Form>
    </>
  );
};

export default FormularioSale;
