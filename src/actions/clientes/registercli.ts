// src/actions/clientes/registercli.ts
'use server';

import type { FormClienteData } from '@/src/types/cliente/clientType';
import { postCustomer } from '@/src/actions/clientes/postCustomers';

export async function registerCli(formData: FormClienteData) {


  const result = await postCustomer(formData);
  
  return result;
}
