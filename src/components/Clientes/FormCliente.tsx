// src/components/Clientes/FormCliente.tsx
"use client";

import React, { useState, useEffect, startTransition } from "react";
import { Form } from "@/src/components/UI/Form";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import { handleChangeCep } from "@/src/actions/api-externas/cep/getcep";
import { registerCli } from "@/src/actions/clientes/registercli";
import { alterCustomerForID } from "@/src/actions/clientes/alterCustomerForID";
import type { FormClienteData } from "@/src/types/cliente/clientType";
import { toast } from "react-toastify";
import { ComponenteClientesState, initialForm } from "./ContainerClientes";

type ResponseError = { error: true; message: string };
type ResponseSuccess = FormClienteData & {
  id: string;
  error?: false;
  message?: string;
};
type ClienteResponse = ResponseError | ResponseSuccess;

const estados = [
  { value: "", label: "Estado" },
  { value: "SP", label: "SP" },
  { value: "RJ", label: "RJ" },
];


export interface FormClienteProps {
  dataAlteredUser: ComponenteClientesState[];
  setDataAlteredUser: React.Dispatch<
    React.SetStateAction<ComponenteClientesState[]>
  >;
}

export default function FormCliente({
  dataAlteredUser,
  setDataAlteredUser,
}: FormClienteProps) {
  
  
  const [addressDisabled, setAddressDisabled] = useState(false);
  const [autoCepEnabled, setAutoCepEnabled] = useState(true);
  const [form, setForm] = useState<FormClienteData>({ ...initialForm });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [disabledBtn, setDisabledBtn] = useState(false);

  // Preenche para edição
  useEffect(() => {
    const editing = dataAlteredUser.find((item) => item.status);
    if (editing) {
      const { status, __editIdx, ...userData } = editing as any;
      setForm(userData);
      setEditIndex(typeof __editIdx === "number" ? __editIdx : null);
    }
  }, [dataAlteredUser]);

  // Atualiza campos do form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === "rua" && addressDisabled) {
      alert("Para editar a rua, apague o CEP primeiro.");
      return;
    }
    setForm((prev) => ({ ...prev, [id]: value }));
    if (id === "cep") {
      setAddressDisabled(false);
      setForm((prev) => ({
        ...prev,
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
      }));
    }
  };

  // Busca automática de CEP
  const handleCepBlur = async () => {
    if (!autoCepEnabled) return;
    const cepDigits = form.cep.replace(/\D/g, "");
    if (cepDigits.length === 8) {
      try {
        const res = await handleChangeCep(cepDigits);
        const data = await res.json();
        if (!data.erro) {
          const { logradouro, bairro, localidade, uf } = data;
          setForm((prev) => ({
            ...prev,
            rua: logradouro,
            bairro,
            cidade: localidade,
            estado: uf,
          }));
          setAddressDisabled(true);
        } else {
          setAddressDisabled(false);
        }
      } catch {
        setAddressDisabled(false);
      }
    }
  };

  // Submit unificado (novo ou edição)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações de CPF e CEP
    const cpfDigits = form.cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) {
      toast.error("CPF inválido: precisa de exatamente 11 dígitos.");
      return;
    }
    const cepDigits = form.cep.replace(/\D/g, "");
    if (cepDigits.length !== 8) {
      toast.error("CEP inválido: precisa de exatamente 8 dígitos.");
      return;
    }

    setDisabledBtn(true);

    startTransition(async () => {
      let res: ClienteResponse;

      try {
        if (editIndex !== null) {
          res = (await alterCustomerForID(form.id, {
            nome: form.nome,
            contato: form.contato,
            email: form.email,
            cpf: form.cpf,
            rua: form.rua,
            numero: form.numero,
            bairro: form.bairro,
            cep: form.cep,
            cidade: form.cidade,
            estado: form.estado,
            complemento: form.complemento,
            frete: form.frete,
            observacao: form.observacao,
          })) as ResponseSuccess;
        } else {
          res = (await registerCli(form)) as ClienteResponse;
        }
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Erro inesperado na requisição";
        toast.error(msg);
        setDisabledBtn(false);
        return;
      }

      if ("error" in res && res.error) {
        toast.error(res.message);
        setDisabledBtn(false);
        return;
      }

      const action = editIndex !== null ? "alterado" : "cadastrado";
      toast.success(`Usuário ${form.nome} ${action} com sucesso!`);
      setForm(initialForm);
      // Atualiza lista local
      if (editIndex !== null) {
        const updated = [...dataAlteredUser];
        updated[editIndex] = {
          ...form,
          status: false,
          __editIdx: editIndex,
        } as ComponenteClientesState;
        setDataAlteredUser(updated);
      } else {
        setDataAlteredUser([
          ...dataAlteredUser,
          { ...form, status: false } as ComponenteClientesState,
        ]);
      }

      // Reset só em caso de sucesso
      setForm({ ...initialForm });
      setEditIndex(null);
      setAddressDisabled(false);
      setDisabledBtn(false);
    });
  };

  // Cancela edição
  const handleCancel = () => {
    setForm({ ...initialForm });
    setEditIndex(null);
    setAddressDisabled(false);
    setDataAlteredUser(
      dataAlteredUser.map((item) => ({
        ...item,
        status: false,
      } as ComponenteClientesState))
    );
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
      <h1 className="text-xl font-semibold">
        {editIndex !== null ? "Alterar cliente" : "Cadastrar cliente"}
      </h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          id="autoCep"
          type="checkbox"
          checked={autoCepEnabled}
          onChange={() => setAutoCepEnabled((p) => !p)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="autoCep" className="text-gray-700">
          Usar busca automática de CEP
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.InputText
          id="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="col-span-3 w-full"
          required
        />
        <Form.InputText
          id="contato"
          placeholder="Contato"
          value={form.contato}
          onChange={handleChange}
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="col-span-2 w-full"
        />
        <Form.InputText
          id="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="cep"
          placeholder="CEP"
          value={form.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          className="col-span-2 w-full"
        />
        <Form.InputText
          id="numero"
          placeholder="Nº"
          value={form.numero}
          onChange={handleChange}
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="rua"
          placeholder="Rua"
          value={form.rua}
          onChange={handleChange}
          disabled={addressDisabled}
          required
          className="col-span-2 w-full"
        />
        <Form.InputText
          id="complemento"
          placeholder="Complemento"
          value={form.complemento}
          onChange={handleChange}
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={handleChange}
          required
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          disabled={addressDisabled}
          className="col-span-1 w-full"
        />
        <select
          id="estado"
          value={form.estado}
          onChange={handleChange}
          disabled={addressDisabled}
          className="col-span-1 w-full border rounded px-3 py-2 bg-white disabled:opacity-50"
        >
          {estados.map((st) => (
            <option key={st.value} value={st.value}>
              {st.label}
            </option>
          ))}
        </select>
        <Form.InputText
          id="frete"
          placeholder="Frete (R$)"
          value={form.frete}
          onChange={handleChange}
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="observacao"
          placeholder="Observação"
          value={form.observacao}
          onChange={handleChange}
          type="textarea"
          className="col-span-3 w-full h-24"
        />
      </div>

      <PrimaryButton
        type="submit"
        text={editIndex !== null ? "Alterar" : "Cadastrar"}
        className={
          disabledBtn
            ? "w-full bg-gray-300 cursor-no-drop hover:bg-gray-400 text-white py-2 rounded mt-4"
            : "w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-4"
        }
        disabled={disabledBtn}
      />

      {editIndex !== null && (
        <PrimaryButton
          type="button"
          text="Cancelar"
          className="w-full mt-2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
          onClick={handleCancel}
        />
      )}
    </Form.Root>
  );
}
