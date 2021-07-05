import React from "react";
import { Header, Titulo } from "../elements/Header";
import { Helmet } from "react-helmet";
import Menu from "../components/Menu";
import { PDFViewer } from "@react-pdf/renderer";
import Contenedor from "./../elements/ContenedorPdf";

const PDFVisualization = ({ ToRender }) => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Reporte PDF</title>
      </Helmet>
      <Header>
        <Titulo>Reporte PDF</Titulo>
      </Header>
      <Contenedor>
        <PDFViewer width={"100%"} height={"100%"}>
          <ToRender />
        </PDFViewer>
      </Contenedor>
    </>
  );
};

export default PDFVisualization;
