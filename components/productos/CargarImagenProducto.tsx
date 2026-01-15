"use client";

import { cargarImagen } from "@/actions/cargar-imagen-action";
import { obtenerRutaImagen } from "@/src/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function CargarImagenProducto({
  imagenActual,
}: {
  imagenActual?: string;
}) {
  const [imagen, setImagen] = useState("");

  const onDrop = useCallback(async (files: File[]) => {
    const datosForm = new FormData();
    files.forEach((file) => {
      datosForm.append("file", file);
    });

    const imagen = await cargarImagen(datosForm);
    setImagen(imagen);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop,
    maxFiles: 1,
  });
  return (
    <>
      <div className="space-y-1">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Imagen
        </label>
        <div
          {...getRootProps({
            className: `
            py-20 border-2 border-dashed  text-center 
            ${
              isDragActive
                ? "border-gray-900 text-gray-900 bg-gray-200 "
                : "border-gray-400 text-gray-400 bg-white"
            } 
            ${isDragReject ? "border-none bg-white" : "cursor-not-allowed"}
        `,
          })}
        >
          <input {...getInputProps()} />
          {isDragAccept && <p>Suelta la imagen</p>}
          {isDragReject && <p>El archivo no es válido</p>}
          {!isDragActive && <p>Arrastra y suelta una imagen aquí</p>}
        </div>
      </div>

      {imagen && (
        <div className="py-5 space-y-3">
          <p className="font-bold">Imagen Subida</p>
          <div className="w-75 h-105 relative">
            <Image
              className="object-cover"
              src={imagen}
              alt="Imagen Subida"
              fill
            />
          </div>
        </div>
      )}

      {imagenActual && !imagen && (
        <div className="py-5 space-y-3">
          <p className="font-bold">Imagen Actual</p>
          <div className="w-75 h-105 relative">
            <Image
              className="object-cover"
              src={obtenerRutaImagen(imagenActual)}
              alt="Imagen Actual"
              fill
              unoptimized
              loading="eager"
            />
          </div>
        </div>
      )}

      <input
        type="hidden"
        name="imagen"
        defaultValue={imagen ? imagen : imagenActual}
      />
    </>
  );
}
