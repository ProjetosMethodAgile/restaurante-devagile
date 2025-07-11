"use client";
import { deletaClientePorID } from "@/src/actions/clientes/deletaClientePorID";
import { ClienteBase } from "@/src/types/cliente/clientType";
import {
  ArrowLeft,
  AtSign,
  Blocks,
  Building2,
  FileDigit,
  IdCard,
  Locate,
  Map,
  MapPinHouse,
  PenLine,
  Phone,
  Radar,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "../../UI/Form";
import { validaAlteracao } from './contract/validaCampo';
import { alterarClientePorID } from "@/src/actions/clientes/alterarClientePorID";
import { formatCPF } from '@/src/utils/FormataVisualizacaoDoc';

// Recebe um único cliente
interface ClienteAcoesProps {
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  cliente?: ClienteBase;
}

export default function ClienteAcoes({ setModalEdit, cliente }: ClienteAcoesProps) {
  if (!cliente) return null;
  const [disableBtn,setdisableBtn]= useState(false)
  const [form, setForm] = React.useState({
    nome: cliente.nome || "",
    contato: cliente.contato || "",
    email: cliente.email || "",
    cpf: formatCPF(cliente.cpf) || "",
    cep: cliente.cep || "",
    numero: cliente.numero || "",
    rua: cliente.rua || "",
    complemento: cliente.complemento || "",
    bairro: cliente.bairro || "",
    cidade: cliente.cidade || "",
    estado: cliente.estado || "",
    observacao: cliente.observacao || "",
  });

  const [deleting, setDeleting] = useState(false);
  
  async function handleDeleteCliente(id: string) {
  setDeleting(true);
  try {
    const response = await deletaClientePorID(id);

    if (response.errors && response.errors.length > 0) {
      toast.error(response.errors.join(", "));
    } else {
      toast.success(response.msg_success);
      setModalEdit(false);
    }
  } catch (err) {
    console.error(err);
    toast.error("Ocorreu um erro ao excluir o cliente");
  } finally {
    setDeleting(false);
  }
}

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };


async function handleAlteraCliente(id: string) {
  setdisableBtn(true);

  try {
    if (!cliente) {
      toast.error("Cliente não encontrado");
      return;
    }

  
    const houveAlteracao = validaAlteracao(cliente, form);
    if (!houveAlteracao) {
      toast.error("Nenhum campo alterado");
      return;
    }

    const response = await alterarClientePorID(id, form);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(`Cliente ${form.nome} alterado com sucesso`);

    setModalEdit(false);

  } catch (err) {
    console.error(err);
    toast.error("Ocorreu um erro ao alterar o cliente");
  } finally {

    setdisableBtn(false);
  }
}


  

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-start pt-20 z-50 overflow-y-auto   bg-black/70 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 ">
        <div className="flex items-center mb-4">
          <div onClick={() => setModalEdit(false)} className="mr-4 cursor-pointer text-blue-800 ">
            <ArrowLeft size={24} />
          </div>
          <h1 className="text-2xl font-semibold">Configurações do cliente</h1>
        </div>

        <Form.Root className="grid grid-cols-4 gap-4 ">
          <h2 className="col-span-4 text-lg font-medium">Dados pessoais</h2>
          <Form.InputText
            id="nome"
            value={form.nome}
            onChange={handleChange}
            icon={User}
            label="Nome do Cliente"
            className="md:col-span-3 col-span-4 "
          />
          <Form.InputText
            id="cpf"
            value={form.cpf}
            onChange={handleChange}
            icon={IdCard}
            label="CPF"
            className="md:col-span-2 col-span-4"
          />
          <Form.InputText
            id="email"
            value={form.email}
            onChange={handleChange}
            icon={AtSign}
            label="E-mail"
            className="md:col-span-2 col-span-4"
          />

          <h2 className="md:col-span-4 col-span-4 text-lg font-medium pt-4">Endereço</h2>
          <Form.InputText
            id="cep"
            value={form.cep}
            onChange={handleChange}
            icon={Radar}
            label="CEP"
            className="md:col-span-2 col-span-4"
          />
          <Form.InputText
            id="rua"
            value={form.rua}
            onChange={handleChange}
            icon={MapPinHouse}
            label="Rua"
            className="col-span-4"
          />
          <Form.InputText
            id="numero"
            value={form.numero}
            onChange={handleChange}
            icon={FileDigit}
            label="Número"
            className="md:col-span-1 col-span-4"
          />
          <Form.InputText
            id="bairro"
            value={form.bairro}
            onChange={handleChange}
            icon={Map}
            label="Bairro"
            className="md:col-span-1 col-span-4"
          />
          <Form.InputText
            id="cidade"
            value={form.cidade}
            onChange={handleChange}
            icon={Building2}
            label="Cidade"
            className="md:col-span-2 col-span-4"
          />
          <Form.InputText
            id="estado"
            value={form.estado}
            onChange={handleChange}
            icon={Locate}
            label="Estado"
            className="col-span-2"
          />
          <Form.InputText
            id="complemento"
            value={form.complemento}
            onChange={handleChange}
            icon={Blocks}
            label="Complemento"
            className="col-span-4"
          />

          <h2 className="col-span-4 text-lg font-medium pt-4">Observação</h2>
          <Form.InputText
            id="observacao"
            value={form.observacao}
            onChange={handleChange}
            icon={PenLine}
            label="Observação"
            className="col-span-4"
          />

          <h2 className="col-span-4 text-lg font-medium pt-4">Contato</h2>
          <Form.InputText
            id="contato"
            value={form.contato}
            onChange={handleChange}
            icon={Phone}
            label="Contato"
            className="md:col-span-2 col-span-4"
          />
        </Form.Root>

        <div className="mt-6 flex justify-end gap-4">
          <button
             className={`px-6 py-2 rounded ${
    disableBtn 
      ? "bg-amber-50 text-black" 
      : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
            onClick={() => {handleAlteraCliente(cliente.id)}}
            disabled={disableBtn}
          >
            Salvar
          </button>
       <button
  disabled={deleting}
  onClick={() => handleDeleteCliente(cliente.id)}
  className={`px-6 py-2 rounded ${
    deleting
      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
      : "bg-red-600 text-white hover:bg-red-700"
  }`}
>
  {deleting ? "Excluindo..." : "Excluir"}
</button>
          <button
            className="px-6 py-2 bg-gray-400 text-white rounded"
            onClick={() => setModalEdit(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
