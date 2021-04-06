import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetLines = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("lines").onSnapshot((snapshot) => {
      setLines(
        snapshot.docs.map((line) => {
          return { ...line.data(), id: line.id };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [lines];
};

export default useGetLines;
