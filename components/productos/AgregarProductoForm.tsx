"use client";

export default function AgregarProductoForm({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <form className="space-y-5" action="">
      {children}
      <input
        className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
        type="submit"
        value={"Agregar Producto"}
      />
    </form>
  );
}
