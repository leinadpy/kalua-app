import { db } from "./../firebaseConfig";

const editReceipt = ({
  id,
  invoiceReceipt,
  client,
  dateReceipt,
  salesCreditPaidUp,
}) => {
  return db.collection("receipts").doc(id).update({
    invoiceReceipt: invoiceReceipt,
    client: client,
    dateReceipt: dateReceipt,
    salesCreditPaidUp: salesCreditPaidUp,
  });
};

export default editReceipt;
