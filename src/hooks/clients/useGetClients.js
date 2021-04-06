import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("products").onSnapshot((snapshot) => {
      setClients(
        snapshot.docs.map((client) => {
          return { ...client.data(), id: client.id };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [clients];
};

export default useGetClients;
