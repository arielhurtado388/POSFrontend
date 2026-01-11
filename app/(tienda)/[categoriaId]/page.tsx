import ProductoCard from "@/components/productos/ProductoCard";
import { CategoriaConProductosResponseSchema } from "@/src/schemas";

type Params = Promise<{ categoriaId: string }>;

async function obtenerProductos(categoriaId: string) {
  const url = `${process.env.API_URL}/categorias/${categoriaId}?productos=true`;
  const req = await fetch(url);
  const json = await req.json();
  const productos = CategoriaConProductosResponseSchema.parse(json);
  return productos;
}

export default async function TiendaPage({ params }: { params: Params }) {
  const { categoriaId } = await params;

  const categoria = await obtenerProductos(categoriaId);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {categoria.productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
