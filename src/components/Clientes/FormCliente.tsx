'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { useActionState } from 'react'; // <–– import corrigido
import { Form } from '@/src/components/UI/Form';
import PrimaryButton from '@/src/components/UI/PrimaryButton';
import { handleChangeCep } from '@/src/actions/api-externas/cep/getcep';
import type { FormClienteData } from '@/src/types/cliente/clientType';
import { registerCli } from '@/src/actions/clientes/registercli';
import type { ComponenteClientesState } from './ContainerClientes';
import { toast } from 'react-toastify';

const estados = [
  { value: '', label: 'Estado' },
  { value: 'SP', label: 'SP' },
  { value: 'RJ', label: 'RJ' },
];

const initialForm: FormClienteData = {
  nome: '',
  contato: '',
  email: '',
  cpf: '',
  rua: '',
  numero: '',
  bairro: '',
  cep: '',
  cidade: '',
  estado: '',
  complemento: '',
  frete: '',
  observacao: '',
};

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

  // ----- useActionState COM 2 argumentos: ação + estado inicial -----
  const [registerState, isPending] =
    useActionState<FormClienteData>(registerCli, initialForm);

  useEffect(() => {
    console.log('Estado da Action (registerState):', registerState);
    console.log('Está pendente? (isPending):', isPending);
  }, [registerState, isPending]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === 'rua' && addressDisabled) {
      alert('Para editar a rua (logradouro), apague o CEP primeiro.');
      return;
    }

    setForm((prev) => ({ ...prev, [id]: value }));

    if (id === 'cep') {
      setAddressDisabled(false);
      setForm((prev) => ({
        ...prev,
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
      }));
    }
  };

  const handleCepBlur = async () => {
    if (!autoCepEnabled) return;
    const cepDigits = form.cep.replace(/\D/g, '');
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

  const [disabledBtn, setDisabledBtn] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setDisabledBtn(true);
    startTransition(async () => {
      const res = await registerCli(form);
      if (!res || res.length === 0) {
        toast.error(
          'Erro ao cadastrar cliente. Verifique os dados e tente novamente.'
        );
        return;
      }
      toast.success('Cliente cadastrado com sucesso!');
    });

    if (editIndex !== null) {
      const updated = [...dataAlteredUser];
      updated[editIndex] = { ...form, status: false };
      setDataAlteredUser(updated);
    } else {
      setDataAlteredUser([...dataAlteredUser, { ...form, status: false }]);
    }

    setTimeout(() => {
      setDisabledBtn(false);
    }, 2000);

    setEditIndex(null);
    setAddressDisabled(false);
  }

  function handleCancel() {
    setForm({ ...initialForm });
    setEditIndex(null);
    setAddressDisabled(false);
    const updated = dataAlteredUser.map((item) => ({ ...item, status: false }));
    setDataAlteredUser(updated);
  }

  return (
    <Form.Root
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg"
    >
      <h1 className="text-xl font-semibold">
        {editIndex !== null ? 'Alterar cliente' : 'Cadastrar cliente'}
      </h1>

      {/* Checkbox para ativar/desativar busca automática de CEP */}
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

      {/* Grid reorganizado */}
      <div className="grid grid-cols-3 gap-4">
        {/* 1. Nome → ocupa 3 colunas */}
        <Form.InputText
          id="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="col-span-3 w-full"
          required
        />

        {/* 2. Contato (1) | Email (2) */}
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

        {/* 3. CPF (1) | CEP (1) | Número (1) */}
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

        {/* 4. Rua (2) | Complemento (1) */}
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
          className="col-span-2 w-full"
        />

        {/* 5. Bairro (1) | Cidade (1) | Estado (1) */}
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

        {/* 6. Frete (1) */}
        <Form.InputText
          id="frete"
          placeholder="Frete (R$)"
          value={form.frete}
          onChange={handleChange}
          className="col-span-1 w-full"
        />

        {/* 7. Observação (textarea) → ocupa 3 colunas e ganha altura */}
        <Form.InputText
          id="observacao"
          placeholder="Observação"
          value={form.observacao}
          onChange={handleChange}
          type="textarea"
          className="col-span-3 w-full h-24"
        />
      </div>

      {/* Botão Cadastrar / Alterar */}
      <PrimaryButton
        type="submit"
        text={editIndex !== null ? 'Alterar' : 'Cadastrar'}
        className={
          disabledBtn
            ? 'w-full bg-gray-300 cursor-no-drop hover:bg-gray-400 text-white py-2 rounded mt-4'
            : 'w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-4'
        }
        disabled={disabledBtn}
      />

      {/* Botão Cancelar só aparece se houver alteração */}
      {dataAlteredUser.some((item) => item.status) && (
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
