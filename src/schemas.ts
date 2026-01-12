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

// Types
export type Producto = z.infer<typeof ProductoSchema>;
export type CarritoCompras = z.infer<typeof CarritoComprasSchema>;
