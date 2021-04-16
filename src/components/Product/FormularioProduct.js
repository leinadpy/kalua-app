import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import Select from "./../Select";
import {
  Formulario,
  InputChico,
  ContenedorBoton,
} from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editProduct from "../../firebase/products/editProduct";
import addProduct from "./../../firebase/products/addProduct";
import { useHistory } from "react-router-dom";
import useGetLines from "./../../hooks/lines/useGetLines";
import useGetCategories from "./../../hooks/categories/useGetCategories";

const FormularioProduct = ({ product }) => {
  const [lines] = useGetLines();
  const [categories] = useGetCategories();

  const [inputCode, setInputCode] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [selectLine, setSelectLine] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [inputBasicPrice, setInputBasicPrice] = useState("");
  const [inputDistPrice, setInputDistPrice] = useState("");
  const [inputPublicPrice, setInputPublicPrice] = useState("");

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay algun producto.
    // De ser así establecemos todo el state con los valores del producto.
    if (product) {
      setInputCode(product.data().code);
      setInputDescription(product.data().description);
      setSelectLine(product.data().line);
      setSelectCategory(product.data().category);
      setInputBasicPrice(product.data().basicPrice);
      setInputDistPrice(product.data().distPrice);
      setInputPublicPrice(product.data().publicPrice);
    } else {
      if (lines[0] !== undefined) {
        setSelectLine(lines[0].description);
      }
      if (categories[0] !== undefined) {
        setSelectCategory(categories[0].description);
      }
    }
  }, [product, lines, categories]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "code":
        setInputCode(e.target.value);
        break;
      case "description":
        setInputDescription(e.target.value);
        break;
      case "line":
        setSelectLine(e.target.value);
        break;
      case "category":
        setSelectCategory(e.target.value);
        break;
      case "basicPrice":
        setInputBasicPrice(e.target.value);
        break;
      case "distPrice":
        setInputDistPrice(e.target.value);
        break;
      case "publicPrice":
        setInputPublicPrice(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    // Comprobamos que haya una línea
    if (
      inputCode !== "" &&
      (inputDescription !== "") & (inputBasicPrice !== "")
    ) {
      if (product) {
        editProduct({
          id: product.id,
          code: inputCode,
          description: inputDescription,
          line: selectLine,
          category: selectCategory,
          basicPrice: inputBasicPrice,
          distPrice: inputDistPrice,
          publicPrice: inputPublicPrice,
        })
          .then(() => {
            history.push("/products");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addProduct({
          code: inputCode,
          description: inputDescription,
          line: selectLine,
          category: selectCategory,
          basicPrice: inputBasicPrice,
          distPrice: inputDistPrice,
          publicPrice: inputPublicPrice,
        })
          .then(() => {
            setInputCode("");
            setInputDescription("");
            setInputBasicPrice("");
            setInputDistPrice("");
            setInputPublicPrice("");
            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "El producto fue agregado correctamente",
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
          name="code"
          placeholder="Código"
          value={inputCode}
          onChange={handleChange}
        />
        <InputChico
          type="text"
          name="description"
          placeholder="Descripción"
          value={inputDescription}
          onChange={handleChange}
        />
        <Select estado={selectLine} setEstado={setSelectLine} data={lines} />
        <Select
          estado={selectCategory}
          setEstado={setSelectCategory}
          data={categories}
        />
        <InputChico
          type="text"
          name="basicPrice"
          placeholder="Precio básico"
          value={inputBasicPrice}
          onChange={handleChange}
        />
        <InputChico
          type="text"
          name="distPrice"
          placeholder="Precio distribuidor"
          value={inputDistPrice}
          onChange={handleChange}
        />
        <InputChico
          type="text"
          name="publicPrice"
          placeholder="Precio público"
          value={inputPublicPrice}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {product ? "Editar Producto" : "Agregar Producto"}
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

export default FormularioProduct;
