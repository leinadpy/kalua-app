import { db } from "./../firebaseConfig";

const addClient = ({ name, document, phone, email }) => {
  return db.collection("clients").add({
    name: name,
    document: document,
    phone: phone,
    email: email,
  });
};

export default addClient;
