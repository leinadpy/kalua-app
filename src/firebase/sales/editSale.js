import { db } from "./../firebaseConfig";

const editSale = ({
  id,
  invoiceNumber,
  client,
  typeOfClient,
  dateSale,
  typeOfSale,
  total,
  detailsSales,
}) => {
  return db
    .collection("sales")
    .doc(id)
    .update({
      invoiceNumber: invoiceNumber,
      client: client,
      typeOfClient: typeOfClient,
      dateSale: dateSale,
      typeOfSale: typeOfSale,
      total: Number(total),
      detailsSales: detailsSales,
    });
};

export default editSale;
