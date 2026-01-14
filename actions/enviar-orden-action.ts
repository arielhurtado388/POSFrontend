"use server";

import {
  ErrorResponseSchema,
  OrdenSchema,
  SuccessResponseSchema,
} from "@/src/schemas";
import { revalidateTag } from "next/cache";

export async function enviarOrden(data: unknown) {
  const orden = OrdenSchema.parse(data);

  const url = `${process.env.API_URL}/ventas`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...orden }),
  });

  const json = await req.json();

  if (!req.ok) {
    const errores = ErrorResponseSchema.parse(json);
    return {
      errores: errores.message.map((error) => error),
      success: "",
    };
  }

  revalidateTag("productos-por-categoria", "max");
  const success = SuccessResponseSchema.parse(json);

  return {
    errores: [],
    success: success.message,
  };
}
