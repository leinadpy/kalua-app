import { db } from "./../firebaseConfig";

const editClient = ({ id, name, document, phone, email }) => {
  return db.collection("clients").doc(id).update({
    name: name,
    document: document,
    phone: phone,
    email: email,
  });
};

export default editClient;
