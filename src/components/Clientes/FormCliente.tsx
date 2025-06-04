'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { useActionState } from 'react'; // <–– import corrigido
import { Form } from '@/src/components/UI/Form';
import PrimaryButton from '@/src/components/UI/PrimaryButton';
import SecondaryButton from '@/src/components/UI/SecondaryButton';
import { handleChangeCep } from '@/src/actions/api-externas/cep/getcep';
import type { FormClienteData } from '@/src/types/cliente/clientType';
import { registerCli } from '@/src/actions/clientes/registercli';
import type { ComponenteClientesState } from './ContainerClientes';

const estados = [
  { value: '', label: 'Estado' },
  { value: 'SP', label: 'SP' },
  { value: 'RJ', label: 'RJ' },
  /* … outros estados … */
];

// Estado inicial para o useActionState
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
  const [registerState, submitForm, isPending] =
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ao submeter, passa o form atual como argumento
    startTransition(() => {
      registerCli(form);
    });

    if (editIndex !== null) {
      const updated = [...dataAlteredUser];
      updated[editIndex] = { ...form, status: false };
      setDataAlteredUser(updated);
    } else {
      setDataAlteredUser([...dataAlteredUser, { ...form, status: false }]);
    }

    handleCancel();
    setEditIndex(null);
    setAddressDisabled(false);
  };

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
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h1 className="text-xl font-semibold">
        {editIndex !== null ? 'Alterar cliente' : 'Cadastrar cliente'}
      </h1>

      <div className="flex justify-start mb-4">
        <SecondaryButton
          type="button"
          onClick={() => setAutoCepEnabled((p) => !p)}
          className={`${
            autoCepEnabled
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 hover:bg-gray-400 text-white'
          } px-4 py-2 rounded`}
          text={
            autoCepEnabled
              ? 'Desativar busca automática CEP'
              : 'Ativar busca automática CEP'
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form.InputText
          id="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="w-full"
        />

        <Form.InputText
          id="contato"
          placeholder="Contato"
          value={form.contato}
          onChange={handleChange}
          className="w-full"
        />

        <Form.InputText
          id="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full"
        />

        <Form.InputText
          id="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          className="w-full"
        />

        <Form.InputText
          id="cep"
          placeholder="CEP"
          value={form.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          className="w-full"
        />

        <Form.InputText
          id="rua"
          placeholder="Rua"
          value={form.rua}
          onChange={handleChange}
          disabled={addressDisabled}
          required
          className="col-span-full sm:col-span-2 w-full"
        />

        <Form.InputText
          id="numero"
          placeholder="Número"
          value={form.numero}
          onChange={handleChange}
          className="w-full"
        />

        <Form.InputText
          id="complemento"
          placeholder="Complemento"
          value={form.complemento}
          onChange={handleChange}
          className="col-span-full sm:col-span-2 w-full"
        />

        <Form.InputText
          id="bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={handleChange}
          required
          className="col-span-full sm:col-span-2 w-full"
        />

        <Form.InputText
          id="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          disabled={addressDisabled}
          className="w-full"
        />

        <select
          id="estado"
          value={form.estado}
          onChange={handleChange}
          disabled={addressDisabled}
          className="w-full border rounded px-3 py-2 bg-white disabled:opacity-50"
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
          className="w-full"
        />

        <Form.InputText
          id="observacao"
          placeholder="Observação"
          value={form.observacao}
          onChange={handleChange}
          type="textarea"
          className="col-span-full sm:col-span-2 w-full"
        />
      </div>

      <PrimaryButton
        type="submit"
        text={editIndex !== null ? 'Alterar' : 'Cadastrar'}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-4"
      />

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
