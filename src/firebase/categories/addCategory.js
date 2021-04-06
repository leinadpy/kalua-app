import { db } from "./../firebaseConfig";

const addCategory = ({ description }) => {
  return db.collection("categories").add({
    description: description,
  });
};

export default addCategory;
