import { db } from "./../firebaseConfig";

const addRefund = ({
  invoiceNumber,
  client,
  dateRefund,
  total,
  detailsRefunds,
}) => {
  return db.collection("refunds").add({
    invoiceNumber: invoiceNumber,
    client: client,
    dateRefund: dateRefund,
    total: Number(total),
    detailsRefunds: detailsRefunds,
  });
};

export default addRefund;
