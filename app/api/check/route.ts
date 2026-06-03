import { NextResponse } from "next/server";
import { getProducts } from "@/app/actions/products";

export async function GET() {
  const res = await getProducts();
  return NextResponse.json(res);
}
