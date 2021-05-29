import { db } from "./../firebaseConfig";

const addReceipt = ({
  invoiceReceipt,
  client,
  dateReceipt,
  salesCreditPaidUp,
  total,
}) => {
  return db.collection("receipts").add({
    invoiceReceipt: invoiceReceipt,
    client: client,
    dateReceipt: dateReceipt,
    salesCreditPaidUp: salesCreditPaidUp,
    total: total,
  });
};

export default addReceipt;
