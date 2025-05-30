"use client";
import { Form } from "@/src/components/UI/Form";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import SecondaryButton from "@/src/components/UI/SecondaryButton";
import { useState, useActionState } from "react";
import { handleChangeCep } from "@/src/actions/api-externas/cep/getcep";
import { FormClienteData } from "@/src/types/cliente/clientType";
import { registerCli } from "../action-cliente/registercli";

export default function FormCliente() {
  const [addressDisabled, setAddressDisabled] = useState(false);
  const [autoCepEnabled, setAutoCepEnabled] = useState(true);
  const [form, setForm] = useState<FormClienteData>({
    contato: "",
    nome: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    frete: "",
    observacao: "",
  });

  const [registerState, submitForm] = useActionState<FormClienteData>(
    registerCli,
    form
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "logradouro" && addressDisabled) {
      alert("Para editar o logradouro, por favor apague o CEP primeiro.");
      return;
    }
    setForm((prev) => ({ ...prev, [id]: value }));
    if (id === "cep") {
      setAddressDisabled(false);
      setForm((prev) => ({ ...prev, logradouro: "", bairro: "" }));
    }
  };

  const handleCepBlur = async () => {
    if (!autoCepEnabled) return;
    const cepDigits = form.cep.replace(/\D/g, "");
    if (cepDigits.length === 8) {
      try {
        const res = await handleChangeCep(cepDigits);
        const data = await res.json();
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
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
console.log(registerState)

  return (
    <Form.Root className="flex flex-col gap-2" onSubmit={submitForm}>
      <h1 className="text-lg font-semibold mb-4">Cadastrar cliente</h1>

      <div className="mb-4 flex justify-end">
        <SecondaryButton
          type="button"
          onClick={() => setAutoCepEnabled((prev) => !prev)}
          className="text-sm transition"
          text={
            autoCepEnabled
              ? "Desativar busca automática CEP"
              : "Ativar busca automática CEP"
          }
        />
      </div>

      <Form.InputText
        id="contato"
        value={form.contato}
        onChange={handleChange}
        placeholder="Contato"
        required
      />
      <Form.InputText
        id="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <Form.InputText
        id="cep"
        value={form.cep}
        onChange={handleChange}
        onBlur={handleCepBlur}
        placeholder="CEP"
      />
      <Form.InputText
        id="logradouro"
        value={form.logradouro}
        onChange={handleChange}
        placeholder="Logradouro"
        disabled={addressDisabled}
        required
      />
      <Form.InputText
        id="numero"
        value={form.numero}
        onChange={handleChange}
        placeholder="Número"
      />
      <Form.InputText
        id="bairro"
        value={form.bairro}
        onChange={handleChange}
        placeholder="Bairro"
      />
      <Form.InputText
        id="complemento"
        value={form.complemento}
        onChange={handleChange}
        placeholder="Complemento"
      />
      <Form.InputText
        id="frete"
        value={form.frete}
        onChange={handleChange}
        placeholder="Frete"
      />
      <Form.InputText
        id="observacao"
        value={form.observacao}
        onChange={handleChange}
        placeholder="Observação"
      />

      <PrimaryButton type="submit" text="Cadastrar" />
    </Form.Root>
  );
}
