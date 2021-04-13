import { db } from "./../firebaseConfig";

const editSale = ({
  id,
  invoiceNumber,
  client,
  dateSale,
  total,
  detailsSales,
}) => {
  return db
    .collection("sales")
    .doc(id)
    .update({
      invoiceNumber: invoiceNumber,
      client: client,
      dateSale: dateSale,
      total: Number(total),
      detailsSales: detailsSales,
    });
};

export default editSale;
