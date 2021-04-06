import { db } from "./../firebaseConfig";

const editCategory = ({ id, description }) => {
  return db.collection("categories").doc(id).update({
    description: description,
  });
};

export default editCategory;
