import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((product) => {
          return { ...product.data(), id: product.id };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [products];
};

export default useGetProducts;
