import { Producto } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export default function EliminarProductoForm({
  productoId,
}: {
  productoId: Producto["id"];
}) {
  const handleEliminarProducto = async () => {
    "use server";

    const url = `${process.env.API_URL}/productos/${productoId}`;
    const req = await fetch(url, {
      method: "DELETE",
    });
    await req.json();
    revalidatePath("/admin/productos");
  };

  return (
    <form action={handleEliminarProducto}>
      <input
        className="text-red-600 hover:text-red-800 cursor-pointer"
        type="submit"
        value="Eliminar"
      />
    </form>
  );
}
