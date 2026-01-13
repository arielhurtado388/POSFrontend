import z from "zod";

export const ProductoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  imagen: z.string(),
  precio: z.coerce.number(),
  inventario: z.number(),
  categoriaId: z.number(),
});

export const CategoriaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

export const CategoriaResponseSchema = z.array(CategoriaSchema);

export const CategoriaConProductosResponseSchema = CategoriaSchema.extend({
  productos: z.array(ProductoSchema),
});

// Carrito
const ContenidoCarritoComprasSchema = ProductoSchema.pick({
  nombre: true,
  imagen: true,
  precio: true,
  inventario: true,
}).extend({
  productoId: z.number(),
  cantidad: z.number(),
});

export const CarritoComprasSchema = z.array(ContenidoCarritoComprasSchema);
export const CuponResponseSchema = z.object({
  nombre: z.string().default(""),
  message: z.string(),
  porcentaje: z.coerce.number().min(0).max(100).default(0),
});

// Types
export type Producto = z.infer<typeof ProductoSchema>;
export type CarritoCompras = z.infer<typeof CarritoComprasSchema>;
export type Item = z.infer<typeof ContenidoCarritoComprasSchema>;
export type Cupon = z.infer<typeof CuponResponseSchema>;
