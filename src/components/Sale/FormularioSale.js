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
import useGetClients from "./../../hooks/clients/useGetClients";
import styled from "styled-components";
import theme from "./../../theme";

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

const FormularioSale = ({ sale }) => {
  const [clients] = useGetClients();

  const [dataList, setDataList] = useState([]);
  const [dataMatch, setDataMatch] = useState([]);

  const [inputInvoiceNumber, setInputInvoiceNumber] = useState("");
  const [inputClient, setInputClient] = useState("");
  const [typeOfClient, setTypeOfClient] = useState("");
  const [dateSale, setDateSale] = useState(new Date());
  const [radiusTypeOfSale, setRadiusTypeOfSale] = useState("Crédito");
  const [total, setTotal] = useState(0);
  const [detailsSales, setDetailsSales] = useState([]);
  const [paidUp, setPaidUp] = useState(0);

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    setDataList(clients);
    // Comprobamos si ya hay alguna venta.
    // De ser así establecemos todo el state con los valores de la venta.
    if (sale) {
      setInputInvoiceNumber(sale.data().invoiceNumber);
      setInputClient(sale.data().client);
      setTypeOfClient(sale.data().typeOfClient);
      setDateSale(fromUnixTime(sale.data().dateSale));
      setRadiusTypeOfSale(sale.data().typeOfSale);
      setTotal(sale.data().total);
      setDetailsSales(sale.data().detailsSales);
      setPaidUp(sale.data().paidUp);
    }
  }, [sale, clients]);

  useEffect(() => {
    if (radiusTypeOfSale !== "Contado") {
      setPaidUp(0);
    } else {
      setPaidUp(total);
    }
  }, [radiusTypeOfSale, setPaidUp, total]);

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
      case "invoiceNumber":
        setInputInvoiceNumber(e.target.value);
        break;
      case "client":
        setInputClient(e.target.value);
        searchData(e.target.value);
        break;
      case "typeOfSale":
        setRadiusTypeOfSale(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    setInputClient(e.currentTarget.dataset.valor);
    setTypeOfClient(e.currentTarget.dataset.type);
    setDataMatch([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});
    if (
      inputInvoiceNumber !== "" &&
      inputClient !== "" &&
      detailsSales.length !== 0
    ) {
      // Comprobamos que haya una venta
      if (sale) {
        editSale({
          id: sale.id,
          invoiceNumber: inputInvoiceNumber,
          client: inputClient,
          typeOfClient: typeOfClient,
          dateSale: getUnixTime(dateSale),
          typeOfSale: radiusTypeOfSale,
          total: total,
          detailsSales: detailsSales,
          paidUp: paidUp,
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
          typeOfClient: typeOfClient,
          dateSale: getUnixTime(dateSale),
          typeOfSale: radiusTypeOfSale,
          total: total,
          detailsSales: detailsSales,
          paidUp: paidUp,
        })
          .then(() => {
            setInputInvoiceNumber("");
            setInputClient("");
            setDateSale(new Date());
            setTotal(0);
            setDetailsSales([]);
            setPaidUp(0);

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
          <Form.Group as={Col} controlId="formGriddateSale">
            <Form.Label>Fecha de compra</Form.Label>
            <DatePicker fecha={dateSale} setFecha={setDateSale} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridTypeOfSale">
            <Form.Label>Tipo de Venta</Form.Label>
            <Form.Check
              label="Crédito"
              type="radio"
              name="typeOfSale"
              value="Crédito"
              checked={radiusTypeOfSale === "Crédito"}
              onChange={handleChange}
            />
            <Form.Check
              label="Contado"
              type="radio"
              name="typeOfSale"
              value="Contado"
              checked={radiusTypeOfSale === "Contado"}
              onChange={handleChange}
            />
            <Form.Check
              label="Muestra"
              type="radio"
              name="typeOfSale"
              value="Muestra"
              checked={radiusTypeOfSale === "Muestra"}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <FormularioDetailSale
          detailsSales={detailsSales}
          setDetailsSales={setDetailsSales}
          setTotal={setTotal}
          setEstadoAlerta={setEstadoAlerta}
          setAlerta={setAlerta}
          typeOfClient={typeOfClient}
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
