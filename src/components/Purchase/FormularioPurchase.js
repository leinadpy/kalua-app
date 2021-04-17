import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import { ContenedorBoton } from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editPurchase from "../../firebase/purchases/editPurchase";
import addPurchase from "./../../firebase/purchases/addPurchase";
import { useHistory } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import DatePicker from "./../DatePicker";
import { getUnixTime } from "date-fns";
import FormularioDetailPurchase from "./FormularioDetailPurchase";
import DetailPurchaseList from "./DetailPurchaseList";
import { fromUnixTime } from "date-fns";

const FormularioPurchase = ({ purchase }) => {
  const [inputInvoiceNumber, setInputInvoiceNumber] = useState("");
  const [datePurchase, setDatePurchase] = useState(new Date());
  const [inputDeduction, setInputDeduction] = useState(0);
  const [total, setTotal] = useState(0);
  const [detailsPurchases, setDetailsPurchases] = useState([]);

  const [totalWithoutDeduction, setTotalWithoutDeduction] = useState(0);

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay alguna compra.
    // De ser así establecemos todo el state con los valores de la compra.
    if (purchase) {
      setInputInvoiceNumber(purchase.data().invoiceNumber);
      setDatePurchase(fromUnixTime(purchase.data().datePurchase));
      setInputDeduction(purchase.data().deduction);
      setTotal(purchase.data().total);
      setTotalWithoutDeduction(purchase.data().totalWithoutDeduction);
      setDetailsPurchases(purchase.data().detailsPurchases);
    }
  }, [purchase]);

  useEffect(() => {
    setTotal(
      totalWithoutDeduction - (inputDeduction * totalWithoutDeduction) / 100
    );
  }, [totalWithoutDeduction, inputDeduction]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "invoiceNumber":
        setInputInvoiceNumber(e.target.value);
        break;
      case "deduction":
        setInputDeduction(e.target.value);
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
    if (inputInvoiceNumber !== "" && detailsPurchases.length !== 0) {
      if (purchase) {
        editPurchase({
          id: purchase.id,
          invoiceNumber: inputInvoiceNumber,
          datePurchase: getUnixTime(datePurchase),
          deduction: inputDeduction,
          total: total,
          totalWithoutDeduction: totalWithoutDeduction,
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
          datePurchase: getUnixTime(datePurchase),
          deduction: inputDeduction,
          total: total,
          totalWithoutDeduction: totalWithoutDeduction,
          detailsPurchases: detailsPurchases,
        })
          .then(() => {
            setInputInvoiceNumber("");
            setDatePurchase(new Date());
            setInputDeduction(0);
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
          <Form.Group as={Col} controlId="formGridDeduction">
            <Form.Label>Descuento</Form.Label>
            <Form.Control
              type="text"
              placeholder="% de descuento"
              name="deduction"
              value={inputDeduction}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <FormularioDetailPurchase
          detailsPurchases={detailsPurchases}
          setDetailsPurchases={setDetailsPurchases}
          setTotalWithoutDeduction={setTotalWithoutDeduction}
        />
        <DetailPurchaseList
          detailsPurchases={detailsPurchases}
          setDetailsPurchases={setDetailsPurchases}
          totalWithoutDeduction={totalWithoutDeduction}
          setTotalWithoutDeduction={setTotalWithoutDeduction}
          deduction={inputDeduction}
          total={total}
        />
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
