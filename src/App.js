import React from "react";
import { Helmet } from "react-helmet";
import Menu from "./components/Menu";
import styled from "styled-components"

const App = () => {
  
  const ContainerIndex = styled.div`
    padding: 0 2.5rem; /* 40px */
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 60rem) {
      /* 950px */
      justify-content: start;
    }
  `;

  return (
    <>
      <Helmet>
        <title>Kalua App</title>
      </Helmet>
      <Menu />

      <ContainerIndex>
        <h1>KALUA APP</h1>
      </ContainerIndex>
    </>
  );
};

export default App;
