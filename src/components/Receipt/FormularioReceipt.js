import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import { ContenedorBoton } from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editReceipt from "../../firebase/receipts/editReceipt";
import addReceipt from "./../../firebase/receipts/addReceipt";
import { useHistory } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import DatePicker from "./../DatePicker";
import { getUnixTime } from "date-fns";
import { fromUnixTime } from "date-fns";
import useGetClients from "./../../hooks/clients/useGetClients";
import useGetSales from "./../../hooks/sales/useGetSales";
import styled from "styled-components";
import theme from "./../../theme";
import convertirAMoneda from "./../../funciones/convertirAMoneda";
import { Table } from "react-bootstrap";
import {
  BotonAccionSmall,
  BotonAccionSmallForm,
} from "./../../elements/ElementosDeLista";
import formatearFecha from "./../../funciones/formatearFecha";
import editSaleCredit from "./../../firebase/sales/editSaleCredit";

const Cabecera = styled.th`
  text-align: center;
`;

const Fila = styled.td`
  text-align: center;
`;

const Opciones = styled.div`
  background: ${theme.grisClaro};
  position: absolute;
  top: 4.5rem;
  left: 0;
  width: 100%;
  border-radius: 0.625rem; /* 10px */
  max-height: 18.75rem; /* 300px */
  overflow-y: auto;
  z-index: 200;
`;

const Opcion = styled.div`
  padding: 1rem; /* 20px */
  display: flex;
  z-index: 200;
  svg {
    width: 28px;
    height: auto;
    margin-right: 1.25rem; /* 20px */
  }
  &:hover {
    background: ${theme.grisClaro2};
  }
`;

const FormularioReceipt = ({ receipt }) => {
  const [clients] = useGetClients();
  const [sales] = useGetSales();

  const [dataList, setDataList] = useState([]);
  const [dataMatch, setDataMatch] = useState([]);

  const [paidingUp, setPaidingUp] = useState(false);
  const [objectIndexToModify, setObjectIndexToModify] = useState("");
  const [invoiceNumberCredit, setInvoiceNumberCredit] = useState("");
  const [dateSaleCredit, setDateSaleCredit] = useState("");
  const [inputAmountToPay, setInputAmountToPay] = useState(0);

  const [inputInvoiceReceipt, setInputInvoiceReceipt] = useState("");
  const [inputClient, setInputClient] = useState("");
  const [dateReceipt, setDateReceipt] = useState(new Date());
  const [total, setTotal] = useState(0);
  const [salesCreditPaidUp, setSalesCreditPaidUp] = useState([]);
  const [oldSales, setOldSales] = useState([]);

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    setDataList(clients);
    if (receipt) {
      setInputInvoiceReceipt(receipt.data().invoiceReceipt);
      setInputClient(receipt.data().client);
      setDateReceipt(fromUnixTime(receipt.data().dateReceipt));
      setTotal(receipt.data().total);
      setSalesCreditPaidUp(receipt.data().salesCreditPaidUp);
      setOldSales(receipt.data().salesCreditPaidUp);
    }
  }, [receipt, clients]);

  const chargeSalesCredit = (comparador) => {
    if (comparador !== "") {
      let salesFromClient = [];
      let saleFromClient = {};
      sales.forEach((sale) => {
        if (
          sale.client === comparador &&
          sale.typeOfSale !== "Contado" &&
          sale.paidUp < sale.total
        ) {
          saleFromClient = {
            idSale: sale.id,
            invoiceNumber: sale.invoiceNumber,
            dateSale: sale.dateSale,
            totalSale: sale.total,
            paidUpSale: sale.paidUp,
            amountPaid: 0,
          };
          salesFromClient.push(saleFromClient);
        }
      });
      setSalesCreditPaidUp(salesFromClient);
    }
  };

  const searchData = (text) => {
    if (!text) {
      setDataMatch([]);
    } else {
      let matches = dataList.filter((data) => {
        const regex = new RegExp(`${text}`, "gi");
        return data.name.match(regex);
      });
      setDataMatch(matches);
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "invoiceReceipt":
        setInputInvoiceReceipt(e.target.value);
        break;
      case "client":
        setInputClient(e.target.value);
        searchData(e.target.value);
        break;
      case "amountToPay":
        setInputAmountToPay(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    setInputClient(e.currentTarget.dataset.valor);
    setDataMatch([]);
    chargeSalesCredit(e.currentTarget.dataset.valor);
  };

  /**
   * Abre el formulario de facturas que se pagaran, para definir el monto a pagar
   */
  const addToGoToPay = (e) => {
    e.preventDefault();
    setObjectIndexToModify(e.target.id);
    setInvoiceNumberCredit(salesCreditPaidUp[e.target.id].invoiceNumber);
    setDateSaleCredit(
      formatearFecha(salesCreditPaidUp[e.target.id].dateSale, "dd/MM/yyyy")
    );
    setInputAmountToPay(
      salesCreditPaidUp[e.target.id].totalSale -
        salesCreditPaidUp[e.target.id].paidUpSale
    );
    setPaidingUp(true);
  };

  /**
   * Abre el formulario para modificar un recibo que se cargó anteriormente
   * @param {event} e
   */
  const modifyToGoToPay = (e) => {
    e.preventDefault();
    setObjectIndexToModify(e.target.id);
    setInvoiceNumberCredit(salesCreditPaidUp[e.target.id].invoiceNumber);
    setDateSaleCredit(
      formatearFecha(salesCreditPaidUp[e.target.id].dateSale, "dd/MM/yyyy")
    );
    setInputAmountToPay(
      salesCreditPaidUp[e.target.id].totalSale -
        salesCreditPaidUp[e.target.id].paidUpSale
    );
    setPaidingUp(true);
    setTotal(
      (prevState) =>
        prevState - Number(salesCreditPaidUp[e.target.id].amountPaid)
    );
  };

  /**
   * Agrega un detalle al recibo
   * @param {event} e
   */
  const addToPay = (e) => {
    e.preventDefault();
    const newSalesCreditPaidUp = salesCreditPaidUp.map((sale, index) => {
      if (index.toString() === objectIndexToModify) {
        return {
          ...sale,
          paidingUp: true,
          amountPaid: Number(inputAmountToPay),
        };
      }
      return sale;
    });
    setSalesCreditPaidUp(newSalesCreditPaidUp);
    setTotal((prevState) => prevState + Number(inputAmountToPay));
    setObjectIndexToModify("");
    setInvoiceNumberCredit("");
    setDateSaleCredit("");
    setInputAmountToPay("");
    setPaidingUp(false);
  };

  /**
   * Guarda el recibo en la base de datos. Modifica el campo de la colleccion sales de paidUp
   * @param {event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});
    if (
      inputInvoiceReceipt !== "" &&
      inputClient !== "" &&
      salesCreditPaidUp.length !== 0
    ) {
      if (receipt) {
        editReceipt({
          id: receipt.id,
          invoiceReceipt: inputInvoiceReceipt,
          client: inputClient,
          dateReceipt: getUnixTime(dateReceipt),
          total: total,
          salesCreditPaidUp: salesCreditPaidUp,
        })
          .then(() => {
            salesCreditPaidUp.forEach((sale, index) => {
              if (oldSales[index].amountPaid !== sale.amountPaid) {
                let paidUp = 0;
                sales.forEach((saleOriginal) => {
                  if (saleOriginal.invoiceNumber === sale.invoiceNumber) {
                    paidUp = saleOriginal.paidUp;
                  }
                });
                editSaleCredit({
                  id: sale.idSale,
                  paidUp:
                    sale.amountPaid + 
                    paidUp - 
                    oldSales[index].amountPaid, 
                });
              }
            });
          })
          .then(() => {
            history.push("/receipts");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addReceipt({
          invoiceReceipt: inputInvoiceReceipt,
          client: inputClient,
          dateReceipt: getUnixTime(dateReceipt),
          total: total,
          salesCreditPaidUp: salesCreditPaidUp,
        })
          .then(() => {
            salesCreditPaidUp.forEach((sale) => {
              editSaleCredit({
                id: sale.idSale,
                paidUp: sale.amountPaid + sale.paidUpSale,
              });
            });
          })
          .then(() => {
            setInputInvoiceReceipt("");
            setInputClient("");
            setDateReceipt(new Date());
            setTotal(0);
            setSalesCreditPaidUp([]);

            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "El recibo fue agregado correctamente",
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
            <Form.Label>N° de Recibo</Form.Label>
            <Form.Control
              type="text"
              placeholder="N° de Recibo"
              name="invoiceReceipt"
              value={inputInvoiceReceipt}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridClient">
            <Form.Label>Cliente</Form.Label>
            {!receipt ? (
              <Form.Control
                type="text"
                placeholder="Cliente"
                name="client"
                value={inputClient}
                onChange={handleChange}
              />
            ) : (
              <Form.Control
                type="text"
                placeholder="Cliente"
                name="client"
                value={inputClient}
                readOnly
              />
            )}
            {dataMatch && (
              <Opciones>
                {dataMatch.map((item, index) => (
                  <Opcion
                    key={index}
                    data-valor={item.name}
                    data-type={item.typeOfClient}
                    onClick={handleClick}
                  >
                    {item.name}
                  </Opcion>
                ))}
              </Opciones>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="formGriddateReceipt">
            <Form.Label>Fecha del recibo</Form.Label>
            <DatePicker fecha={dateReceipt} setFecha={setDateReceipt} />
          </Form.Group>
        </Form.Row>
        {paidingUp && (
          <Form.Row>
            <Form.Group as={Col} xs={3} controlId="formGridToPay">
              <Form.Label>N° Factura</Form.Label>
              <Form.Control
                type="text"
                name="invoiceNumberCredit"
                value={invoiceNumberCredit}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} xs={3} controlId="formGridToPay">
              <Form.Label>Fecha venta</Form.Label>
              <Form.Control
                type="text"
                name="dateSaleCredit"
                value={dateSaleCredit}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} xs={3} controlId="formGridToPay">
              <Form.Label>Monto a pagar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Monto a pagar"
                name="amountToPay"
                value={inputAmountToPay}
                onChange={handleChange}
              />
            </Form.Group>
            <BotonAccionSmall onClick={(e) => addToPay(e)}>
              Pagar
            </BotonAccionSmall>
          </Form.Row>
        )}
        {salesCreditPaidUp.length===0
        ?
        <h4>No hay ventas de crédito pendientes</h4>
        :
        <Table striped bordered hover>
          <thead>
            <tr>
              <Cabecera>N° Factura</Cabecera>
              <Cabecera>Fecha venta</Cabecera>
              <Cabecera>Saldo</Cabecera>
              <Cabecera>Pagar</Cabecera>
              <Cabecera>Monto</Cabecera>
            </tr>
          </thead>
          <tbody>
            {salesCreditPaidUp.map((detail, index) => (
              <tr key={index}>
                <Fila>{detail.invoiceNumber}</Fila>
                <Fila>{formatearFecha(detail.dateSale, "dd/MM/yyyy")}</Fila>
                <Fila>
                  {convertirAMoneda(detail.totalSale - detail.paidUpSale)}
                </Fila>
                <Fila>
                  {detail.paidingUp ? (
                    <BotonAccionSmallForm
                      id={index}
                      onClick={(e) => modifyToGoToPay(e)}
                    >
                      Modificar
                    </BotonAccionSmallForm>
                  ) : (
                    <BotonAccionSmallForm
                      id={index}
                      onClick={(e) => addToGoToPay(e)}
                    >
                      Pagar
                    </BotonAccionSmallForm>
                  )}
                </Fila>
                <Fila>{convertirAMoneda(detail.amountPaid)}</Fila>
              </tr>
            ))}

            <tr>
              <Fila>Total</Fila>
              <td></td>
              <td></td>
              <td></td>
              <Fila>{convertirAMoneda(total)}</Fila>
            </tr>
          </tbody>
        </Table>
        }
        
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {receipt ? "Editar Recibo" : "Agregar Recibo"}
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

export default FormularioReceipt;
