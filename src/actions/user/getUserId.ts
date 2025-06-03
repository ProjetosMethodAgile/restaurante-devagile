"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UsuarioTelas } from "@/src/types/user/userType";
import { tokenUserAuth } from "./type/authType";
export default async function getUserId() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (token) {
      const userdata = jwt.decode(token) as tokenUserAuth;
      const url = process.env.URL_API;
      if (url) {
        const res = await fetch(`${url}/usuario/${userdata.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token} `,
          },
          next: {
            revalidate: 60,
            tags: ["auth"],
          },
        });
        const user: UsuarioTelas = await res.json();

        return { data: user };
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
