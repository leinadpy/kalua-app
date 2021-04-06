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

import NewLine from "./components/Line/NewLine"
import LineList from "./components/Line/LineList"
import EditLine from "./components/Line/EditLine"

import NewProduct from "./components/Product/NewProduct"
import ProductList from "./components/Product/ProductList"
import EditProduct from "./components/Product/EditProduct"

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

              <RutaPrivada path="/">
                <App />
              </RutaPrivada>
            </Switch>
          </BrowserRouter>
        </Contenedor>
      </AuthProvider>

      <Fondo />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
