import { db } from "./../firebaseConfig";

const editClient = ({ id, name, document, phone, email, typeOfClient }) => {
  return db.collection("clients").doc(id).update({
    name: name,
    document: document,
    phone: phone,
    email: email,
    typeOfClient: typeOfClient,
  });
};

export default editClient;
