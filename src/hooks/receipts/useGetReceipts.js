import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetReceipts = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("receipts").onSnapshot((snapshot) => {
      setReceipts(
        snapshot.docs.map((receipt) => {
          return {
            ...receipt.data(),
            id: receipt.id,
          };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [receipts];
};

export default useGetReceipts;
