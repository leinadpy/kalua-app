import { db } from "./../firebaseConfig";

const addPurchase = ({
  invoiceNumber,
  datePurchase,
  deduction,
  total,
  totalWithoutDeduction,
  detailsPurchases,
}) => {
  return db.collection("purchases").add({
    invoiceNumber: invoiceNumber,
    datePurchase: datePurchase,
    deduction: deduction,
    total: Number(total),
    totalWithoutDeduction: totalWithoutDeduction,
    detailsPurchases: detailsPurchases,
  });
};

export default addPurchase;
