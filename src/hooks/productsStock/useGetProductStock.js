import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetProductStock = (id) => {
  const history = useHistory();
  const [productStock, setProductStock] = useState("");

  useEffect(() => {
    db.collection("productsStock")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setProductStock(doc);
        } else {
          history.push("/stock");
        }
      });
  }, [id, history]);

  return [productStock];
};

export default useGetProductStock;
