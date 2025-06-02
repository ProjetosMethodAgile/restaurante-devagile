"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UsuarioData } from "@/src/actions/user/type/userType";
import { tokenUserAuth } from "./type/authType";
export default async function postUser() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    const userdata = jwt.decode(token) as tokenUserAuth;
    const url = "http://localhost:3001";
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
      const user: UsuarioData = await res.json();

      return { data: user };
    } else {
      return { data: null };
    }
  } else {
    return { data: null };
  }
}
