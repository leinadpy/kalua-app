import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetClient = (id) => {
  const history = useHistory();
  const [client, setClient] = useState("");

  useEffect(() => {
    db.collection("clients")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setClient(doc);
        } else {
          history.push("/clients");
        }
      });
  }, [id, history]);

  return [client];
};

export default useGetClient;
