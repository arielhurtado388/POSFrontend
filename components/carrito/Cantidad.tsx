import { formatearMoneda } from "@/src/utils";

type CantidadProps = {
  titulo: string;
  cantidad: number;
};

export default function Cantidad({ titulo, cantidad }: CantidadProps) {
  return (
    <div className="flex justify-between">
      <dt className="font-bold">{titulo}</dt>
      <dd className="text-gray-900">{formatearMoneda(cantidad)}</dd>
    </div>
  );
}
