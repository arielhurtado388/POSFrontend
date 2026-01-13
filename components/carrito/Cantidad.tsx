import { formatearMoneda } from "@/src/utils";

type CantidadProps = {
  titulo: string;
  cantidad: number;
  descuento?: boolean;
};

export default function Cantidad({
  titulo,
  cantidad,
  descuento,
}: CantidadProps) {
  return (
    <div
      className={`${
        descuento && "bg-green-300 text-green-900"
      } flex justify-between p-1`}
    >
      <dt className="font-bold">{titulo}</dt>
      <dd className="text-gray-900">
        {descuento && "-"}
        {formatearMoneda(cantidad)}
      </dd>
    </div>
  );
}
