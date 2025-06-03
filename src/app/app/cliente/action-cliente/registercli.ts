"use server";
import { FormClienteData } from "@/src/types/cliente/clientType";


export async function registerCli(
  formData: FormClienteData
): Promise<FormClienteData> {

console.log(formData)

  return formData;
}
