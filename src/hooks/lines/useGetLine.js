import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetLine = (id) => {
  const history = useHistory();
  const [line, setLine] = useState("");

  useEffect(() => {
    db.collection("lines")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setLine(doc);
        } else {
          history.push("/lines");
        }
      });
  }, [id, history]);

  return [line];
};

export default useGetLine;
