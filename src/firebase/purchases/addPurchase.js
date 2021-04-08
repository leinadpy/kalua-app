import { db } from "./../firebaseConfig";

const addPurchase = ({
  invoiceNumber,
  datePurchase,
  total,
  detailsPurchases,
}) => {
  return db.collection("purchases").add({
    invoiceNumber: invoiceNumber,
    datePurchase: datePurchase,
    total: Number(total),
    detailsPurchases: detailsPurchases,
  });
};

export default addPurchase;
