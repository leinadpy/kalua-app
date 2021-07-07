import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import Menu from "../Menu";
import Contenedor from "./../../elements/ContenedorPdf";
import SaleToPDF from "./SaleToPDF";
import { useParams } from "react-router-dom";
import useGetSale from "./../../hooks/sales/useGetSale";

const PDFVisualizationClientStatus = () => {
  const { id } = useParams();
  const [sale] = useGetSale(id);

  return (
    <>
      <Menu />
      <Helmet>
        <title>Estado de cuenta Cliente</title>
      </Helmet>
      <Header>
        <Titulo>Estado de cuenta Cliente PDF</Titulo>
      </Header>
      <Contenedor>
        <SaleToPDF sale={sale} />
      </Contenedor>
    </>
  );
};

export default PDFVisualizationClientStatus;
