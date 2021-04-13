import { db } from "./../firebaseConfig";

const editRefund = ({
  id,
  invoiceNumber,
  client,
  dateRefund,
  total,
  detailsRefunds,
}) => {
  return db
    .collection("refunds")
    .doc(id)
    .update({
      invoiceNumber: invoiceNumber,
      client: client,
      dateRefund: dateRefund,
      total: Number(total),
      detailsRefunds: detailsRefunds,
    });
};

export default editRefund;
