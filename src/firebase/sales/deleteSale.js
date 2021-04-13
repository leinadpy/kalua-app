import { db } from "./../firebaseConfig";

const deleteSale = (id) => {
  db.collection("sales").doc(id).delete();
};

export default deleteSale;
