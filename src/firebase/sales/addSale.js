import { db } from "./../firebaseConfig";

const addSale = ({
  invoiceNumber,
  client,
  typeOfClient,
  dateSale,
  typeOfSale,
  total,
  detailsSales,
  paidUp,
}) => {
  return db.collection("sales").add({
    invoiceNumber: invoiceNumber,
    client: client,
    typeOfClient: typeOfClient,
    dateSale: dateSale,
    typeOfSale: typeOfSale,
    total: Number(total),
    detailsSales: detailsSales,
    paidUp: paidUp,
  });
};

export default addSale;
