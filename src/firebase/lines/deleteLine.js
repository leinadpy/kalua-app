import { db } from "./../firebaseConfig";

const deleteCategory = (id) => {
  db.collection("lines").doc(id).delete();
};

export default deleteCategory;
