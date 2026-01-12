import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CarritoCompras, Producto } from "./schemas";

interface Tienda {
  total: number;
  contenido: CarritoCompras;
  agregarAlCarrito: (producto: Producto) => void;
}

export const useTienda = create<Tienda>()(
  devtools((set, get) => ({
    total: 0,
    contenido: [],

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
    },
  }))
);
