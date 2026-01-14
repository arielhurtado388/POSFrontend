import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fecha = searchParams.get("fecha");
  const url = `${process.env.API_URL}/ventas?fecha=${fecha}`;
  const req = await fetch(url);
  const response = await req.json();
  return Response.json(response);
}
