import { db } from "./../firebaseConfig";

const addProductStock = ({
  code,
  description,
  sizeCode,
  colorCode,
  quantity,
}) => {
  return db.collection("productsStock").add({
    code: code,
    description: description,
    sizeCode: sizeCode,
    colorCode: colorCode,
    quantity: quantity,
  });
};

export default addProductStock;
