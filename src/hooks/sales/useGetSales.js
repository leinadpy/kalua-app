import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("sales").onSnapshot((snapshot) => {
      setSales(
        snapshot.docs.map((purchase) => {
          return { ...purchase.data(), id: purchase.id };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [sales];
};

export default useGetSales;
