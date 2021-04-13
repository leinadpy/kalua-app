import { db } from "./../firebaseConfig";

const deleteProductStock = (id) => {
  db.collection("productsStock").doc(id).delete();
};

export default deleteProductStock;
