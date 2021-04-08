import { db } from "./../firebaseConfig";

const editPurchase = ({
  id,
  invoiceNumber,
  datePurchase,
  total,
  detailsPurchases,
}) => {
  return db
    .collection("purchases")
    .doc(id)
    .update({
      invoiceNumber: invoiceNumber,
      datePurchase: datePurchase,
      total: Number(total),
      detailsPurchases: detailsPurchases,
    });
};

export default editPurchase;
