"use server";

import { cookies } from "next/headers";
import { ProdutoBase } from "@/src/types/produto/produtoType";
export default async function getProdutoId(produtoId?: string) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (token) {
      const url = process.env.URL_API || "http://localhost:3001";

      if (url) {
        const res = await fetch(`${url}/produto/${produtoId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token} `,
          },
          next: {
            tags: ["get-produto"],
          },
        });
        const produto: ProdutoBase = await res.json();

        return { data: produto ? produto : null };
      } else {
        return { data: null };
      }
    } else {
      return { data: null };
    }
  } catch (error) {
    return { data: null };
  }
}
