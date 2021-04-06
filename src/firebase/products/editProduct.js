import { db } from "./../firebaseConfig";

const editProduct = ({ id, code, description, line, category, basicPrice }) => {
  return db.collection("products").doc(id).update({
    code: code,
    description: description,
    line: line,
    category: category,
    basicPrice: basicPrice,
  });
};

export default editProduct;
