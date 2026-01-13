import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  CarritoCompras,
  Cupon,
  CuponResponseSchema,
  Producto,
} from "./schemas";

interface Tienda {
  total: number;
  descuento: number;
  contenido: CarritoCompras;
  cupon: Cupon;
  agregarAlCarrito: (producto: Producto) => void;
  actualizarCantidad: (id: Producto["id"], cantidad: number) => void;
  eliminarDelCarrito: (id: Producto["id"]) => void;
  calcularTotal: () => void;
  aplicarCupon: (nombre: string) => Promise<void>;
  calcularDescuento: () => void;
  limpiarOrden: () => void;
}

const estadoInicial = {
  total: 0,
  descuento: 0,
  contenido: [],
  cupon: {
    porcentaje: 0,
    nombre: "",
    message: "",
  },
};

export const useTienda = create<Tienda>()(
  devtools((set, get) => ({
    ...estadoInicial,
    agregarAlCarrito: (producto) => {
      const { id: productoId, categoriaId, ...data } = producto;
      let contenido: CarritoCompras = [];
      const duplicado = get().contenido.findIndex(
        (item) => item.productoId === productoId
      );

      if (duplicado >= 0) {
        if (
          get().contenido[duplicado].cantidad >=
          get().contenido[duplicado].inventario
        )
          return;

        contenido = get().contenido.map((item) =>
          item.productoId === productoId
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      } else {
        contenido = [
          ...get().contenido,
          {
            ...data,
            cantidad: 1,
            productoId,
          },
        ];
      }

      set(() => ({
        contenido,
      }));

      get().calcularTotal();
    },
    actualizarCantidad: (id, cantidad) => {
      const contenido = get().contenido.map((item) =>
        item.productoId === id ? { ...item, cantidad } : item
      );
      set(() => ({
        contenido,
      }));
      get().calcularTotal();
    },
    eliminarDelCarrito: (id) => {
      set((state) => ({
        contenido: state.contenido.filter((item) => item.productoId !== id),
      }));
      if (!get().contenido.length) {
        get().limpiarOrden();
      }
      get().calcularTotal();
    },
    calcularTotal: () => {
      set((state) => ({
        total: state.contenido.reduce(
          (total, item) => total + item.cantidad * item.precio,
          0
        ),
      }));

      if (get().cupon.porcentaje) {
        get().calcularDescuento();
      }
    },
    aplicarCupon: async (nombre) => {
      const req = await fetch("/cupones/api", {
        method: "POST",
        body: JSON.stringify({
          nombre,
        }),
      });
      const json = await req.json();
      const cupon = CuponResponseSchema.parse(json);
      set(() => ({
        cupon,
      }));

      if (cupon.porcentaje) {
        get().calcularDescuento();
      }
    },
    calcularDescuento: () => {
      const subtotal = get().contenido.reduce(
        (total, item) => total + item.cantidad * item.precio,
        0
      );
      const descuento = +((get().cupon.porcentaje / 100) * subtotal).toFixed(2);
      const total = subtotal - descuento;

      set(() => ({
        descuento,
        total,
      }));
    },
    limpiarOrden: () => {
      set(() => ({
        ...estadoInicial,
      }));
    },
  }))
);
