"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoff() {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    (await cookies()).delete("token");
    redirect("/");
  } else {
    redirect("/");
  }
}
