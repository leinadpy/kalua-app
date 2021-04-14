import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { BotonAccionSmall } from "./../../elements/ElementosDeLista";
import useGetProducts from "./../../hooks/products/useGetProducts";

const FormularioDetailPurchase = ({
  detailsPurchases,
  setDetailsPurchases,
  setTotal,
}) => {
  const [inputCode, setInputCode] = useState("");
  const [inputproduct, setInputProduct] = useState("");
  const [inputSizeCode, setInputSizeCode] = useState("");
  const [inputColorCode, setInputColorCode] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputPurchPrice, setInputPurchPrice] = useState("");

  const [products] = useGetProducts();

  const completeData = () => {
    if (inputCode !== "") {
      products.forEach((product) => {
        if (product.code === inputCode) {
          setInputPurchPrice(product.basicPrice);
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
      case "purchPrice":
        setInputPurchPrice(e.target.value);
        break;

      default:
        break;
    }
  };

  const calcularSubtotal = () => {
    const sub = inputQuantity * inputPurchPrice;
    setTotal((prevState) => Number(prevState) + Number(sub));
    return sub;
  };

  const addDetail = (e) => {
    e.preventDefault();
    const subtotal = calcularSubtotal();
    setDetailsPurchases([
      ...detailsPurchases,
      {
        id: detailsPurchases.length,
        code: inputCode,
        product: inputproduct,
        sizeCode: inputSizeCode,
        colorCode: inputColorCode,
        quantity: inputQuantity,
        purchPrice: inputPurchPrice,
        subtotal: subtotal,
      },
    ]);
    setInputCode("");
    setInputProduct("");
    setInputSizeCode("");
    setInputColorCode("");
    setInputQuantity("");
    setInputPurchPrice("");
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
        <Form.Group as={Col} controlId="formGridPurchPrice">
          <Form.Label>Precio Compra</Form.Label>
          <Form.Control
            type="text"
            placeholder="Precio Compra"
            name="purchPrice"
            value={inputPurchPrice}
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

export default FormularioDetailPurchase;
