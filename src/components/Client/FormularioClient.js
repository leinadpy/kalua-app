import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import {
  Formulario,
  InputChico,
  ContenedorBoton,
} from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editClient from "../../firebase/clients/editClient";
import addClient from "./../../firebase/clients/addClient";
import { useHistory } from "react-router-dom";
import Select from "./../Select";

const typesOfClients = [
  { id: "public", description: "Público" },
  { id: "dist", description: "Distribuidor" },
];

const FormularioClient = ({ client }) => {
  const [inputName, setInputName] = useState("");
  const [inputDocument, setInputDocument] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [selectTypeOfClient, setSelectTypeOfClient] = useState("Público");

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Comprobamos si ya hay algun cliente.
    // De ser así establecemos todo el state con los valores del cliente.
    if (client) {
      setInputName(client.data().name);
      setInputDocument(client.data().document);
      setInputPhone(client.data().phone);
      setInputEmail(client.data().email);
    }
  }, [client]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setInputName(e.target.value);
        break;
      case "document":
        setInputDocument(e.target.value);
        break;
      case "phone":
        setInputPhone(e.target.value);
        break;
      case "email":
        setInputEmail(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    // Comprobamos que haya un cliente
    if (inputName !== "" && inputDocument !== "") {
      if (client) {
        editClient({
          id: client.id,
          name: inputName,
          document: inputDocument,
          phone: inputPhone,
          email: inputEmail,
          typeOfClient: selectTypeOfClient,
        })
          .then(() => {
            history.push("/clients");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addClient({
          name: inputName,
          document: inputDocument,
          phone: inputPhone,
          email: inputEmail,
          typeOfClient: selectTypeOfClient,
        })
          .then(() => {
            setInputName("");
            setInputDocument("");
            setInputPhone("");
            setInputEmail("");
            setSelectTypeOfClient("Público");
            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "El cliente fue agregado correctamente",
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
          name="name"
          placeholder="Nombre"
          value={inputName}
          onChange={handleChange}
        />
        <InputChico
          type="text"
          name="document"
          placeholder="N° de Documento"
          value={inputDocument}
          onChange={handleChange}
        />
        <InputChico
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={inputPhone}
          onChange={handleChange}
        />
        <InputChico
          type="email"
          name="email"
          placeholder="E-mail"
          value={inputEmail}
          onChange={handleChange}
        />
        <Select
          estado={selectTypeOfClient}
          setEstado={setSelectTypeOfClient}
          data={typesOfClients}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {client ? "Editar Cliente" : "Agregar Cliente"}
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

export default FormularioClient;
