import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("categories").onSnapshot((snapshot) => {
      setCategories(
        snapshot.docs.map((category) => {
          return { ...category.data(), id: category.id };
        })
      );
    });
    return unsuscribe;
  }, []);

  return [categories];
};

export default useGetCategories;
