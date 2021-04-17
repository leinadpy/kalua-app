import { db } from "./../firebaseConfig";

const editPurchase = ({
  id,
  invoiceNumber,
  datePurchase,
  deduction,
  total,
  totalWithoutDeduction,
  detailsPurchases,
}) => {
  return db
    .collection("purchases")
    .doc(id)
    .update({
      invoiceNumber: invoiceNumber,
      datePurchase: datePurchase,
      deduction: deduction,
      total: Number(total),
      totalWithoutDeduction: totalWithoutDeduction,
      detailsPurchases: detailsPurchases,
    });
};

export default editPurchase;
