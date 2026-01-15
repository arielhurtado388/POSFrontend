"use server";

export async function cargarImagen(datosForm: FormData) {
  const url = `${process.env.API_URL}/productos/cargar-imagen`;
  const req = await fetch(url, {
    method: "POST",
    body: datosForm,
  });
  const imagen = await req.json();
  return imagen;
}
