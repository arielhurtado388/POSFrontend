import Link from "next/link";

export default function Paginacion({
  pagina,
  totalPaginas,
  baseUrl,
}: {
  pagina: number;
  totalPaginas: number;
  baseUrl: string;
}) {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  return (
    <nav className="flex justify-center py-10">
      {pagina > 1 && (
        <Link
          className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          href={`${baseUrl}?pagina=${pagina - 1}`}
        >
          &laquo;
        </Link>
      )}

      {paginas.map((paginaActual) => (
        <Link
          className={`${
            pagina === paginaActual && "font-black"
          }  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
          key={paginaActual}
          href={`${baseUrl}?pagina=${paginaActual}`}
        >
          {paginaActual}
        </Link>
      ))}

      {pagina < totalPaginas && (
        <Link
          className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          href={`${baseUrl}?pagina=${pagina + 1}`}
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
