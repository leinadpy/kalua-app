import { db } from "./../firebaseConfig";

const addClient = ({ name, document, phone, email, typeOfClient }) => {
  return db.collection("clients").add({
    name: name,
    document: document,
    phone: phone,
    email: email,
    typeOfClient: typeOfClient,
  });
};

export default addClient;
