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

export function obtenerRutaImagen(imagen: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";

  if (imagen.startsWith(cloudinaryBaseUrl)) {
    return imagen;
  } else {
    if (process.env.API_URL) {
      return `${process.env.API_URL}/img/${imagen}`;
    } else {
      return `${process.env.NEXT_PUBLIC_API_URL}/img/${imagen}`;
    }
  }
}

export const estaDisponible = (inventario: number) => inventario > 0;
