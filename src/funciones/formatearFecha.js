import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";

const formatearFecha = (fecha, formato) => {
  return format(fromUnixTime(fecha), formato, {
    locale: es,
  });
};

export default formatearFecha;
