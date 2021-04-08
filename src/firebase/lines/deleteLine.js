import { db } from "./../firebaseConfig";

const deleteLine = (id) => {
  db.collection("lines").doc(id).delete();
};

export default deleteLine;
