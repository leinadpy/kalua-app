import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetPurchase = (id) => {
  const history = useHistory();
  const [purchase, setPurchase] = useState("");

  useEffect(() => {
    db.collection("purchases")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPurchase(doc);
        } else {
          history.push("/purchases");
        }
      });
  }, [id, history]);

  return [purchase];
};

export default useGetPurchase;
