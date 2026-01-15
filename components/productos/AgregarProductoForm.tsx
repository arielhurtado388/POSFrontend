"use client";

import { agregarProducto } from "@/actions/agregar-producto-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AgregarProductoForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [state, dispatch] = useActionState(agregarProducto, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.errores) {
      state.errores.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/productos");
    }
  }, [state]);

  return (
    <form className="space-y-5" action={dispatch}>
      {children}
      <input
        className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
        type="submit"
        value={"Agregar Producto"}
      />
    </form>
  );
}
