import { db } from "./../firebaseConfig";

const deleteRefund = (id) => {
  db.collection("refunds").doc(id).delete();
};

export default deleteRefund;
