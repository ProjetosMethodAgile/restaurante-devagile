import FormLogin from "@/src/components/Login/FormLogin/FormLogin";
import getUserId from "../actions/user/getUserId";
import { redirect } from "next/navigation";
import { data } from "framer-motion/client";

export default async function LoginPage() {
  const { data: user } = await getUserId();  

  if (user) {
    redirect("/app/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-light w-full">
      <FormLogin />
    </div>
  );
}
