import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { BotonAccionSmall } from "./../../elements/ElementosDeLista";
import useGetProducts from "./../../hooks/products/useGetProducts";

const FormularioDetailSale = ({
  detailsSales,
  setDetailsSales,
  setTotal,
}) => {
  const [inputCode, setInputCode] = useState("");
  const [inputproduct, setInputProduct] = useState("");
  const [inputSizeCode, setInputSizeCode] = useState("");
  const [inputColorCode, setInputColorCode] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputSalePrice, setInputSalePrice] = useState("");

//   const [quantityAvailable, setQuantityAvailable] = useState("");

  const [products] = useGetProducts();

  const completeData = () => {
    if (inputCode !== "") {
      products.forEach((product) => {
        if (product.code === inputCode) {
          setInputProduct(product.description);
        }
      });
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "code":
        setInputCode(e.target.value);
        break;
      case "product":
        setInputProduct(e.target.value);
        break;
      case "sizeCode":
        setInputSizeCode(e.target.value);
        break;
      case "colorCode":
        setInputColorCode(e.target.value);
        break;
      case "quantity":
        setInputQuantity(e.target.value);
        break;
      case "salePrice":
        setInputSalePrice(e.target.value);
        break;

      default:
        break;
    }
  };

  const calcularSubtotal = () => {
    const sub = inputQuantity * inputSalePrice;
    setTotal((prevState) => prevState + sub);
    return sub;
  };

  const addDetail = (e) => {
    e.preventDefault();
    const subtotal = calcularSubtotal();
    setDetailsSales([
      ...detailsSales,
      {
        id: detailsSales.length,
        code: inputCode,
        product: inputproduct,
        sizeCode: inputSizeCode,
        colorCode: inputColorCode,
        quantity: inputQuantity,
        salePrice: inputSalePrice,
        subtotal: subtotal,
      },
    ]);
    setInputCode("");
    setInputProduct("");
    setInputSizeCode("");
    setInputColorCode("");
    setInputQuantity("");
    setInputSalePrice("");
  };

  return (
    <>
      <h3>Agregar productos</h3>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCodeProduct">
          <Form.Label>Código Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Código Producto"
            name="code"
            value={inputCode}
            onChange={handleChange}
            onBlur={completeData}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridProduct">
          <Form.Label>Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Producto"
            name="product"
            value={inputproduct}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridSizeCode">
          <Form.Label>Código Tamaño</Form.Label>
          <Form.Control
            type="text"
            placeholder="Código Tamaño"
            name="sizeCode"
            value={inputSizeCode}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridColorCode">
          <Form.Label>Código Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Código Color"
            name="colorCode"
            value={inputColorCode}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridQuantity">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Cantidad"
            name="quantity"
            value={inputQuantity}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridSalePrice">
          <Form.Label>Precio Venta</Form.Label>
          <Form.Control
            type="text"
            placeholder="Precio Venta"
            name="salePrice"
            value={inputSalePrice}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddDetail">
          <BotonAccionSmall onClick={(e) => addDetail(e)}>
            Agregar detalle
          </BotonAccionSmall>
        </Form.Group>
      </Form.Row>
    </>
  );
};

export default FormularioDetailSale;
