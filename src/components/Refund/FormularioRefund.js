import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import { ContenedorBoton } from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editRefund from "../../firebase/refunds/editRefund";
import addRefund from "./../../firebase/refunds/addRefund";
import { useHistory } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import DatePicker from "./../DatePicker";
import { getUnixTime } from "date-fns";
import FormularioDetailRefund from "./FormularioDetailRefund";
import DetailRefundList from "./DetailRefundList";
import { fromUnixTime } from "date-fns";

const FormularioRefund = ({ refund }) => {
  const [inputInvoiceNumber, setInputInvoiceNumber] = useState("");
  const [inputClient, setInputClient] = useState("");
  const [dateRefund, setDateRefund] = useState(new Date());
  const [total, setTotal] = useState(0);
  const [detailsRefunds, setDetailsRefunds] = useState([]);

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay alguna compra.
    // De ser así establecemos todo el state con los valores de la compra.
    if (refund) {
      setInputInvoiceNumber(refund.data().invoiceNumber);
      setInputClient(refund.data().client);
      setDateRefund(fromUnixTime(refund.data().dateRefund));
      setTotal(refund.data().total);
      setDetailsRefunds(refund.data().detailsRefunds);
    }
  }, [refund]);

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
      detailsRefunds.length !== 0
    ) {
      if (refund) {
        editRefund({
          id: refund.id,
          invoiceNumber: inputInvoiceNumber,
          client: inputClient,
          dateRefund: getUnixTime(dateRefund),
          total: total,
          detailsRefunds: detailsRefunds,
        })
          .then(() => {
            history.push("/refunds");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addRefund({
          invoiceNumber: inputInvoiceNumber,
          client: inputClient,
          dateRefund: getUnixTime(dateRefund),
          total: total,
          detailsRefunds: detailsRefunds,
        })
          .then(() => {
            setInputInvoiceNumber("");
            setInputClient("");
            setDateRefund(new Date());
            setTotal("");
            setDetailsRefunds([]);

            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "La devolución fue agregada correctamente",
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
          <Form.Group as={Col} controlId="formGridDateRefund">
            <Form.Label>Fecha de compra</Form.Label>
            <DatePicker fecha={dateRefund} setFecha={setDateRefund} />
          </Form.Group>
        </Form.Row>
        <FormularioDetailRefund
          detailsRefunds={detailsRefunds}
          setDetailsRefunds={setDetailsRefunds}
          setTotal={setTotal}
        />
        <DetailRefundList
          detailsRefunds={detailsRefunds}
          setDetailsRefunds={setDetailsRefunds}
          total={total}
          setTotal={setTotal}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {refund ? "Editar Devolución" : "Agregar Devolución"}
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

export default FormularioRefund;
