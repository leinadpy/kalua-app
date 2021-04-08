import { db } from "./../firebaseConfig";

const deletePurchase = (id) => {
  db.collection("purchases").doc(id).delete();
};

export default deletePurchase;
