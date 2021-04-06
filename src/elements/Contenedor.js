import styled from "styled-components";

const Contenedor = styled.div`
  background: #fff;
  width: 100%;
  max-width: 80rem;
  height: 100vh;
  max-height: 50rem;
  overflow-y: auto;
  box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
  margin: auto;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 100;

  @media (max-width: 60rem) {
    /* 950px */
    height: 95vh;
    max-height: none;
  }
`;

export default Contenedor;
