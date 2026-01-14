import { VentasResponseSchema } from "./schemas";

export async function obtenerVentasPorDia(fecha: string) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/ventas/api?fecha=${fecha}`;
  const req = await fetch(url);
  const json = await req.json();
  const ventas = VentasResponseSchema.parse(json);
  return ventas;
}
