// import React, { useState } from "react";
// import { Form, Col } from "react-bootstrap";
// import { BotonAccionSmall } from "./../../elements/ElementosDeLista";
// import useGetSales from "./../../hooks/sales/useGetSales";

// const FormularioDetailReceipt = ({
//   detailsSales,
//   setDetailsSales,
//   setTotal,
//   setEstadoAlerta,
//   setAlerta,
//   typeOfClient,
// }) => {
//   const [inputCode, setInputCode] = useState("");
//   const [inputproduct, setInputProduct] = useState("");
//   const [inputSizeCode, setInputSizeCode] = useState("");
//   const [inputColorCode, setInputColorCode] = useState("");
//   const [inputQuantity, setInputQuantity] = useState("");
//   const [inputSalePrice, setInputSalePrice] = useState("");


//   const [quantityAvailable, setQuantityAvailable] = useState(0);

//   const [sales] = useGetSales();

//   const getAvailableProducts = () => {
//     if (inputCode !== "" && inputSizeCode !== "" && inputColorCode !== "") {
//       let available = false;
//       let restar = 0;
//       detailsSales.forEach((detail) => {
//         if (
//           inputCode === detail.code &&
//           inputSizeCode === detail.sizeCode &&
//           inputColorCode === detail.colorCode
//         ) {
//           restar = detail.quantity;
//         }
//       });
//       dataProductsStock.forEach((stock) => {
//         if (
//           inputCode === stock.code &&
//           inputSizeCode === stock.sizeCode &&
//           inputColorCode === stock.colorCode
//         ) {
//           available = true;
//           setQuantityAvailable(stock.quantity - restar);
//         }
//       });
//       if (!available) setQuantityAvailable(0);
//     }
//   };

//   const completeData = () => {
//     if (inputCode !== "") {
//       products.forEach((product) => {
//         if (product.code === inputCode) {
//           setInputProduct(product.description);
//           setInputSalePrice(
//             typeOfClient === "Distribuidor"
//               ? product.distPrice
//               : product.publicPrice
//           );
//         }
//       });
//     }
//   };

//   const handleChange = (e) => {
//     switch (e.target.name) {
//       case "code":
//         setInputCode(e.target.value);
//         break;
//       case "product":
//         setInputProduct(e.target.value);
//         break;
//       case "sizeCode":
//         setInputSizeCode(e.target.value);
//         break;
//       case "colorCode":
//         setInputColorCode(e.target.value);
//         break;
//       case "quantity":
//         setInputQuantity(e.target.value);
//         break;
//       case "salePrice":
//         setInputSalePrice(e.target.value);
//         break;

//       default:
//         break;
//     }
//   };

//   const calcularSubtotal = () => {
//     const sub = inputQuantity * inputSalePrice;
//     setTotal((prevState) => prevState + sub);
//     return sub;
//   };

//   const addDetail = (e) => {
//     e.preventDefault();
//     if (inputQuantity <= quantityAvailable) {
//       const subtotal = calcularSubtotal();
//       setDetailsSales([
//         ...detailsSales,
//         {
//           id: detailsSales.length,
//           code: inputCode,
//           product: inputproduct,
//           sizeCode: inputSizeCode,
//           colorCode: inputColorCode,
//           quantity: inputQuantity,
//           salePrice: inputSalePrice,
//           subtotal: subtotal,
//         },
//       ]);
//       setInputCode("");
//       setInputProduct("");
//       setInputSizeCode("");
//       setInputColorCode("");
//       setInputQuantity("");
//       setInputSalePrice("");
//       setQuantityAvailable(0);
//     } else {
//       setEstadoAlerta(true);
//       setAlerta({
//         tipo: "error",
//         mensaje: "La cantidad a vender es mayor a la disponible",
//       });
//     }
//   };

//   return (
//     <>
//       <h3>Agregar productos</h3>

//       <Form.Row>
//         <Form.Group as={Col} controlId="formGridCodeProduct">
//           <Form.Label>Código Producto</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Código Producto"
//             name="code"
//             value={inputCode}
//             onChange={handleChange}
//             onBlur={completeData}
//           />
//         </Form.Group>
//         <Form.Group as={Col} controlId="formGridProduct">
//           <Form.Label>Producto</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Producto"
//             name="product"
//             value={inputproduct}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group as={Col} controlId="formGridSizeCode">
//           <Form.Label>Código Tamaño</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Código Tamaño"
//             name="sizeCode"
//             value={inputSizeCode}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group as={Col} controlId="formGridColorCode">
//           <Form.Label>Código Color</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Código Color"
//             name="colorCode"
//             value={inputColorCode}
//             onChange={handleChange}
//           />
//         </Form.Group>
//       </Form.Row>
//       <Form.Row>
//         <Form.Group as={Col} controlId="formGridQuantity">
//           <Form.Label>Cantidad</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Cantidad"
//             name="quantity"
//             value={inputQuantity}
//             onChange={handleChange}
//             onFocus={getAvailableProducts}
//           />
//         </Form.Group>
//         <Form.Group as={Col} controlId="formGridQuantityAvailable">
//           <Form.Label>Cantidad Disponible</Form.Label>
//           <Form.Control
//             type="text"
//             name="quantityAvailable"
//             value={quantityAvailable}
//             readOnly
//           />
//         </Form.Group>
//         <Form.Group as={Col} controlId="formGridSalePrice">
//           <Form.Label>Precio Venta {typeOfClient} </Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Precio Venta"
//             name="salePrice"
//             value={inputSalePrice}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group as={Col} controlId="formGridAddDetail">
//           <BotonAccionSmall onClick={(e) => addDetail(e)}>
//             Agregar detalle
//           </BotonAccionSmall>
//         </Form.Group>
//       </Form.Row>
//     </>
//   );
// };

// export default FormularioDetailReceipt;
