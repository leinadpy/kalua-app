import { db } from "./../firebaseConfig";

const addReceipt = ({
  invoiceReceipt,
  client,
  dateReceipt,
  salesCreditPaidUp
}) => {
  return db.collection("receipts").add({
    invoiceReceipt: invoiceReceipt,
    client: client,
    dateReceipt: dateReceipt,
    salesCreditPaidUp: salesCreditPaidUp,
  });
};

export default addReceipt;
