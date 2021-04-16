import React, { useState } from "react";
import styled from "styled-components";
import theme from "./../theme";
import { ReactComponent as IconoDown } from "./../imagenes/down.svg";

const ContenedorSelect = styled.div`
  background: ${theme.grisClaro};
  cursor: pointer;
  border-radius: 0.625rem; /* 10px */
  position: relative;
  height: 3rem; /* 80px */
  width: 40%;
  padding: 10px 1.25rem; /* 20px */
  font-size: 1.0rem; /* 24px */
  text-align: center;
  display: flex;
  align-items: center;
  transition: 0.5s ease all;
  margin-bottom: 10px;
  margin-top: 10px;
  &:hover {
    background: ${theme.grisClaro2};
  }
`;

const OpcionSeleccionada = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 150;
`;

const Opciones = styled.div`
  background: ${theme.grisClaro};
  position: absolute;
  top: 3.50rem;
  left: 0;
  width: 100%;
  border-radius: 0.625rem; /* 10px */
  max-height: 18.75rem; /* 300px */
  overflow-y: auto;
  z-index: 200;
`;

const Opcion = styled.div`
  padding: 1.0rem; /* 20px */
  display: flex;
  z-index: 200;
  svg {
    width: 28px;
    height: auto;
    margin-right: 1.25rem; /* 20px */
  }
  &:hover {
    background: ${theme.grisClaro2};
  }
`;

const Select = ({ estado, setEstado, data }) => {
  const [mostrarSelect, setMostrarSelect] = useState(false);

  const handleClick = (e) => {
    setEstado(e.currentTarget.dataset.valor);
  };

  return (
    <ContenedorSelect onClick={() => setMostrarSelect(!mostrarSelect)}>
      <OpcionSeleccionada>
        {estado} <IconoDown />
      </OpcionSeleccionada>

      {mostrarSelect && (
        <Opciones>
          {data.map((dato) => {
            return (
              <Opcion
                key={dato.id}
                data-valor={dato.description}
                onClick={handleClick}
              >
                {dato.description}
              </Opcion>
            );
          })}
        </Opciones>
      )}
    </ContenedorSelect>
  );
};

export default Select;
