"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UsuarioData } from "@/src/types/user/userType";
import { tokenUserAuth } from "./type/authType";
export default async function getUserId() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    const userdata = jwt.decode(token) as tokenUserAuth;
    const res = await fetch(`${process.env.URL_API}/usuario/${userdata.id}`, {
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
    console.log(user);

    return { data: user };
  } else {
    return { data: null };
  }
}
