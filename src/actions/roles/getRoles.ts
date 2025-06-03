"use server";

import { cookies } from "next/headers";
import { RoleBase } from "@/src/types/role/roleType";
export default async function getRoles() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (token) {
      const url = "http://localhost:3001";
      if (url) {
        const res = await fetch(`${url}/role`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token} `,
          },
          next: {
            revalidate: 60,
          },
        });
        const roles = (await res.json()) as RoleBase[];

        return { data: roles };
      } else {
        return { data: null };
      }
    } else {
      return { data: null };
    }
  } catch (error) {
    console.log(error);

    return { data: null };
  }
}
