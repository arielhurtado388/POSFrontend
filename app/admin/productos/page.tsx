import ProductosTabla from "@/components/productos/ProductoTabla";
import Heading from "@/components/ui/Heading";
import Paginacion from "@/components/ui/Paginacion";
import { ProductosResponseSchema } from "@/src/schemas";
import { esPaginaValida } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function obtenerProductos(take: number, skip: number) {
  const url = `${process.env.API_URL}/productos?take=${take}&skip=${skip}`;
  const req = await fetch(url);
  const json = await req.json();
  const data = ProductosResponseSchema.parse(json);
  return {
    productos: data.productos,
    total: data.total,
  };
}

type SearchParams = Promise<{ pagina: string }>;

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { pagina } = await searchParams;
  if (!esPaginaValida(+pagina)) redirect("/admin/productos?pagina=1");

  const productosPorPagina = 10;
  const skip = (+pagina - 1) * productosPorPagina;
  const { productos, total } = await obtenerProductos(productosPorPagina, skip);

  const totalPaginas = Math.ceil(total / productosPorPagina);

  if (+pagina > totalPaginas) redirect("/admin/productos?pagina=1");

  return (
    <>
      <Link
        className="rounded bg-green-400 font-bold py-2 px-10"
        href={"/admin/productos/nuevo"}
      >
        Nuevo Producto
      </Link>

      <Heading>Administrar productos</Heading>
      <ProductosTabla productos={productos} />

      <Paginacion
        pagina={+pagina}
        totalPaginas={totalPaginas}
        baseUrl={"/admin/productos"}
      />
    </>
  );
}
