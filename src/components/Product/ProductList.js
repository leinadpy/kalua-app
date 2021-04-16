import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetProducts from "./../../hooks/products/useGetProducts";
import deleteProduct from "./../../firebase/products/deleteProduct";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContenedorTabla from "./../../elements/ContenedorTabla";
import Menu from "./../Menu";
import { ReactComponent as IconoEditar } from "./../../imagenes/editar.svg";
import { ReactComponent as IconoBorrar } from "./../../imagenes/borrar.svg";
import { MDBDataTable } from "mdbreact";
import Boton from "./../../elements/Boton";
import { Link } from "react-router-dom";
import convertirAMoneda from "./../../funciones/convertirAMoneda";

const ProductList = () => {
  const [products, setProducts] = useState("");
  const [cargando, setCargando] = useState(true);

  const [dataProducts] = useGetProducts();

  useEffect(() => {
    var datosFormateados = [];
    var datoFormateado = {};
    const formatData = (datos) => {
      datos.forEach((dato) => {
        datoFormateado = {
          code: dato.code,
          description: dato.description,
          line: dato.line,
          category: dato.category,
          basicPrice: convertirAMoneda(dato.basicPrice),
          distPrice: convertirAMoneda(dato.distPrice),
          publicPrice: convertirAMoneda(dato.publicPrice),
          abm: (
            <>
              <Boton to={`/products/edit/${dato.id}`} small="true" as={Link}>
                <IconoEditar />
              </Boton>
              <Boton small="true" onClick={() => deleteProduct(dato.id)}>
                <IconoBorrar />
              </Boton>
            </>
          ),
        };
        datosFormateados.push(datoFormateado);
      });
    };
    formatData(dataProducts);
    setProducts(datosFormateados);
    setCargando(false);
  }, [dataProducts]);

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
        field: "description",
        sort: "asc",
        width: 150,
      },
      {
        label: "Línea",
        field: "line",
        sort: "asc",
        width: 150,
      },
      {
        label: "Categoría",
        field: "category",
        sort: "asc",
        width: 150,
      },
      {
        label: "Precio base",
        field: "basicPrice",
        sort: "asc",
        width: 150,
      },
      {
        label: "Precio distribuidor",
        field: "distPrice",
        sort: "asc",
        width: 150,
      },
      {
        label: "Precio público",
        field: "publicPrice",
        sort: "asc",
        width: 150,
      },
      {
        label: "ABM",
        field: "abm",
        sort: "asc",
        width: 100,
      },
    ],
    rows: products,
  };

  return (
    <>
      <Helmet>
        <title>Lista de productos</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de productos</Titulo>
        </ContenedorHeader>
      </Header>

      {!cargando ? (
        dataProducts.length !== 0 ? (
          <ContenedorTabla>
            <MDBDataTable striped bordered small data={data} />
          </ContenedorTabla>
        ) : (
          <h3>No hay productos para mostrar</h3>
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

export default ProductList;
