import { db } from "./../firebaseConfig";

const editProduct = ({
  id,
  code,
  description,
  line,
  category,
  basicPrice,
  distPrice,
  publicPrice,
}) => {
  return db.collection("products").doc(id).update({
    code: code,
    description: description,
    line: line,
    category: category,
    basicPrice: basicPrice,
    distPrice: distPrice,
    publicPrice: publicPrice,
  });
};

export default editProduct;
