import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import {
  Formulario,
  InputChico,
  ContenedorBoton,
} from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editCategory from "../../firebase/categories/editCategory";
import addCategory from "./../../firebase/categories/addCategory";
import { useHistory } from "react-router-dom";

const FormularioCategoria = ({ category }) => {
  const [inputDescriptionCategory, setInputDescriptionCategory] = useState("");
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay alguna categoría.
    // De ser así establecemos todo el state con los valores de la categoría.
    if (category) {
      setInputDescriptionCategory(category.data().description);
    }
  }, [category]);

  const handleChange = (e) => {
    setInputDescriptionCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    // Comprobamos que haya una categoría
    if (inputDescriptionCategory !== "") {
      if (category) {
        editCategory({
          id: category.id,
          description: inputDescriptionCategory,
        })
          .then(() => {
            history.push("/categories");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addCategory({
          description: inputDescriptionCategory,
        })
          .then(() => {
            setInputDescriptionCategory("");
            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "La categoría fue agregada correctamente",
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
          placeholder="Categoría"
          value={inputDescriptionCategory}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {category ? "Editar Categoría" : "Agregar Categoría"}
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

export default FormularioCategoria;
