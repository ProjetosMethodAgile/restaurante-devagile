"use client";
import { postCliente } from "@/src/actions/clientes/postCliente";
import React, { useEffect } from "react";
import { Form } from "../../UI/Form";
import { estados } from "./estados";
import PrimaryButton from "../../UI/PrimaryButton";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { stat } from "fs";
import { EmpresaBase } from "@/src/types/empresa/empresaType";
type ClienteFormProps = {
  empresas: EmpresaBase[];
  setOpenModalCliente: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ClienteForm({
  empresas,
  setOpenModalCliente,
}: ClienteFormProps) {
  const [form, setForm] = React.useState({
    nome: "",
    contato: "",
    email: "",
    cpf: "",
    cep: "",
    numero: "",
    rua: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    frete: "",
    observacao: "",
    empresaId:""
  });
  empresas.map((empresa)=>{
    console.log(empresa);
    
  })

  const [state, formData, isPending] = React.useActionState(postCliente, {
    errors: [],
    msg_success: "",
    success: false,
  });

  const [autoCepEnabled, setAutoCepEnabled] = React.useState(false);

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
  useEffect(() => {
    resetaForms();
  }, [isPending]);
  function resetaForms() {
    setForm((prev) => ({
      ...prev,
      nome: "",
      contato: "",
      email: "",
      cpf: "",
      cep: "",
      numero: "",
      rua: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      frete: "",
      observacao: "",
    }));
  }

  useEffect(() => {
    if (state.msg_success) {
      toast.success(state.msg_success);
    }
    if (state.errors.length) {
      toast.error(state.errors);
    }
  }, [state]);
  const handleCepBlur = async () => {
    if (!autoCepEnabled || !form.cep) return;
    const cep = form.cep.replace(/\D/g, ""); // Remove non-numeric characters
    if (cep.length !== 8) return; // Validates that the CEP has 8 digits}
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP");
      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado");

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || prev.rua,
        bairro: data.bairro || prev.bairro,
        cidade: data.localidade || prev.cidade,
        estado: data.uf || prev.estado,
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };
   const empresasList: EmpresaBase[] = React.useMemo(
    () =>
      Array.isArray(empresas)
        ? empresas
        : empresas
        ? [empresas]
        : [],
    [empresas]
  );

  return (
    <Form.Root
      id="formulario"
      action={formData}
      className="space-y-4 bg-white p-6 rounded-lg text-pri"
    >
      <div className="flex gap-5">
        <div
          onClick={() => setOpenModalCliente(false)}
          className="pl-2 text-blue-800 active:scale-105 hover:scale-102 cursor-pointer "
        >
          <ArrowLeft />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">
          Cadastrar cliente
        </h1>
      </div>
      <div className="flex justify-between text-gray-700 items-center">
        <div className="flex items-center gap-2 mb-4">
          <input
            id="autoCep"
            type="checkbox"
            checked={autoCepEnabled}
            onChange={() => setAutoCepEnabled((p) => !p)}
            className="h-4 w-4 bg-secondary border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="autoCep" className="text-gray-700">
            Usar busca automática de CEP
          </label>
        </div>
       <div className="col-span-1 flex flex-col">
  <label htmlFor="empresa" className="text-gray-700 mb-1">
    Quer cadastrar em outra empresa ?
  </label>
  <select
   id="empresaId"
    name="empresaId"
    value={form.empresaId}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2 bg-white"
    
  >
    <option value="" disabled>-- escolha --</option>
    {empresasList.map(e => (
      <option key={e.id} value={e.id}>
        {e.razao_social}
      </option>
    ))}
  </select>
</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Form.InputText
          id="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="col-span-3 w-full"
          name="nome"
          required
        />
        <Form.InputText
          id="contato"
          placeholder="Contato"
          value={form.contato}
          onChange={handleChange}
          className="col-span-1 w-full"
          name="contato"
        />
        <Form.InputText
          id="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="col-span-2 w-full"
          name="email"
        />
        <Form.InputText
          id="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          className="col-span-1 w-full"
          name="cpf"
        />
        <Form.InputText
          id="cep"
          placeholder="CEP"
          value={form.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          className="col-span-2 w-full"
          name="cep"
        />
        <Form.InputText
          id="numero"
          placeholder="Nº"
          value={form.numero}
          onChange={handleChange}
          name="numero"
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="rua"
          placeholder="Rua"
          value={form.rua}
          onChange={handleChange}
          name="rua"
          required
          className="col-span-2 w-full"
        />
        <Form.InputText
          id="complemento"
          placeholder="Complemento"
          value={form.complemento}
          onChange={handleChange}
          name="complemento"
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={handleChange}
          required
          name="bairro"
          className="col-span-1 w-full"
        />
        <Form.InputText
          id="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          name="cidade"
          className="col-span-1 w-full"
        />
        <select
          id="estado"
          value={form.estado}
          onChange={handleChange}
          name="estado"
          className="col-span-1 w-full border rounded px-3 py-2 bg-white disabled:opacity-50"
        >
          {estados.map((st) => (
            <option key={st.sigla} value={st.sigla}>
              {st.sigla} - {st.nome}
            </option>
          ))}
        </select>
        <Form.InputText
          id="frete"
          placeholder="Frete (R$)"
          value={form.frete}
          onChange={handleChange}
          className="col-span-1 w-full"
          name="frete"
        />
        <Form.InputText
          id="observacao"
          placeholder="Observação"
          value={form.observacao}
          onChange={handleChange}
          type="textarea"
          className="col-span-3 w-full h-24"
          name="observacao"
        />
      </div>

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
    </Form.Root>
  );
}
