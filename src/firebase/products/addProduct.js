import { db } from "./../firebaseConfig";

const addProduct = ({
  code,
  description,
  line,
  category,
  basicPrice,
  distPrice,
  publicPrice,
}) => {
  return db.collection("products").add({
    code: code,
    description: description,
    line: line,
    category: category,
    basicPrice: basicPrice,
    distPrice: distPrice,
    publicPrice: publicPrice,
  });
};

export default addProduct;
