import { CategoriaResponseSchema, Producto } from "@/src/schemas";

async function obtenerCategorias() {
  const url = `${process.env.API_URL}/categorias`;
  const req = await fetch(url);
  const json = await req.json();
  const categorias = CategoriaResponseSchema.parse(json);
  return categorias;
}

export default async function ProductoForm({
  producto,
}: {
  producto?: Producto;
}) {
  const categorias = await obtenerCategorias();

  return (
    <>
      <div className="space-y-2 ">
        <label htmlFor="nombre" className="block">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Nombre del producto"
          className="border border-gray-300 w-full p-2"
          name="nombre"
          defaultValue={producto?.nombre}
        />
      </div>

      <div className="space-y-2 ">
        <label htmlFor="precio" className="block">
          Precio
        </label>
        <input
          id="precio"
          type="number"
          placeholder="Precio del producto"
          className="border border-gray-300 w-full p-2"
          name="precio"
          min={0}
          defaultValue={producto?.precio}
        />
      </div>

      <div className="space-y-2 ">
        <label htmlFor="inventario" className="block">
          Inventario
        </label>
        <input
          id="inventario"
          type="number"
          placeholder="Cantidad disponible"
          className="border border-gray-300 w-full p-2"
          name="inventario"
          min={0}
          defaultValue={producto?.inventario}
        />
      </div>

      <div className="space-y-2 ">
        <label htmlFor="categoriaId" className="block">
          Categoría
        </label>
        <select
          id="categoriaId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="categoriaId"
          defaultValue={producto?.categoriaId}
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
