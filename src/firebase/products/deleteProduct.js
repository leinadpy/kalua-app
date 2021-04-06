import { db } from "./../firebaseConfig";

const deleteProduct = (id) => {
  db.collection("products").doc(id).delete();
};

export default deleteProduct;
