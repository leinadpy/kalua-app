import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetRefund = (id) => {
  const history = useHistory();
  const [refund, setRefund] = useState("");

  useEffect(() => {
    db.collection("refunds")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRefund(doc);
        } else {
          history.push("/refunds");
        }
      });
  }, [id, history]);

  return [refund];
};

export default useGetRefund;
