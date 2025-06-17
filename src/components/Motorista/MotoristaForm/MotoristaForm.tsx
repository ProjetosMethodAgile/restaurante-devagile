"use client";
import React from "react";
import { Form } from "../../UI/Form";
import PrimaryButton from "../../UI/PrimaryButton";
import { estados } from "../../Clientes/ClienteForm/estados";
import { postMotorista } from "@/src/actions/motorista/registraMotorista";

export default function MotoristaForm() {
  const [autoCepEnabled, setAutoCepEnabled] = React.useState(false);
  const [state, formData, isPending] = React.useActionState(postMotorista, {
    errors: [],
    msg_success: "",
    success: false,
  });

  const [form, setForm] = React.useState({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    contato: "",
    email: "",
    cep: "",
    numero: "",
    rua: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    observacao: "",
    numeroCnh: "",
    categoria: "",
    emissaocnh: "",
    validadecnh: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCepBlur = async () => {
    if (!autoCepEnabled) return;
    const rawCep = form.cep.replace(/\D/g, "");
    if (rawCep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP");
      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado");

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <Form.Root action={formData} className="space-y-6 bg-white p-6 rounded-lg text-text-primary">
      <h1 className="text-2xl font-bold">Cadastro de motorista</h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          id="autoCepEnabled"
          type="checkbox"
          checked={autoCepEnabled}
          onChange={() => setAutoCepEnabled((prev) => !prev)}
          className="h-4 w-4 bg-secondary border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="autoCepEnabled" className="text-gray-700">
          Usar busca automática de CEP
        </label>
      </div>

      {/* Dados pessoais */}
      <div>
        <label className="block mb-2 font-medium">Dados pessoais</label>
        <div className="grid grid-cols-3 gap-4">
          <Form.InputText
            id="nome"
            value={form.nome}
            placeholder="Nome completo"
            className="col-span-3"
            onChange={handleChange}
          />
          <Form.InputText
            id="cpf"
            value={form.cpf}
            placeholder="CPF"
            className="col-span-1"
            onChange={handleChange}
          />
          <Form.InputText
            id="rg"
            value={form.rg}
            placeholder="RG"
            className="col-span-1"
            onChange={handleChange}
          />
          <Form.InputText
            id="dataNascimento"
            value={form.dataNascimento}
            placeholder="Data de nascimento"
            className="col-span-1"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* CNH */}
      <div>
        <label className="block mb-2 font-medium">CNH</label>
        <div className="grid grid-cols-3 gap-4">
          <Form.InputText
            id="numeroCnh"
            value={form.numeroCnh}
            placeholder="Número da CNH"
            className="col-span-3"
            onChange={handleChange}
          />
          <Form.InputText
            id="categoria"
            value={form.categoria}
            placeholder="Categoria (A, B, C, D, E)"
            className="col-span-1"
            onChange={handleChange}
          />
          <Form.InputText
            id="emissaocnh"
            value={form.emissaocnh}
            placeholder="Data de emissão"
            className="col-span-1"
            onChange={handleChange}
          />
          <Form.InputText
            id="validadecnh"
            value={form.validadecnh}
            placeholder="Data de validade"
            className="col-span-1"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Contato */}
      <div>
        <label className="block mb-2 font-medium">Contato</label>
        <div className="grid grid-cols-3 gap-4">
          <Form.InputText
            id="contato"
            value={form.contato}
            placeholder="Telefone"
            className="col-span-2"
            onChange={handleChange}
          />
          <Form.InputText
            id="email"
            value={form.email}
            placeholder="E-mail"
            className="col-span-1"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Endereço */}
      <div>
        <label className="block mb-2 font-medium">Endereço</label>
        <div className="grid grid-cols-3 gap-4">
          <Form.InputText
            id="cep"
            value={form.cep}
            placeholder="CEP"
            className="col-span-3"
            onChange={handleChange}
            onBlur={handleCepBlur}
          />
          <Form.InputText
            id="rua"
            value={form.rua}
            placeholder="Logradouro"
            className="col-span-3"
            onChange={handleChange}
          />
          <Form.InputText
            id="numero"
            value={form.numero}
            placeholder="Número"
            className="col-span-1"
            onChange={handleChange}
          />
          <Form.InputText
            id="complemento"
            value={form.complemento}
            placeholder="Complemento"
            className="col-span-2"
            onChange={handleChange}
          />
          <Form.InputText
            id="bairro"
            value={form.bairro}
            placeholder="Bairro"
            className="col-span-1"
            onChange={handleChange}
          />
          <Form.InputText
            id="cidade"
            value={form.cidade}
            placeholder="Cidade"
            className="col-span-1"
            onChange={handleChange}
          />
          <select
            id="estado"
            value={form.estado}
            onChange={handleChange}
            className="col-span-1 w-full border rounded px-3 py-2 bg-white disabled:opacity-50"
          >
            <option value="">Selecione o estado</option>
            {estados.map((st) => (
              <option key={st.sigla} value={st.sigla}>
                {st.sigla} - {st.nome}
              </option>
            ))}
          </select>
        </div>

        <label className="block mb-2 mt-4 font-medium">Observação</label>
        <textarea
          id="observacao"
          value={form.observacao}
          placeholder="Observações adicionais"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
        />
      </div>

      <div className="pt-4">
           <PrimaryButton
                  type="submit"
                  text={"Cadastrar"}
                  className={
                    isPending
                      ? "w-full bg-gray-300 cursor-no-drop hover:bg-gray-400 text-white py-2 rounded mt-4"
                      : "w-full bg-secondary hover:bg-secondary text-white py-2 rounded mt-4"
                  }
                  disabled={isPending}
                />
                </div>
    </Form.Root>
  );
}
