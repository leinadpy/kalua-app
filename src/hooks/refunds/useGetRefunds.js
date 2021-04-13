import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetRefunds = () => {
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("refunds").onSnapshot((snapshot) => {
      setRefunds(
        snapshot.docs.map((purchase) => {
          return { ...purchase.data(), id: purchase.id };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [refunds];
};

export default useGetRefunds;
