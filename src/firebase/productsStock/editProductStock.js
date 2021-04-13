import { db } from "./../firebaseConfig";

const editProductStock = ({
  id,
  quantity,
}) => {
  return db.collection("productsStock").doc(id).update({
    quantity: quantity,
  });
};

export default editProductStock;
