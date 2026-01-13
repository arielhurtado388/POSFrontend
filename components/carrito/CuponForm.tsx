import { useTienda } from "@/src/store";
import { FormEvent } from "react";

export default function CuponForm() {
  const aplicarCupon = useTienda((state) => state.aplicarCupon);
  const cupon = useTienda((state) => state.cupon);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datosForm = new FormData(e.currentTarget);
    const nombre = datosForm.get("nombre")?.toString()!;
    if (!nombre.length) return;
    await aplicarCupon(nombre);
  };

  return (
    <>
      <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 bg-gray-200 border-gray-300 w-full"
          placeholder="Ingresa un cupón"
          name="nombre"
        />
        <input
          type="submit"
          className="p-3 bg-green-400 font-bold hover:cursor-pointer"
          value="Canjear"
        />
      </form>

      {cupon.message ? (
        <p className="py-4 text-center text-sm font-bold">{cupon.message}</p>
      ) : null}
    </>
  );
}
