import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import convertirAMoneda from "./../../funciones/convertirAMoneda";
import { ReactComponent as IconoBorrar } from "./../../imagenes/borrar.svg";
import { BotonAccion } from "./../../elements/ElementosDeLista";

const Cabecera = styled.th`
  text-align: center;
`;

const Fila = styled.td`
  text-align: center;
`;

const DetailRefundList = ({ detailsRefunds, setDetailsRefunds, total, setTotal }) => {
  const onRemoveItem = (e, index) => {
    e.preventDefault();
    setTotal((prevState) => prevState - detailsRefunds[index].subtotal);
    const newDetailsRefunds = detailsRefunds.filter((item, j) => index !== j);
    setDetailsRefunds(newDetailsRefunds);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <Cabecera>X</Cabecera>
          <Cabecera>Código Producto</Cabecera>
          <Cabecera>Producto</Cabecera>
          <Cabecera>Tamaño</Cabecera>
          <Cabecera>Color</Cabecera>
          <Cabecera>Cantidad</Cabecera>
          <Cabecera>Precio Unitario</Cabecera>
          <Cabecera>Subtotal</Cabecera>
        </tr>
      </thead>
      <tbody>
        {detailsRefunds.map((detail, index) => (
          <tr key={index}>
            <Fila>
              <BotonAccion onClick={(e) => onRemoveItem(e, index)}>
                <IconoBorrar />
              </BotonAccion>
            </Fila>
            <Fila>{detail.code}</Fila>
            <Fila>{detail.product}</Fila>
            <Fila>{detail.sizeCode}</Fila>
            <Fila>{detail.colorCode}</Fila>
            <Fila>{detail.quantity}</Fila>
            <Fila>{convertirAMoneda(detail.refundPrice)}</Fila>
            <Fila>{convertirAMoneda(detail.subtotal)}</Fila>
          </tr>
        ))}

        <tr>
          <Fila>Total</Fila>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <Fila>{convertirAMoneda(total)}</Fila>
        </tr>
      </tbody>
    </Table>
  );
};

export default DetailRefundList;
