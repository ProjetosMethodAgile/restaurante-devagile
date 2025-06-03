"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoff() {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    (await cookies()).delete("token");
    const cookieStore = cookies();
    (await cookieStore).delete({ name: "empresaStorage", path: "/" });
    redirect("/");
  } else {
    redirect("/");
  }
}
