import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetProductsStock = () => {
  const [productsStock, setProductsStock] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("productsStock").onSnapshot((snapshot) => {
      setProductsStock(
        snapshot.docs.map((productStock) => {
          return { ...productStock.data(), id: productStock.id };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [productsStock];
};

export default useGetProductsStock;
