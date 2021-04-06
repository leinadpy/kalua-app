import { db } from "./../firebaseConfig";

const addLine = ({ description }) => {
  return db.collection("lines").add({
    description: description,
  });
};

export default addLine;
