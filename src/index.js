import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contenedor from "./elements/Contenedor";

import InicioSesion from "./components/InicioSesion";
import { Helmet } from "react-helmet";
import favicon from "./imagenes/logo.png";
import Fondo from "./elements/Fondo";
import { AuthProvider } from "./contextos/AuthContext";
import RutaPrivada from "./components/RutaPrivada";

import NewCategory from "./components/Category/NewCategory";
import CategoryList from "./components/Category/CategoryList";
import EditCategory from "./components/Category/EditCategory";

import NewLine from "./components/Line/NewLine";
import LineList from "./components/Line/LineList";
import EditLine from "./components/Line/EditLine";

import NewProduct from "./components/Product/NewProduct";
import ProductList from "./components/Product/ProductList";
import EditProduct from "./components/Product/EditProduct";
import ProductListStock from "./components/Product/ProductListStock";

import NewClient from "./components/Client/NewClient";
import ClientList from "./components/Client/ClientList";
import EditClient from "./components/Client/EditClient";
import ClientsStatus from "./components/Client/ClientsStatus";

import NewPurchase from "./components/Purchase/NewPurchase";
import PurchaseList from "./components/Purchase/PurchaseList";
import EditPurchase from "./components/Purchase/EditPurchase";
import ReportPurchase from "./components/Purchase/ReportPurchase";

import NewSale from "./components/Sale/NewSale";
import SaleList from "./components/Sale/SaleList";
import EditSale from "./components/Sale/EditSale";
import ReportSale from "./components/Sale/ReportSale";
import PDFVisualizationSale from "./components/Sale/PDFVisualizationSale";

import NewReceipt from "./components/Receipt/NewReceipt";
import ReceiptList from "./components/Receipt/ReceiptList";
import EditReceipt from "./components/Receipt/EditReceipt";

import MyDocument from "./pdf/MyDocument"
import PDFVisualization from "./pdf/PDFVisualization";

import { StockProductProvider } from "./contextos/ProductStockContext";

import "bootstrap/dist/css/bootstrap.min.css";

WebFont.load({
  google: {
    // Work+Sans:wght@400;500
    families: ["Work Sans: 400,500, 700", "sans-serif"],
  },
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <StockProductProvider>
          <Contenedor>
            <BrowserRouter>
              <Switch>
                <Route path="/iniciar-sesion" component={InicioSesion} />

                <RutaPrivada path="/categories/new-category">
                  <NewCategory />
                </RutaPrivada>
                <RutaPrivada path="/categories/edit/:id">
                  <EditCategory />
                </RutaPrivada>
                <RutaPrivada path="/categories">
                  <CategoryList />
                </RutaPrivada>

                <RutaPrivada path="/lines/new-line">
                  <NewLine />
                </RutaPrivada>
                <RutaPrivada path="/lines/edit/:id">
                  <EditLine />
                </RutaPrivada>
                <RutaPrivada path="/lines">
                  <LineList />
                </RutaPrivada>

                <RutaPrivada path="/products/new-product">
                  <NewProduct />
                </RutaPrivada>
                <RutaPrivada path="/products/edit/:id">
                  <EditProduct />
                </RutaPrivada>
                <RutaPrivada path="/products">
                  <ProductList />
                </RutaPrivada>
                <RutaPrivada path="/stock">
                  <ProductListStock />
                </RutaPrivada>

                <RutaPrivada path="/clients/new-client">
                  <NewClient />
                </RutaPrivada>
                <RutaPrivada path="/clients/edit/:id">
                  <EditClient />
                </RutaPrivada>
                <RutaPrivada path="/clients/status">
                  <ClientsStatus />
                </RutaPrivada>
                <RutaPrivada path="/clients">
                  <ClientList />
                </RutaPrivada>

                <RutaPrivada path="/purchases/new-purchase">
                  <NewPurchase />
                </RutaPrivada>
                <RutaPrivada path="/purchases/edit/:id">
                  <EditPurchase />
                </RutaPrivada>
                <RutaPrivada path="/purchasesreports">
                  <ReportPurchase />
                </RutaPrivada>
                <RutaPrivada path="/purchases">
                  <PurchaseList />
                </RutaPrivada>

                <RutaPrivada path="/sales/new-sale">
                  <NewSale />
                </RutaPrivada>
                <RutaPrivada path="/sales/edit/:id">
                  <EditSale />
                </RutaPrivada>
                <RutaPrivada path="/salesreports">
                  <ReportSale />
                </RutaPrivada>
                <RutaPrivada path="/sales/pdf/:id">
                  <PDFVisualizationSale />
                </RutaPrivada>
                <RutaPrivada path="/sales">
                  <SaleList />
                </RutaPrivada>

                <RutaPrivada path="/receipts/new-receipt">
                  <NewReceipt />
                </RutaPrivada>
                <RutaPrivada path="/receipts/edit/:id">
                  <EditReceipt />
                </RutaPrivada>
                {/* <RutaPrivada path="/receiptsreports">
                  <ReportReceipt />
                </RutaPrivada> */}
                <RutaPrivada path="/receipts">
                  <ReceiptList />
                </RutaPrivada>

                <RutaPrivada path="/mydocument">
                  <PDFVisualization ToRender={MyDocument} />
                </RutaPrivada>

                <RutaPrivada path="/">
                  <App />
                </RutaPrivada>
              </Switch>
            </BrowserRouter>
          </Contenedor>
        </StockProductProvider>
      </AuthProvider>

      <Fondo />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
