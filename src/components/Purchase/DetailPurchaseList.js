import React from "react";
import { MDBDataTableV5 } from "mdbreact";

const DetailPurchaseList = ({ detailsPurchases }) => {
  const datatable = {
    columns: [
      {
        label: "Código Producto",
        field: "code",
        width: 150,
      },
      {
        label: "Producto",
        field: "product",
        width: 270,
      },
      {
        label: "Código Tamaño",
        field: "sizeCode",
        width: 150,
      },
      {
        label: "Código Color",
        field: "colorCode",
        width: 150,
      },
      {
        label: "Cantidad",
        field: "quantity",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Precio Unitario",
        field: "purchPrice",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Subtotal",
        field: "subtotal",
        sort: "disabled",
        width: 150,
      },
    ],
    rows: detailsPurchases,
  };

  return <MDBDataTableV5 hover paging={false} data={datatable} />;
};

export default DetailPurchaseList;
