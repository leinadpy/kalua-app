import { db } from "./../firebaseConfig";

const addSale = ({ invoiceNumber, client, dateSale, total, detailsSales }) => {
  return db.collection("sales").add({
    invoiceNumber: invoiceNumber,
    client: client,
    dateSale: dateSale,
    total: Number(total),
    detailsSales: detailsSales,
  });
};

export default addSale;
