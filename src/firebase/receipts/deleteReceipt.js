import { db } from "./../firebaseConfig";

const deleteReceipt = (id) => {
  db.collection("receipts").doc(id).delete();
};

export default deleteReceipt;
