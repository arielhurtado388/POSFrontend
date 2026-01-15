"use client";

import { actualizarProducto } from "@/actions/actualizar-producto-action";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditarProductoForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const actualizarProductoId = actualizarProducto.bind(null, +id);

  const [state, dispatch] = useActionState(actualizarProductoId, {
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
        value={"Guardar Cambios"}
      />
    </form>
  );
}
