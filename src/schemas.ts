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

const OrdenContenidoSchema = z.object({
  productoId: z.number(),
  cantidad: z.number(),
  precio: z.number(),
});

export const OrdenSchema = z.object({
  total: z.number(),
  cupon: z.string(),
  contenido: z
    .array(OrdenContenidoSchema)
    .min(1, { message: "El carrito no puede ir vacío" }),
});

// Respuestas
export const SuccessResponseSchema = z.object({
  message: z.string(),
});
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number(),
});

export const ContenidoSchema = z.object({
  id: z.number(),
  cantidad: z.number(),
  precio: z.string(),
  producto: ProductoSchema,
});
export const VentaResponseSchema = z.object({
  id: z.number(),
  total: z.string(),
  fecha: z.string(),
  descuento: z.string().nullable(),
  cupon: z.string().nullable(),
  contenido: z.array(ContenidoSchema),
});

export const VentasResponseSchema = z.array(VentaResponseSchema);

export const ProductosResponseSchema = z.object({
  productos: z.array(ProductoSchema),
  total: z.number(),
});

// Types
export type Producto = z.infer<typeof ProductoSchema>;
export type CarritoCompras = z.infer<typeof CarritoComprasSchema>;
export type Item = z.infer<typeof ContenidoCarritoComprasSchema>;
export type Cupon = z.infer<typeof CuponResponseSchema>;
export type Venta = z.infer<typeof VentaResponseSchema>;
