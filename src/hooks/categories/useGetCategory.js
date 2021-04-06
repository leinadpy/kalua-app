import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetCategory = (id) => {
  const history = useHistory();
  const [category, setCategory] = useState("");

  useEffect(() => {
    db.collection("categories")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCategory(doc);
        } else {
          history.push("/categories");
        }
      });
  }, [id, history]);

  return [category];
};

export default useGetCategory;
