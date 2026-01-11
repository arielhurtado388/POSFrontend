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

export const CategoriaConProductosResponseSchema = CategoriaSchema.extend({
  productos: z.array(ProductoSchema),
});

// Types
export type Producto = z.infer<typeof ProductoSchema>;
