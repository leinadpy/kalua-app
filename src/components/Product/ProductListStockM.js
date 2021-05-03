import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import { useStockProduct } from "./../../contextos/ProductStockContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContenedorTabla from "./../../elements/ContenedorTabla";
import Menu from "./../Menu";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Boton from "./../../elements/Boton";
import { Link } from "react-router-dom";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

const { SearchBar } = Search;

const ProductListStockM = () => {
  const [productsStock, setProductsStock] = useState("");
  const [cargando, setCargando] = useState(true);

  const dataProductsStock = useStockProduct();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato, index) => {
        datoFormateado = {
          id: index,
          code: dato.code,
          product: dato.product,
          sizeCode: dato.sizeCode,
          colorCode: dato.colorCode,
          quantity: dato.quantity,
          idPurchase: dato.idPurchase,
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataProductsStock);
    setProductsStock(datosFormateados);
    setCargando(false);
  }, [dataProductsStock]);

  const dataProducts = productsStock;
  const columns = [
    { dataField: "code", text: "Código" },
    { dataField: "product", text: "Descripción" },
    { dataField: "sizeCode", text: "Tamaño" },
    { dataField: "colorCode", text: "Color" },
    { dataField: "quantity", text: "Cantidad" },
  ];

  const expandRow = {
    renderer: (row) => (
      <div>
        {productsStock[row.id].idPurchase &&
          productsStock[row.id].idPurchase.map((purchase) => (
            <p key={row.id}>
              <Boton
                to={`/purchases/edit/${purchase}`}
                small="true"
                as={Link}
                style={{ textDecoration: "none" }}
              >
                Ir a compra
              </Boton>
            </p>
          ))}
      </div>
    ),
    showExpandColumn: true,
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
            <ToolkitProvider
              keyField="id"
              data={dataProducts}
              columns={columns}
              search
            >
              {(props) => (
                <div>
                  <h3>Input something at below input field:</h3>
                  {/* <SearchBar
                    {...props.searchProps}
                    className="custome-search-field"
                    style={{ color: "black" }}
                    delay={1000}
                    placeholder="Search Something!!!"
                  /> */}
                  <SearchBar {...props.searchProps} />
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    expandRow={expandRow}
                    pagination={paginationFactory()}
                    striped
                    hover
                  />
                </div>
              )}
            </ToolkitProvider>
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

export default ProductListStockM;
