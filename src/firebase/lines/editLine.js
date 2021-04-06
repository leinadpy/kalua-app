import { db } from "./../firebaseConfig";

const editLine = ({ id, description }) => {
  return db.collection("lines").doc(id).update({
    description: description,
  });
};

export default editLine;
