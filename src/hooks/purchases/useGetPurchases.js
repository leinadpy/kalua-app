import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetPurchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("purchases").onSnapshot((snapshot) => {
      setPurchases(
        snapshot.docs.map((purchase) => {
          return {
            ...purchase.data(),
            id: purchase.id,
          };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [purchases];
};

export default useGetPurchases;
