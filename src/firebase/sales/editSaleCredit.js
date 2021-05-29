import { db } from "./../firebaseConfig";

const editSale = ({ id, paidUp }) => {
  return db.collection("sales").doc(id).update({
    paidUp: paidUp,
  });
};

export default editSale;
