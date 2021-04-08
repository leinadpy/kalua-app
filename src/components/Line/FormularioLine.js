import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import {
  Formulario,
  InputChico,
  ContenedorBoton,
} from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editLine from "../../firebase/lines/editLine";
import addLine from "./../../firebase/lines/addLine";
import { useHistory } from "react-router-dom";

const FormularioLine = ({ line }) => {
  const [inputDescriptionLine, setInputDescriptionLine] = useState("");
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay alguna línea.
    // De ser así establecemos todo el state con los valores de la línea.
    if (line) {
      setInputDescriptionLine(line.data().description);
    }
  }, [line]);

  const handleChange = (e) => {
    setInputDescriptionLine(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    // Comprobamos que haya una línea
    if (inputDescriptionLine !== "") {
      if (line) {
        editLine({
          id: line.id,
          description: inputDescriptionLine,
        })
          .then(() => {
            history.push("/lines");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addLine({
          description: inputDescriptionLine,
        })
          .then(() => {
            setInputDescriptionLine("");
            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "La línea fue agregada correctamente",
            });
          })
          .catch((error) => {
            setEstadoAlerta(true);
            setAlerta({
              tipo: "error",
              mensaje: "El valor ingresado no es el correcto",
            });
          });
      }
    } else {
      setEstadoAlerta(true);
      setAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
    }
  };

  return (
    <>
      <Formulario onSubmit={handleSubmit}>
        <InputChico
          type="text"
          name="description"
          placeholder="Línea"
          value={inputDescriptionLine}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {line ? "Editar Línea" : "Agregar Línea"}
          </Boton>
        </ContenedorBoton>
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          estadoAlerta={estadoAlerta}
          setEstadoAlerta={setEstadoAlerta}
        />
      </Formulario>
    </>
  );
};

export default FormularioLine;
