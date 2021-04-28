import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetReceipt = (id) => {
  const history = useHistory();
  const [receipt, setReceipt] = useState("");

  useEffect(() => {
    db.collection("receipts")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setReceipt(doc);
        } else {
          history.push("/receipts");
        }
      });
  }, [id, history]);

  return [receipt];
};

export default useGetReceipt;
