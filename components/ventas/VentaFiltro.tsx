"use client";

import { obtenerVentasPorDia } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import VentaResumen from "./VentaResumen";
import { formatearMoneda } from "@/src/utils";
import dynamic from "next/dynamic";

// Cargar componentes 100% en el cliente, sino se puede personalizar como el locale="es" como prop de Calendar
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function VentaFiltro() {
  const [fecha, setFecha] = useState<Value>(new Date());
  const fechaFormateada = format(fecha?.toString() || new Date(), "yyy-MM-dd");

  const { data, isLoading } = useQuery({
    queryKey: ["ventas", fechaFormateada],
    queryFn: () => obtenerVentasPorDia(fechaFormateada),
  });

  const total = data?.reduce((total, venta) => total + +venta.total, 0) ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
      <div className="lg:sticky lg:top-10">
        <Calendar value={fecha} onChange={setFecha} />
      </div>
      <div>
        {isLoading && "Cargando..."}
        {data ? (
          data.length ? (
            data.map((venta) => <VentaResumen key={venta.id} venta={venta} />)
          ) : (
            <p className="text-lg text-center">No hay ventas en esta fecha</p>
          )
        ) : null}

        <p className="my-5 text-lg font-bold text-right">
          Total del día: {""}
          <span className="font-normal">{formatearMoneda(total)}</span>
        </p>
      </div>
    </div>
  );
}
