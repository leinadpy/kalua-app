import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import { ContenedorBoton } from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editPurchase from "../../firebase/purchases/editPurchase";
import addPurchase from "./../../firebase/purchases/addPurchase";
import { useHistory } from "react-router-dom";
import { Form, Col, Row } from "react-bootstrap";
import DatePicker from "./../DatePicker";
import FormularioDetailPurchase from "./FormularioDetailPurchase";
import DetailPurchaseList from "./DetailPurchaseList";

const FormularioPurchase = ({ purchase }) => {
  const [inputInvoiceNumber, setInputInvoiceNumber] = useState("");
  const [datePurchase, setDatePurchase] = useState(new Date());
  const [total, setTotal] = useState(0);
  const [detailsPurchases, setDetailsPurchases] = useState([]);

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay alguna compra.
    // De ser así establecemos todo el state con los valores de la compra.
    if (purchase) {
      setInputInvoiceNumber(purchase.data().invoiceNumber);

      // etcetera
    }
  }, [purchase]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "invoiceNumber":
        setInputInvoiceNumber(e.target.value);
        break;
      case "datePurchase":
        setDatePurchase(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    // Comprobamos que haya una compra
    if (inputInvoiceNumber !== "") {
      if (purchase) {
        editPurchase({
          id: purchase.id,
          invoiceNumber: inputInvoiceNumber,
          datePurchase: datePurchase,
          total: total,
          detailsPurchases: detailsPurchases,
        })
          .then(() => {
            history.push("/purchases");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addPurchase({
          invoiceNumber: inputInvoiceNumber,
          datePurchase: datePurchase,
          total: total,
          detailsPurchases: detailsPurchases,
        })
          .then(() => {
            setInputInvoiceNumber("");
            setDatePurchase(new Date());
            setTotal("");
            setDetailsPurchases([]);

            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "La compra fue agregada correctamente",
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
          <Form.Group as={Col} controlId="formGridDatePurchase">
            <Form.Label>Fecha de compra</Form.Label>
            <DatePicker fecha={datePurchase} setFecha={setDatePurchase} />
          </Form.Group>
        </Form.Row>

        <FormularioDetailPurchase
          detailsPurchases={detailsPurchases}
          setDetailsPurchases={setDetailsPurchases}
          setTotal={setTotal}
        />

        <DetailPurchaseList detailsPurchases={detailsPurchases} />

        <Form.Group as={Row} controlId="formGridTotal">
          <Form.Label column sm={11}>
            Total
          </Form.Label>
          
          <Col sm={1}>
            {total}
          </Col>
        </Form.Group>

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {purchase ? "Editar Compra" : "Agregar Compra"}
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

export default FormularioPurchase;
