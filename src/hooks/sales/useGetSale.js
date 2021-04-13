import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetSale = (id) => {
  const history = useHistory();
  const [sale, setSale] = useState("");

  useEffect(() => {
    db.collection("sales")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setSale(doc);
        } else {
          history.push("/sales");
        }
      });
  }, [id, history]);

  return [sale];
};

export default useGetSale;
