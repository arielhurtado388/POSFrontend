"use server";

import {
  ErrorResponseSchema,
  Producto,
  ProductoFormSchema,
} from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function actualizarProducto(
  productoId: Producto["id"],
  prevState: ActionStateType,
  datosForm: FormData
) {
  const producto = ProductoFormSchema.safeParse({
    nombre: datosForm.get("nombre"),
    precio: datosForm.get("precio"),
    inventario: datosForm.get("inventario"),
    categoriaId: datosForm.get("categoriaId"),
  });

  if (!producto.success) {
    return {
      errores: producto.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/productos/${productoId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: producto.data.nombre,
      precio: producto.data.precio,
      inventario: producto.data.inventario,
      categoriaId: producto.data.categoriaId,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const errores = ErrorResponseSchema.parse(json);
    return {
      errores: errores.message.map((issue) => issue),
      success: "",
    };
  }

  return {
    errores: [],
    success: "Producto actualizado correctamente",
  };
}
