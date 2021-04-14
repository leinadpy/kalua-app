import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import {useStockProduct} from "./../../contextos/ProductStockContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContenedorTabla from "./../../elements/ContenedorTabla";
import Menu from "./../Menu";
import { MDBDataTable } from "mdbreact";

const ProductListStock = () => {
  const [productsStock, setProductsStock] = useState("");
  const [cargando, setCargando] = useState(true);

  const dataProductsStock = useStockProduct();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        datoFormateado = {
          code: dato.code,
          product: dato.product,
          sizeCode: dato.sizeCode,
          colorCode: dato.colorCode,
          quantity: dato.quantity,
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataProductsStock);
    setProductsStock(datosFormateados);
    setCargando(false);
  }, [dataProductsStock]);

  const data = {
    columns: [
      {
        label: "Código",
        field: "code",
        sort: "asc",
        width: 150,
      },
      {
        label: "Descripción",
        field: "product",
        sort: "asc",
        width: 150,
      },
      {
        label: "Tamaño",
        field: "sizeCode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Color",
        field: "colorCode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Cantidad",
        field: "quantity",
        sort: "asc",
        width: 150,
      }
    ],
    rows: productsStock,
  };

  return (
    <>
      <Helmet>
        <title>Stock de productos</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Stock de productos</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        dataProductsStock.length !== 0 ? (
          <ContenedorTabla>
            <MDBDataTable striped bordered small data={data} />
          </ContenedorTabla>
        ) : (
          <h3>No hay productos en stock para mostrar</h3>
        )
      ) : (
        <div
          className="spinner-grow text-primary w-50 text-center mx-auto p-3 mt-2 h-100"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

export default ProductListStock;
