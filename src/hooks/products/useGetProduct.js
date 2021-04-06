import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetProduct = (id) => {
  const history = useHistory();
  const [product, setProduct] = useState("");

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setProduct(doc);
        } else {
          history.push("/products");
        }
      });
  }, [id, history]);

  return [product];
};

export default useGetProduct;
