import { db } from "./../firebaseConfig";

const editReceipt = ({
  id,
  invoiceReceipt,
  client,
  dateReceipt,
  salesCreditPaidUp,
  total,
}) => {
  return db.collection("receipts").doc(id).update({
    invoiceReceipt: invoiceReceipt,
    client: client,
    dateReceipt: dateReceipt,
    salesCreditPaidUp: salesCreditPaidUp,
    total: total,
  });
};

export default editReceipt;
