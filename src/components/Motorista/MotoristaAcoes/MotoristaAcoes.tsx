"use client";

import {
  ArrowLeft,

  BookCheck,

  TriangleAlert,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "../../UI/Form";
import { deletaMotoristaPorID } from "@/src/actions/motorista/deletaMotoristaPorID";
import { validaAlteracao } from "./contract/validaCampo";
import { alterarMotoristaPorID } from "@/src/actions/motorista/alterarMotoristaPorID";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";
import { isExpired } from "./contract/verificaValidade";
import { formatDateToView } from "@/src/utils/ConverteData";
import { formatCNH, formatCPF } from "@/src/utils/FormataVisualizacaoDoc";
import { formatRG } from './../../../utils/FormataVisualizacaoDoc';

// Recebe um único motorista
interface motoristaAcoesProps {
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  motorista?: MotoristaBase;
}

export default function MotoristaAcoes({
  setModalEdit,
  motorista,
}: motoristaAcoesProps) {
  if (!motorista) return null;
  const [disableBtn, setdisableBtn] = useState(false);
  const [form, setForm] = React.useState({
    nome: motorista.nome || "",
    cpf: formatCPF(motorista.cpf) || "",
    rg: formatRG(motorista.rg) || "",
    dataNascimento: formatDateToView(motorista.dataNascimento) || "",
    contato: motorista.contato || "",
    email: motorista.email || "",
    cep: motorista.cep || "",
    numero: motorista.numero || "",
    rua: motorista.rua || "",
    complemento: motorista.complemento || "",
    bairro: motorista.bairro || "",
    cidade: motorista.cidade || "",
    estado: motorista.estado || "",
    observacao: motorista.observacao || "",
    categoria: motorista.categoria || "",
    emissaocnh:formatDateToView(motorista.emissaocnh) || "",
    numeroCnh: formatCNH(motorista.numeroCnh) || "",
    validadecnh: formatDateToView(motorista.validadecnh) || "",
    logradouro: motorista.logradouro || "",
  });

  const [deleting, setDeleting] = useState(false);

  async function handleDeleteMotorista(id: string) {
    setDeleting(true);
    try {
      const response = await deletaMotoristaPorID(id);

      if (response.errors && response.errors.length > 0) {
        toast.error(response.errors.join(", "));
      } else {
        toast.success(response.msg_success);
        setModalEdit(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao excluir o motorista");
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

  async function handleAlteramotorista(id: string) {
    setdisableBtn(true);

    try {
      if (!motorista) {
        toast.error("motorista não encontrado");
        return;
      }

      const houveAlteracao = validaAlteracao(motorista, form);
      if (!houveAlteracao) {
        toast.error("Nenhum campo alterado");
        return;
      }

      const response = await alterarMotoristaPorID(id, form);
      if (response.error) {
        toast.error(response.error);
        return;
      }
      toast.success(`motorista ${form.nome} alterado com sucesso`);

      setModalEdit(false);
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao alterar o motorista");
    } finally {
      setdisableBtn(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6  ">
      <div className="flex items-center mb-4">
        <div
          onClick={() => setModalEdit(false)}
          className="mr-4 cursor-pointer text-blue-800 "
        >
          <ArrowLeft size={24} />
        </div>
        <h1 className="text-2xl font-semibold">Configurações do motorista</h1>
      </div>

      <Form.Root className="grid grid-cols-4 gap-4 space-y-4 bg-white p-6 rounded-lg h-120  mt-10 overflow-y-auto  ">
        <h2 className="col-span-4 text-lg font-medium">Dados pessoais</h2>
        
        <Form.InputText
          id="nome"
          name="nome"
          value={form.nome}
          placeholder="Nome"
          className="col-span-4 w-full"
          onChange={handleChange}
        />
    
        <Form.InputText
          id="cpf"
          name="cpf"
          value={form.cpf}
          placeholder="CPF"
          className="col-span-2"
          onChange={handleChange}
        />
        <Form.InputText
          id="rg"
          name="rg"
          value={form.rg}
          placeholder="RG"
          className="col-span-1"
          onChange={handleChange}
        />
        <Form.InputText
          id="dataNascimento"
          name="dataNascimento"
          value={form.dataNascimento}
          placeholder="Data de nascimento"
          className="col-span-1"
          onChange={handleChange}
        />

        {/* CNH */}
        <Form.InputText
          id="numeroCnh"
          name="numeroCnh"
          value={form.numeroCnh}
          placeholder="Número da CNH"
          className="col-span-3"
          onChange={handleChange}
        />
        <Form.InputText
          id="categoria"
          name="categoria"
          value={form.categoria}
          placeholder="Categoria"
          className="col-span-1"
          onChange={handleChange}
        />
        <Form.InputText
          id="emissaocnh"
          name="emissaocnh"
          value={form.emissaocnh}
          placeholder="Emissão CNH"
          className="col-span-1"
          onChange={handleChange}
        />
        <Form.InputText
          id="validadecnh"
          name="validadecnh"
          value={form.validadecnh}
          icon={isExpired(form.validadecnh)?TriangleAlert:BookCheck }
          placeholder="Validade CNH"
          className={`${isExpired(motorista.validadecnh)?" bg-red-100 rounded-[5px] text-red-900 animate-pulse    outline-red-900":""}col-span-1 `}
          onChange={handleChange}
        />

        {/* Contato e e-mail */}
        <Form.InputText
          id="contato"
          name="contato"
          value={form.contato}
          placeholder="Telefone"
          className="col-span-2"
          onChange={handleChange}
        />
        <Form.InputText
          id="email"
          name="email"
          value={form.email}
          placeholder="E-mail"
          className="col-span-1"
          onChange={handleChange}
        />

        {/* Endereço */}
        <Form.InputText
          id="cep"
          name="cep"
          value={form.cep}
          placeholder="CEP"
          className="col-span-3"
          onChange={handleChange}
        />
        <Form.InputText
          id="rua"
          name="rua"
          value={form.rua}
          placeholder="Logradouro"
          className="col-span-3"
          onChange={handleChange}
        />
        <Form.InputText
          id="numero"
          name="numero"
          value={form.numero}
          placeholder="Número"
          className="col-span-1"
          onChange={handleChange}
        />
        <Form.InputText
          id="complemento"
          name="complemento"
          value={form.complemento}
          placeholder="Complemento"
          className="col-span-2"
          onChange={handleChange}
        />
        <Form.InputText
          id="bairro"
          name="bairro"
          value={form.bairro}
          placeholder="Bairro"
          className="col-span-1"
          onChange={handleChange}
        />
        <Form.InputText
          id="cidade"
          name="cidade"
          value={form.cidade}
          placeholder="Cidade"
          className="col-span-1"
          onChange={handleChange}
        />
        <Form.InputText
          id="estado"
          name="estado"
          value={form.estado}
          placeholder="Estado (UF)"
          className="col-span-1"
          onChange={handleChange}
        />
        
    {/* Observação */}
    <Form.InputText
      id="observacao" name="observacao"
      value={form.observacao}
      placeholder="Observação (opcional)"
      className="col-span-3"
      onChange={handleChange}
    />
      </Form.Root>
      
      <div className="mt-6 flex justify-end gap-4">
        <button
          className={`px-6 py-2 rounded ${
            disableBtn
              ? "bg-amber-50 text-black"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={() => {
            handleAlteramotorista(motorista.id);
          }}
          disabled={disableBtn}
        >
          Salvar
        </button>
        <button
          disabled={deleting}
          onClick={() => handleDeleteMotorista(motorista.id)}
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
  );
}
