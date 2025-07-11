"use client";
import React, { useEffect } from "react";
import { Form } from "../../UI/Form";
import PrimaryButton from "../../UI/PrimaryButton";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { postMotorista } from "@/src/actions/motorista/registraMotorista";
type MotoristaForms = {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  contato: string;
  email: string;
  cep: string;
  numero: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  observacao: string;
  numeroCnh: string;
  categoria: string;
  emissaocnh: string;
  validadecnh: string;
  logradouro: string;
};

type MotoristaFormProps = {
  setOpenModalMotorista: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MotoristaForm({
  setOpenModalMotorista,
}: MotoristaFormProps) {
  const [form, setForm] = React.useState<MotoristaForms>({
    id: "",
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
    logradouro: "",
  });

  const [state, formData, isPending] = React.useActionState(postMotorista, {
    errors: [],
    msg_success: "",
    success: false,
  });

  const [autoCepEnabled, setAutoCepEnabled] = React.useState(true);

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
      id: "",
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
      logradouro: "",
    }));
  }

  useEffect(() => {
    if (state.msg_success) {
      toast.success(state.msg_success);
    }
 if (state.errors.length) {
  toast.error(state.errors.join(" • "));
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
  return (
   <Form.Root
  id="formulario"
 
  action={formData}
  className="space-y-4 bg-white p-6 rounded-lg overflow-y-scroll h-150 mt-10"
>
<div className="flex gap-5">
        <div
          onClick={() => setOpenModalMotorista(false)}
          className="pl-2 text-blue-800 active:scale-105 hover:scale-102 cursor-pointer "
        >
          <ArrowLeft />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">
          Cadastrar motorista
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
      </div>
      <div className="grid grid-cols-3 gap-4">
    {/* Nome */}
    <Form.InputText
      id="nome" name="nome"
      value={form.nome}
      placeholder="Nome completo"
      className="col-span-3"
      onChange={handleChange}
    />

    {/* CPF, RG, Data de nascimento */}
    <Form.InputText id="cpf" name="cpf" value={form.cpf} placeholder="CPF" className="col-span-1" onChange={handleChange}/>
    <Form.InputText id="rg"  name="rg"  value={form.rg}  placeholder="RG"  className="col-span-1" onChange={handleChange}/>
    <Form.InputText id="dataNascimento" name="dataNascimento"  type={"date"} value={form.dataNascimento} placeholder="Data de nascimento" className="col-span-1" onChange={handleChange}/>

    {/* CNH */}
    <Form.InputText id="numeroCnh" name="numeroCnh" value={form.numeroCnh} placeholder="Número da CNH" className="col-span-3" onChange={handleChange}/>
    <Form.InputText id="categoria" name="categoria" value={form.categoria} placeholder="Categoria" className="col-span-1" onChange={handleChange}/>
    <Form.InputText id="emissaocnh" name="emissaocnh"    type={"date"}  value={form.emissaocnh} placeholder="Emissão CNH" className="col-span-1" onChange={handleChange}/>
    <Form.InputText id="validadecnh" name="validadecnh" type={"date"} value={form.validadecnh} placeholder="Validade CNH" className="col-span-1" onChange={handleChange}/>

    {/* Contato e e-mail */}
    <Form.InputText id="contato" name="contato" value={form.contato} placeholder="Telefone" className="col-span-2" onChange={handleChange}/>
    <Form.InputText id="email"   name="email"   value={form.email}   placeholder="E-mail"    className="col-span-1" onChange={handleChange}/>

    {/* Endereço */}
    <Form.InputText id="cep"     name="cep"     value={form.cep}     placeholder="CEP" className="col-span-3" onChange={handleChange} onBlur={handleCepBlur}/>
    <Form.InputText id="rua"     name="rua"     value={form.rua}     placeholder="Logradouro" className="col-span-3" onChange={handleChange}/>
    <Form.InputText id="numero"  name="numero"  value={form.numero}  placeholder="Número" className="col-span-1" onChange={handleChange}/>
    <Form.InputText id="complemento" name="complemento" value={form.complemento} placeholder="Complemento" className="col-span-2" onChange={handleChange}/>
    <Form.InputText id="bairro"  name="bairro"  value={form.bairro}  placeholder="Bairro" className="col-span-1" onChange={handleChange}/>
    <Form.InputText id="cidade"  name="cidade"  value={form.cidade}  placeholder="Cidade" className="col-span-1" onChange={handleChange}/>
    <Form.InputText id="estado"  name="estado"  value={form.estado}  placeholder="Estado (UF)" className="col-span-1" onChange={handleChange}/>

    {/* Observação */}
    <textarea
      id="observacao" name="observacao"
      value={form.observacao}
      placeholder="Observação (opcional)"
      className="col-span-3"
      onChange={handleChange}
    />
  </div>

  <PrimaryButton
    type="submit"
    text="Cadastrar"
    className={isPending
      ? "w-full bg-gray-300 cursor-no-drop py-2 rounded mt-4"
      : "w-full bg-secondary hover:bg-secondary py-2 rounded mt-4"
    }
    disabled={isPending}
  />
</Form.Root>
  );
}
