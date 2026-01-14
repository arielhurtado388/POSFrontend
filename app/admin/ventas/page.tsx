import Heading from "@/components/ui/Heading";
import VentaFiltro from "@/components/ventas/VentaFiltro";
import { obtenerVentasPorDia } from "@/src/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { format } from "date-fns";

export default async function VentasPage() {
  const queryClient = new QueryClient();
  const hoy = new Date();
  const fechaFormateada = format(hoy, "yyy-MM-dd");

  await queryClient.prefetchQuery({
    queryKey: ["ventas", fechaFormateada],
    queryFn: () => obtenerVentasPorDia(fechaFormateada),
  });

  return (
    <>
      <Heading>Ventas</Heading>
      <p className="text-lg">
        En esta sección aparecerán las ventas, utiliza el calendario para
        filtrar por fecha
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VentaFiltro />
      </HydrationBoundary>
    </>
  );
}
