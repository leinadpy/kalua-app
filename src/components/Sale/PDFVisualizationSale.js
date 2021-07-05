import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import Menu from "../Menu";
import Contenedor from "./../../elements/ContenedorPdf";
import SaleToPDF from "./SaleToPDF";
import { useParams } from "react-router-dom";
import useGetSale from "./../../hooks/sales/useGetSale";

const PDFVisualizationSale = () => {
  const { id } = useParams();
  const [sale] = useGetSale(id);

  return (
    <>
      <Menu />
      <Helmet>
        <title>Reporte Venta PDF</title>
      </Helmet>
      <Header>
        <Titulo>Reporte Venta PDF</Titulo>
      </Header>
      <Contenedor>
        <SaleToPDF sale={sale} />
      </Contenedor>
    </>
  );
};

export default PDFVisualizationSale;
