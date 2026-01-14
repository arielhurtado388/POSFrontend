import { enviarOrden } from "@/actions/enviar-orden-action";
import { useTienda } from "@/src/store";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EnviarOrdenForm() {
  const total = useTienda((state) => state.total);
  const cupon = useTienda((state) => state.cupon.nombre);
  const contenido = useTienda((state) => state.contenido);
  const limpiarOrden = useTienda((state) => state.limpiarOrden);

  const orden = {
    total,
    cupon,
    contenido,
  };

  const enviarOrdenCompleta = enviarOrden.bind(null, orden);

  const [state, dispatch] = useActionState(enviarOrdenCompleta, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.errores) {
      state.errores.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      limpiarOrden();
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <input
        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 cursor-pointer"
        type="submit"
        value="Confirmar Compra"
      />
    </form>
  );
}
