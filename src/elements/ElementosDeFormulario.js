import styled from "styled-components";
import theme from "./../theme";

const ContenedorFiltros = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.87rem; /* 30px */

  @media (max-width: 60rem) {
    /* 950px */
    flex-direction: column;

    & > * {
      width: 100%;
      margin-bottom: 0.62rem; /* 10px */
    }
  }
`;

const Formulario = styled.form`
  padding: 0 1.5rem; /* 40px */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  input {
    width: 40%;
    text-align: center;
    padding: 1rem 0;
    font-family: "Work Sans", sans-serif;
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 60rem) {
    /* 950px */
    justify-content: start;
  }
`;

const Input = styled.input`
  font-size: 2rem; 
  border: none;
  border-bottom: 2px solid ${theme.grisClaro};
  outline: none;

  @media (max-width: 60rem) {
    /* 950px */
    font-size: 1.5rem;
  }
`;

const InputChico = styled.input`
  font-size: 1.0rem;
  border: none;
  border-bottom: 2px solid ${theme.grisClaro};
  outline: none;

  @media (max-width: 60rem) {
    /* 950px */
    font-size: 0.5rem;
  }
`;

const ContenedorBoton = styled.div`
  display: flex;
  justify-content: center;
  margin: 2.5rem 0; /* 40px */
`;

export { ContenedorFiltros, Formulario, Input, InputChico, ContenedorBoton };
