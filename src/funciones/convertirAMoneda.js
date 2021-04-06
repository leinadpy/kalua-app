const formatearCantidad = (cantidad) => {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    minimumFractionDigits: 0,
  }).format(cantidad);
};

export default formatearCantidad;
