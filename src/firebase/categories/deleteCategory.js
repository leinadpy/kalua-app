import { db } from "./../firebaseConfig";

const deleteCategory = (id) => {
  db.collection("categories").doc(id).delete();
};

export default deleteCategory;
