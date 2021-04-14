import React, { useState, useEffect, useContext } from "react";
import useGetPurchases from "./../hooks/purchases/useGetPurchases";
import useGetSales from "./../hooks/sales/useGetSales";

const StockProductContext = React.createContext();

const useStockProduct = () => useContext(StockProductContext);

const StockProductProvider = ({ children }) => {
  const [productStock, setProductStock] = useState([]);
  const purchases = useGetPurchases();
  const sales = useGetSales();

  useEffect(() => {
      const productStockPurchase = [];
      purchases.forEach((purchase) => {
        productStockPurchase.push(purchase.detailsPurchases);
      });

      const productStockSale = [];
      sales.forEach((sale) => {
        productStockSale.push(sale.detailsSales);
      });

      const obtenerArray = (arrayOriginal) => {
        const planoPurchases = arrayOriginal.reduce(
          (acc, el) => acc.concat(el),
          []
        );

        const purchasesAcumulated = planoPurchases.map(
          (planoPurchase) => planoPurchase.idDetail
        );

        // eslint-disable-next-line no-extend-native
        Array.prototype.unique = function () {
          return this.filter(function (a, b, c) {
            return c.indexOf(a, b + 1) < 0;
          });
        };

        const purchaseAcuUnique = purchasesAcumulated.unique();

        const arrayDefinitivo = [];
        purchaseAcuUnique.forEach((x) => {
          let suma = 0;
          let code = "";
          let product = "";
          let sizeCode = "";
          let colorCode = "";
          planoPurchases.forEach((planoPurchase) => {
            if (x === planoPurchase.idDetail) {
              code = planoPurchase.code;
              product = planoPurchase.product;
              sizeCode = planoPurchase.sizeCode;
              colorCode = planoPurchase.colorCode;
              suma += planoPurchase.quantity;
            }
          });
          arrayDefinitivo.push({
            code: code,
            product: product,
            sizeCode: sizeCode,
            colorCode: colorCode,
            quantity: suma,
          });
        });
        return arrayDefinitivo;
      };

      const sumarArray = obtenerArray(productStockPurchase);
      const restarArray = obtenerArray(productStockSale);

      const resultArray = [];
      sumarArray.forEach((suma) => {
        let resultante = 0;
        let finded = false;
        restarArray.forEach((resta) => {
          if (
            suma.code === resta.code &&
            suma.sizeCode === resta.sizeCode &&
            suma.colorCode === resta.colorCode
          ) {
            resultante = suma.quantity - resta.quantity;
            finded = true;
          }
        });
        if (!finded) {
          resultante = suma.quantity
        }
        resultArray.push({
          code: suma.code,
          product: suma.product,
          sizeCode: suma.sizeCode,
          colorCode: suma.colorCode,
          quantity: resultante,
        });
      });
      setProductStock(resultArray);
  }, [purchases, sales]);

  return (
    <StockProductContext.Provider value={{ productStock: productStock }}>
      {children}
    </StockProductContext.Provider>
  );
};

export {StockProductProvider, useStockProduct}
