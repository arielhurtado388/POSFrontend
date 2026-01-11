import { CategoriaResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";

async function obtenerCategorias() {
  const url = `${process.env.API_URL}/categorias`;
  const req = await fetch(url);
  const json = await req.json();
  const categorias = CategoriaResponseSchema.parse(json);
  return categorias;
}

export default async function MainNav() {
  const categorias = await obtenerCategorias();
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
      <div className="flex justify-center">
        <Logo />
      </div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
        {categorias.map((categoria) => (
          <Link
            className="text-white hover:text-green-400 font-bold p-2"
            key={categoria.id}
            href={`/${categoria.id}`}
          >
            {categoria.nombre}
          </Link>
        ))}
      </nav>
    </header>
  );
}
