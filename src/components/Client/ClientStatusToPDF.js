import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import formatearFecha from "./../../funciones/formatearFecha";
import { PDFViewer } from "@react-pdf/renderer";
import convertirAMoneda from "./../../funciones/convertirAMoneda";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#E4E4E4",
  },
  body: {
    flexGrow: 1,
    fontWeight: "normal",
  },
  row: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
  },
  textBold: {
    textDecoration: "underline",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    textDecoration: "underline",
    marginBottom: 15,
  },
  fill0: {
    margin: 10,
    width: "50%",
    textAlign: "left",
    fontSize: 15,
    // marginBottom: 10,
  },
  fill1: {
    margin: 10,
    width: "50%",
    textAlign: "left",
    fontSize: 15,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 15,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: "28%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "left",
    // textTransform: "lowercase",
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

// Create Document Component
const ClientStatusToPDF = ({ sale }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dateSale, setDateSale] = useState("");
  const [client, setClient] = useState("");
  const [typeOfSale, setTypeOfSale] = useState("");
  const [detailsSales, setDetailsSales] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (sale) {
      setInvoiceNumber(sale.data().invoiceNumber);
      setClient(sale.data().client);
      setDateSale(formatearFecha(sale.data().dateSale, "dd/MM/yyyy"));
      setTypeOfSale(sale.data().typeOfSale);
      setTotal(sale.data().total);
      setDetailsSales(sale.data().detailsSales);
    }
  }, [sale]);

  return (
    <PDFViewer width={"100%"} height={"100%"}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.title}>
            <Text>Comprobante interno de Venta</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.row}>
              <View style={styles.fill0}>
                <Text>
                  <Text style={styles.textBold}>N° de Factura:</Text>{" "}
                  {invoiceNumber}
                </Text>
              </View>
              <View style={styles.fill1}>
                <Text>
                  <Text style={styles.textBold}>Fecha:</Text> {dateSale}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.fill0}>
                <Text>
                  <Text style={styles.textBold}>Cliente:</Text> {client}
                </Text>
              </View>
              <View style={styles.fill1}>
                <Text>
                  <Text style={styles.textBold}>Tipo de venta:</Text>{" "}
                  {typeOfSale}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.table}>
                {/* TableHeader */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Codigo</Text>
                  </View>
                  <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Producto</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Tamaño</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Color</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cantidad</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Precio</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Subtotal</Text>
                  </View>
                </View>
                {/* TableContent */}
                {detailsSales.map((detail) => (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{detail.code}</Text>
                    </View>
                    <View style={styles.tableCol2}>
                      <Text style={styles.tableCell}>{detail.product}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{detail.sizeCode}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{detail.colorCode}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{detail.quantity}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {convertirAMoneda(detail.salePrice)}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {convertirAMoneda(detail.subtotal)}
                      </Text>
                    </View>
                  </View>
                ))}

                {/* TableFooter */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Total</Text>
                  </View>
                  <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}></Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}></Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}></Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}></Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}></Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {convertirAMoneda(total)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ClientStatusToPDF;
