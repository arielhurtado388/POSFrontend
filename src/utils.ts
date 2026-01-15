export function formatearMoneda(cantidad: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cantidad);
}

export function esPaginaValida(valor: number) {
  if (valor == null) {
    return false;
  }

  if (typeof valor !== "number" && isNaN(valor)) {
    return false;
  }
  if (valor <= 0) {
    return false;
  }

  if (!Number.isInteger(valor)) {
    return false;
  }

  return true;
}
