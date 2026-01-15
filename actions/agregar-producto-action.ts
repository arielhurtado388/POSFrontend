"use server";

import { ErrorResponseSchema, ProductoFormSchema } from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function agregarProducto(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const producto = ProductoFormSchema.safeParse({
    nombre: datosForm.get("nombre"),
    precio: datosForm.get("precio"),
    imagen: datosForm.get("imagen"),
    inventario: datosForm.get("inventario"),
    categoriaId: datosForm.get("categoriaId"),
  });

  if (!producto.success) {
    return {
      errores: producto.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/productos`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: producto.data.nombre,
      precio: producto.data.precio,
      imagen: producto.data.imagen,
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
    success: "Producto agregado correctamente",
  };
}
