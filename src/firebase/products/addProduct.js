import { db } from "./../firebaseConfig";

const addProduct = ({ code, description, line, category, basicPrice }) => {
  return db.collection("products").add({
    code: code,
    description: description,
    line: line,
    category: category,
    basicPrice: basicPrice,
  });
};

export default addProduct;
