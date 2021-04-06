import { db } from "./../firebaseConfig";

const deleteClient = (id) => {
  db.collection("clients").doc(id).delete();
};

export default deleteClient;
